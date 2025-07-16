import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {

  #ticketPaymentService;
  #seatReservationService;
  #ticketPrices;

  constructor(ticketPaymentService, seatReservationService, ticketPrices){
    this.#ticketPaymentService = ticketPaymentService;
    this.#seatReservationService = seatReservationService;
    this.#ticketPrices = ticketPrices;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    try{
     this.#validate(accountId, ...ticketTypeRequests)
    }
    catch(err){
     throw new InvalidPurchaseException(err.message);
    }

    this.#processPayment(accountId, ticketTypeRequests);
    this.#reserveSeats(accountId, ticketTypeRequests);
  }

  #validate(accountId, ...ticketTypeRequests){
    if(!Array.isArray(ticketTypeRequests) || !(ticketTypeRequests[0] instanceof TicketTypeRequest)){
      throw new Error('Invalid ticket request');
    }

    if(!this.#idIsValid(accountId)){
      throw new Error('Invalid account ID');
    }
    
    if(!this.#requestQuantityIsValid(ticketTypeRequests)){
      throw new Error('Invalid Ticket Request Quantities');
    }

    if(!this.#requestAdultChildTicketRatioIsValid(ticketTypeRequests)){
      throw new Error('Child tickets must be purchased with at least one adult ticket');
    }

    if(!this.#requestAdultInfantTicketRatioIsValid(ticketTypeRequests)){
      throw new Error('An Adult ticket must be purchased with each infant ticket');
    }
  }

  #idIsValid(accountId){
    return typeof accountId === "number" && accountId > 0
  }

  #requestQuantityIsValid(ticketTypeRequests){        
    let ticketQuantity = ticketTypeRequests.reduce((sum, request)=>{
      return sum + request.getNoOfTickets()
    }, 0);

    if(ticketQuantity < 1 || ticketQuantity > 25){
      return false
    }

    return true
  }

  #requestAdultChildTicketRatioIsValid(ticketTypeRequests){
    let adultTicketQuantity = this.#getTicketCount('ADULT', ticketTypeRequests);
    let childTicketQuantity = this.#getTicketCount('CHILD', ticketTypeRequests);

    return childTicketQuantity  ? adultTicketQuantity : true
  }

  #requestAdultInfantTicketRatioIsValid(ticketTypeRequests){
    let adultTicketQuantity = this.#getTicketCount('ADULT', ticketTypeRequests);    
    let infantTicketQuantity = this.#getTicketCount('INFANT', ticketTypeRequests);

    return adultTicketQuantity >= infantTicketQuantity;
  }

  #processPayment(accountId, ticketTypeRequests) {
    amountToPay = this.#calculatePayment(ticketTypeRequests);
    this.#ticketPaymentService.makePayment(accountId, amountToPay);
  }

  #reserveSeats(accountId, ticketTypeRequests) {
    seatsToReserve = this.#getTicketCount('ADULT', ticketTypeRequests) + this.#getTicketCount('CHILD', ticketTypeRequests);;
    this.#seatReservationService.reserveSeat(accountId, seatsToReserve);
  }

  #calculatePayment(ticketTypeRequests) {
    let adultTotal = this.#getTicketCount('ADULT', ticketTypeRequests) * this.#ticketPrices.adult;
    let childTotal = this.#getTicketCount('CHILD', ticketTypeRequests) * this.#ticketPrices.child;
    return adultTotal + childTotal;
  }

  #getTicketCount(ticketType, ticketTypeRequests){
    return ticketTypeRequests.reduce((sum, request)=>{
      return request.getTicketType() === ticketType ?  sum + request.getNoOfTickets() : sum
    }, 0);
  }

}
