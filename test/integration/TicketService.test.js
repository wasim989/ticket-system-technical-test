import TicketService from '../../src/pairtest/TicketService.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService.js';
import TicketServiceData from '../data/TicketServiceData.js';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';

import {jest} from '@jest/globals'

describe('ticket service end-to-end integration', () => {

  const makePaymentSpy = jest.spyOn(TicketPaymentService.prototype, 'makePayment');
  const reserveSeatsSpy = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');
  const ticketPaymentService = new TicketPaymentService();
  const seatReservationService = new SeatReservationService();

  test('correct charge and correct number of seats reserved for valid purchases', () => {     
    const ticketService = new TicketService(ticketPaymentService, seatReservationService, {adult:25, child: 15});   

    expect(() => {ticketService.purchaseTickets(123, ...TicketServiceData.allTypesMaxMinusOneTotalQuantity)}).not.toThrow(InvalidPurchaseException);
    expect(makePaymentSpy).toHaveBeenLastCalledWith(123, 320);
    expect(reserveSeatsSpy).toHaveBeenLastCalledWith(123, 16);
  });

});



