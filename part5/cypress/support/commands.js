// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Login Command
Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(response => {
        if (response.body.error) {
            cy.log(response.body.error)
        }
        localStorage.setItem('uToken', response.body.token)
        cy.visit('http://192.168.146.1:3000/')
    })
})

Cypress.Commands.add('resetDB', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'test',
        name: 'Test User',
        password: 'test'
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'test2',
        name: 'Test User 2',
        password: 'test2'
    })
});

Cypress.Commands.add('createBlog', (blog) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: blog,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('uToken')}`
        }
    })
    cy.visit('http://192.168.146.1:3000/')
})