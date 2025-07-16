import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';

let generateTicketRequests = (ticketOrders) => { 
    let ticketTypeRequests = []
    ticketOrders.map((ticketOrder, index)=>{
        ticketTypeRequests.push(new TicketTypeRequest(ticketOrder.type, ticketOrder.quantity))
    })
    return ticketTypeRequests
}

export default {
    negativeOneAdults: generateTicketRequests([{type: 'ADULT', quantity: -1}]),
    zeroAdults: generateTicketRequests([{type: 'ADULT', quantity: 0}]),
    oneAdult: generateTicketRequests([{type: 'ADULT', quantity: 1}]),
    allTypesMaxMinusOneTotalQuantity: generateTicketRequests([{type: 'ADULT', quantity: 8}, {type: 'CHILD', quantity: 8}, {type: 'INFANT', quantity: 8}]),
};