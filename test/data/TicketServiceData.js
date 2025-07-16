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

    allTypesMaxTotalQuantity: generateTicketRequests([{type: 'ADULT', quantity: 9}, {type: 'CHILD', quantity: 8}, {type: 'INFANT', quantity: 8}]),
    allTypesMaxMinusOneTotalQuantity: generateTicketRequests([{type: 'ADULT', quantity: 8}, {type: 'CHILD', quantity: 8}, {type: 'INFANT', quantity: 8}]),
    allTypesMaxPlusOneTotalQuantity: generateTicketRequests([{type: 'ADULT', quantity: 9}, {type: 'CHILD', quantity: 9}, {type: 'INFANT', quantity: 8}]),

    oneChild: generateTicketRequests([ {type: 'CHILD', quantity: 1}]),
    oneAdultOneChild: generateTicketRequests([{type: 'ADULT', quantity: 1}, {type: 'CHILD', quantity: 1}]),
    maxAdultOneChild: generateTicketRequests([{type: 'ADULT', quantity: 24}, {type: 'CHILD', quantity: 1}]),
    oneAdultMaxChild: generateTicketRequests([{type: 'ADULT', quantity: 1}, {type: 'CHILD', quantity: 24}]),
    twelveAdultThirteenChild: generateTicketRequests([{type: 'ADULT', quantity: 12}, {type: 'CHILD', quantity: 13}]),

    oneInfant: generateTicketRequests([{type: 'INFANT', quantity: 1}]),
    oneAdultOneInfant: generateTicketRequests([{type: 'ADULT', quantity: 1}, {type: 'INFANT', quantity: 1}]),
    oneAdultTwoInfants: generateTicketRequests([{type: 'ADULT', quantity: 1}, {type: 'INFANT', quantity: 2}]),
    twoAdultOneInfant: generateTicketRequests([{type: 'ADULT', quantity: 2}, {type: 'INFANT', quantity: 1}]),
    maxAdultOneInfant: generateTicketRequests([{type: 'ADULT', quantity: 24}, {type: 'INFANT', quantity: 1}]),
    thirteenAdultTwelveInfants : generateTicketRequests([{type: 'ADULT', quantity: 13}, {type: 'INFANT', quantity: 12}]),
    twelveAdultTwelveInfants : generateTicketRequests([{type: 'ADULT', quantity: 12}, {type: 'INFANT', quantity: 12}]),
};