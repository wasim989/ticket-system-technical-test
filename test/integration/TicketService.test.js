import TicketService from '../../src/pairtest/TicketService.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService.js';
import TicketServiceData from '../data/TicketServiceData.js';

import {jest} from '@jest/globals'

// beforeEach(() => {
//   ticketService = new TicketService();
// });

describe('ticket service end-to-end integration', () => {

  const makePaymentSpy = jest.spyOn(TicketPaymentService.prototype, 'makePayment');
  const reserveSeatsSpy = jest.spyOn(SeatReservationService.prototype, 'reserveSeat');

  test('correct charge and correct number of seats reserved for valid purchases', () => {    
    const ticketPaymentService = new TicketPaymentService();
    const seatReservationService = new SeatReservationService();

    const ticketService = new TicketService(ticketPaymentService, seatReservationService);
    ticketService.purchaseTickets(123, ...TicketServiceData.allTypesMaxTotalQuantity);
    expect(makePaymentSpy).toHaveBeenCalledWith(123, 345);
    expect(reserveSeatsSpy).toHaveBeenCalledWith(123, 17);
  });

});



