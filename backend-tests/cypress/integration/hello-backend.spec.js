/// <reference types="cypress" />

import * as room from '../helpers/roomHelpers'
import * as bill from '../helpers/billHelpers'


describe('Test suite', () => {

    it('View Rooms', () => {
        cy.authenticate().then((response =>{
            room.viewRoomRequest()
            room.performLogout()
        }))
    })

    it('Create a new room', () => {
        cy.authenticate().then((response =>{
            room.createRoomRequest()
            room.performLogout()
        }))
    })

    it('Edit a room', () => {
        cy.authenticate().then((response =>{
            room.createRoomRequest()
            room.editRoomRequest(Cypress.env().lastID)
            room.performLogout()
        }))
    })

    it('Delete a room', () => {
        cy.authenticate().then((response =>{
            room.createRoomRequest()
            room.deleteRoomRequest(Cypress.env().lastID)
            room.performLogout()
        }))
    })
    it('View  bill', () => {
        cy.authenticate().then((response => {
           bill.viewBillRequest()
           bill.performLogout()
           
        }))
    })
    
    it('Create a new bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            bill.performLogout()
        }))
    })
    
    
    it('Delete a bill', () => {
        cy.authenticate().then((response => {
           bill.createBillRequest()
           bill.deleteBillRequest(Cypress.env().lastID)
           bill.performLogout()
           
        }))
})
})
