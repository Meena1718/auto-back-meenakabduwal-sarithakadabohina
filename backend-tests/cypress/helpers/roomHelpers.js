const faker = require('faker')

const CREATE_ROOM_ENDPOINT = 'http://localhost:3000/api/room/new'

//functions
function createRoomPayload(){
    let roomPayload = {
        "features":["balcony","ensuite","sea_view"],
        "category":"double",
        "number":faker.datatype.number(),
        "floor":faker.datatype.number(),
        "available":true,
        "price":faker.datatype.number()
    }

    return roomPayload
}

function viewRoomRequest(){
    cy.request ({
        method : 'GET',
        url : 'http://localhost:3000/api/rooms',
        headers : {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then ((response => {
        expect (response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))

    }))
}

function createRoomRequest(){
    cy.request({
        method: 'POST',
        url: CREATE_ROOM_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
        body:createRoomPayload()
            
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        Cypress.env({lastID:response.body.id})
        
    }))
}

function editRoomRequest(idToEdit){
    cy.request({
        method: 'PUT',
        url:'http://localhost:3000/api/room/'+idToEdit,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body:{
            "id":idToEdit,
            "features":["balcony","sea_view"],
            "category":"single",
            "number":"320",
            "floor":"2",
            "available":true,
            "price":"1800"
           }                              
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function deleteRoomRequest(idToDelete){
    cy.request({
        method: 'DELETE',
        url:'http://localhost:3000/api/room/'+idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}


function performLogout(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}


//exports
module.exports = {
    createRoomPayload,
    viewRoomRequest,
    createRoomRequest,
    editRoomRequest,
    deleteRoomRequest,
    performLogout
}