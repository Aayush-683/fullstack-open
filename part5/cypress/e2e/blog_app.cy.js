describe('Blog app', () => {

  let url = 'http://192.168.146.1:3000/'

  // Reset the database once before running the tests
  before(function () {
    cy.resetDB()
  })

  it('frontpage can be visited and login form is shown', function () {
    cy.visit(url)
    cy.get('button').contains('login')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
  })

  it('login form with incorrect details', function () {
    cy.visit(url)
    cy.get('input[name="Username"]').type('test')
    cy.get('input[name="Password"]').type('wrong')
    cy.get('button').contains('login').click()
    cy.contains('Invalid username or password')
  })

  it('login form with correct details', function () {
    cy.visit(url)
    cy.get('input[name="Username"]').type('test')
    cy.get('input[name="Password"]').type('test')
    cy.get('button').contains('login').click()
    cy.contains('Logged in as test')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login('test', 'test');
    })

    it('a new blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://test.com')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.contains('New blog created!')
      cy.get('button').contains('View').click()
      cy.get('button').contains('like').click()
      cy.contains('Liked blog!')
    })

    describe('and a blog exists', function () {

      it('user can like a blog', function () {
        cy.get('button').contains('View').click()
        cy.get('button').contains('like').click()
        cy.contains('Liked blog!')
      })

      it('another user cannot delete a blog', function () {
        cy.get('button').contains('Logout').click()
        cy.login('test2', 'test2')
        cy.get('button').contains('View').click()
        cy.get('button').contains('Delete').should('not.exist')
      })

      it('another user can like the blog', function () {
        cy.get('button').contains('Logout').click()
        cy.login('test2', 'test2')
        cy.get('button').contains('View').click()
        cy.get('button').contains('like').click()
        cy.contains('Liked blog!')
      })

      it('blogs are in order of likes', function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Test Blog2')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('http://test.com')
        cy.get('button[type="submit"]').contains('Create').click()
        cy.contains('New blog created!')
        cy.get('button').contains('View').click()
        cy.get('button').contains('View').click()
        cy.get('button').contains('like').click()
        cy.get('button').contains('like').click()
        cy.get('button').contains('like').click()
        cy.get('button').contains('like').click()
        cy.get('.blog').eq(0).contains('Test Blog2')
        cy.get('.blog').eq(1).contains('Test Blog')
      })
        
    })

  })

})