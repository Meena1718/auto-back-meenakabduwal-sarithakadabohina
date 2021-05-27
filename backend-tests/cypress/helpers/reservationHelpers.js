const faker = require('faker')

const VIEW_RESERVATION_ENDPOINT = 'http://localhost:3000/api/reservations'
const CREATE_RESERVATION_ENDPOINT = 'http://localhost:3000/api/reservation/new' 
const LOGOUT_RESERVATION_ENDPOINT = 'http://localhost:3000/api/logout'


//functions
function createReservationPayload() {
    let reservationpayload = {
        "client":faker.name.firstName(),
        "room":"1",
        "bill":"1",
        "start":faker.date.weekday(),
       "end":faker.date.weekday()
    }
    return reservationpayload
}
function viewReservationRequest() {
    cy.request ({
        method :'GET',
        url : VIEW_RESERVATION_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
                  
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function createReservationRequest() {

    cy.request({
        method: 'POST',
        url: CREATE_RESERVATION_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
        body:
            createReservationPayload()           
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID : response.body.id})
}))
}

function performLogout() {
    cy.request( {
        method:'POST',
        url: LOGOUT_RESERVATION_ENDPOINT,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    })
}

//exports
module.exports = {

    createReservationPayload,
    viewReservationRequest,
    createReservationRequest,
    performLogout

}