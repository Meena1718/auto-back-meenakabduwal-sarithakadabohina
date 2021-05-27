
const faker = require('faker')

const VIEW_BILL_ENDPOINT = 'http://localhost:3000/api/bills'
const CREATE_BILL_ENDPOINT = 'http://localhost:3000/api/bill/new' 
const DELETE_BILL_ENDPOINT = 'http://localhost:3000/api/bill/'

const LOGOUT_BILL_ENDPOINT = 'http://localhost:3000/api/logout'


//functions
function createBillPayload () {
    let billpayload = {
        
        "value": "2500",
       "paid":true
    }
    return billpayload
}
function viewBillRequest() {
    cy.request ({
        method :'GET',
        url :VIEW_BILL_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
                  
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function createBillRequest() {
    
    cy.request({
        method: 'POST',
        url: CREATE_BILL_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
        body:
            createBillPayload()           
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID : response.body.id})
}))
}
function editBillRequest(idToEdit){
    cy.request({
        method: 'PUT',
        url:'http://localhost:3000/api/bill/'+idToEdit,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body:{
            "id":idToEdit,
            "value":"4800",
            "paid":false
            
           }                              
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}
 

function deleteBillRequest(idToDelete){
    cy.request({
        method: 'DELETE',
        url: DELETE_BILL_ENDPOINT +idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}


function performLogout() {
    cy.request( {
        method:'POST',
        url: LOGOUT_BILL_ENDPOINT,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    })
}


//exports
module.exports = {
    createBillPayload,
    viewBillRequest,
    createBillRequest,
    editBillRequest,
    deleteBillRequest,
    performLogout
}