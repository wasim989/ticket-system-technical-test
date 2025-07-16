# Ticket System Technical Test

## Overview
A simple ticket management system designed for technical assessment purposes.

## Story

As a customer
I would like to be able to purchase tickets to the Cinema
so that I can watch a Film

### Acceptance Criteria

User is able to purchase Adult, Child and Infant tickets which are priced as follows:

Infant: £0
Child: £15
Adult: £25

Requests which do not conform to the below scenario are rejected by the service

GIVEN:
    the Account Id is a number greater than 0  
    AND the number of purchased tickets is greater than 0 and no more than 25  
    AND at least one adult ticket is being purchased if a child ticket is being purchased  
    AND at least one adult ticket is being purchased for each infant ticket purchased

WHEN: 
    a purchase is attempted  

THEN:
    a seat is booked for every adult and child ticket only
    AND £25 is charged for every adult ticket
    AND £15 is charged for every child ticket



