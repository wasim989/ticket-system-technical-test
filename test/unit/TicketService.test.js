import TicketService from '../../src/pairtest/TicketService.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService.js';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';
import TicketServiceData from '../data/TicketServiceData.js';

import {jest} from '@jest/globals'

let ticketService;
let makePaymentSpy;
let reserveSeatsSpy;

beforeEach(() => {
  const ticketPaymentService = new TicketPaymentService();
  const seatReservationService = new SeatReservationService();
  ticketService = new TicketService(ticketPaymentService, seatReservationService, {adult: 25, child: 15});
  makePaymentSpy = jest.spyOn(TicketPaymentService.prototype, 'makePayment');
  reserveSeatsSpy = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');
});

describe('request validation tests', () => {

  test('purchaseTickets method should throw InvalidPurchaseException if purchase not of type TicketTypeRequest', () => {
    expect(() => {ticketService.purchaseTickets(1, [])}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, null)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, "123")}).toThrow(InvalidPurchaseException);
  });
  
  test('purchaseTickets method should throw InvalidPurchaseException if account Id is not an integer greater than 0', () => {
    expect(() => {ticketService.purchaseTickets('123', ...TicketServiceData.allTypesMaxTotalQuantity)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(null, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets({}, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(0, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdult)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(2, ...TicketServiceData.oneAdult)}).not.toThrow(InvalidPurchaseException);
  });

  test('purchaseTickets method should throw InvalidPurchaseException if ticket quantity is not an integer value between 0 and 26', () => {
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.negativeOneAdults)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.zeroAdults)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.allTypesMaxTotalQuantity)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdult)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.allTypesMaxMinusOneTotalQuantity)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.allTypesMaxPlusOneTotalQuantity)}).toThrow(InvalidPurchaseException);
  });

  test('purchaseTickets method should throw InvalidPurchaseException if child tickets are being purchased without at least 1 adult ticket', () => {
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneChild)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdultOneChild)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.maxAdultOneChild)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdultMaxChild)}).not.toThrow(InvalidPurchaseException);
  }); 

  test('purchaseTickets method should throw InvalidPurchaseException if there is not an adult ticket being purchased for every infant ticket', () => {
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.twoAdultOneInfant)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdultOneInfant)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdultTwoInfants)}).toThrow(InvalidPurchaseException);
  });

});

describe('payment tests', () => {  

  test('charges correct sum for adult and child tickets', () => {
    ticketService.purchaseTickets(123, ...TicketServiceData.oneAdult);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 25);
    ticketService.purchaseTickets(123, ...TicketServiceData.oneAdultOneChild);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 40);
    ticketService.purchaseTickets(123, ...TicketServiceData.oneAdultMaxChild);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 385);
    ticketService.purchaseTickets(123, ...TicketServiceData.twelveAdultThirteenChild);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 495);
    ticketService.purchaseTickets(123, ...TicketServiceData.maxAdultOneChild);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 615);
  });  

  test('does not charge for infant tickets', () => {
    ticketService.purchaseTickets(123, ...TicketServiceData.oneAdultOneInfant);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 25);
    ticketService.purchaseTickets(123, ...TicketServiceData.maxAdultOneInfant);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 600);
    ticketService.purchaseTickets(123, ...TicketServiceData.thirteenAdultTwelveInfants);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 325);
    ticketService.purchaseTickets(123, ...TicketServiceData.twelveAdultTwelveInfants);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 300);
  });  
  
});







