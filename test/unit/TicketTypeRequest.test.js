import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';

import {jest} from '@jest/globals'

let ticketTypeRequest = new TicketTypeRequest("ADULT", 1)

test('TicketTypeRequest instance should be immutable', () => {    
    expect(() => {ticketTypeRequest.abc = "test"}).toThrow(TypeError);
});








