describe('Bloglist app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'george',
      username: 'george',
      password: 'george'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
    cy.contains('cancel')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('george')
      cy.get('#password').type('george')
      cy.get('#login-button').click()

      cy.contains('Welcome back, george!')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('george')
      cy.get('#password').type('notgeorge')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'george', password: 'george' })
      })

      it('a new blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('a new blog')
        cy.get('#author-input').type('tester')
        cy.get('#url-input').type('testing.net')
        cy.get('#create-button').click()

        cy.contains('a new blog by tester')
      })

      describe('and a blog exists', function() {
        beforeEach(function () {
          cy.createBlog({
            title: 'testing cypress again',
            author: 'ozzy',
            url: 'ozzy.com'
          })
        })

        it('can be liked, multiple times', function () {
          cy.contains('show').click()
          cy.get('.likeButton').click()

          cy.contains('Likes: 1')

          cy.get('.likeButton').click()
          cy.contains('Likes: 2')
        })

        it('can be deleted by the user who created it', function () {
          cy.contains('show').click()
          cy.get('#remove-button').click()

          cy.get('html').should('not.contain', 'testing cypress again')
        })

        it('cant be deleted by another user', function () {
          const user = {
            name: 'notgeorge',
            username: 'notgeorge',
            password: 'notgeorge'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)
          cy.login({ username: 'notgeorge', password: 'notgeorge' })
          cy.visit('http://localhost:3000')
          
          cy.contains('show').click()
          cy.get('#remove-button').should('not.exist')
        })
      })

      describe('and multiple blogs exist', function () {
        it('is sorted by number of likes', function() {
          cy.createBlog({
            title: 'this should be second',
            author: 'second',
            url: 'second.com',
            likes: '3'
          })
          cy.createBlog({
            title: 'this should be first',
            author: 'first',
            url: 'first.com',
            likes: '8'
          })
          cy.createBlog({
            title: 'this should be third',
            author: 'third',
            url: 'third.com',
            likes: '1'
          })
          cy.visit('http://localhost:3000')

          cy.contains('this should be first').parent().find('button').click()
          cy.contains('Likes: 8')

          cy.contains('this should be third').parent().find('button').click()
          cy.contains('Likes: 1')
        })
      })
        
      })
    })
})
