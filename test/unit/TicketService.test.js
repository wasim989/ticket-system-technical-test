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
  ticketService = new TicketService();
  makePaymentSpy = jest.spyOn(TicketPaymentService.prototype, 'makePayment');
  reserveSeatsSpy = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');
});

describe('request validation tests', () => {

  test('purchaseTickets method should throw InvalidPurchaseException if account Id is not an integer greater than 0', () => {
    expect(() => {ticketService.purchaseTickets('123', ...TicketServiceData.allTypesMaxMinusOneTotalQuantity)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(null, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets({}, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(0, ...TicketServiceData.oneAdult)}).toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(1, ...TicketServiceData.oneAdult)}).not.toThrow(InvalidPurchaseException);
    expect(() => {ticketService.purchaseTickets(2, ...TicketServiceData.oneAdult)}).not.toThrow(InvalidPurchaseException);
  });

});







