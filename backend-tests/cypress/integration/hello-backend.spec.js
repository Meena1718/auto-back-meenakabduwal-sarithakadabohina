/// <reference types="cypress" />

import * as room from '../helpers/roomHelpers'


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
})