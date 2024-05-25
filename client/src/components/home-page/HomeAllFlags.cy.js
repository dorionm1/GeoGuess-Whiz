import React from 'react'
import HomeAllFlags from './HomeAllFlags'

describe('<HomeAllFlags />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HomeAllFlags />)
  })
})