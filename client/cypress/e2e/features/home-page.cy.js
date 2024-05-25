/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Verify Navbar text is correct before Login', () => {
        const textBeforeLogin = ['GeoGuess Whiz', 'Learn', 'Log In', 'Sign Up', 'Language']

        textBeforeLogin.forEach(str => {
            cy.get('#nav-bar').contains(str)
        })
    })

    it('Verify Navbar text is correct after Login', () => {
        const textAfterLogin = ['GeoGuess Whiz', 'Learn', 'Scores', 'Games', 'Log Out', 'Language']

        cy.get('#log-in').click()
        cy.get('#username').type('dmitchell1')
        cy.get('#password').type('Ddamjk61995!')
        cy.get('#log-in-submit').click()
        cy.wait(1000)

        textAfterLogin.forEach(str => {
            cy.get('#nav-bar').contains(str)
        })
    })
})
