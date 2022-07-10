describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    beforeEach(function() {
      const user1 = {
        name: 'superUser',
        username: 'root',
        password: 'salainen'
      }
      const user2 = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user1)
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        localStorage.clear()
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'mluukkai', password: 'salainen'
        }).then(response => {
          localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      it('A blog can be created', function() {
        cy.contains('new note').click()

        const newBlog = {
          title: 'Component testing is done with react-testing-library',
          author: 'Blogger',
          url: 'http://www.test.com/blog'
        }

        cy.get('form').within(() => {
          cy.get('input[name=title]').type(newBlog.title)
          cy.get('input[name=author]').type(newBlog.author)
          cy.get('input[name=url]').type(newBlog.url)
          cy.contains('create').click()
        })

        cy.contains('a new blog Component testing is done with react-testing-library by Blogger added')
        cy.get('.blog').should('contain', newBlog.title)
        cy.get('.blog').should('contain', newBlog.author)
      })

      describe('and a blog exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'End to end testing is done with Cypress',
            author: 'Blogger',
            url: 'http://www.test.com/blog'
          })

        })

        it('User can like a blog', function() {
          cy.get('.blog').within(() => {
          cy.contains('view').click()
          cy.get('.likeButton').click()
          cy.get('.likes').should('contain', 'likes 1')
          })
        })

        it('User can delete a blog', function() {
          cy.get('.blog').within(() => {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.contains('Component testing is done with react-testing-library').should('not.exist')
          })
        })

        it('Other user cannot delete the blog', function() {
          localStorage.clear()
          cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'root', password: 'salainen'
          }).then(response => {
            localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
            cy.get('.blog').within(() => {
              cy.contains('view').click()
              cy.contains('remove')
                .should('have.css', 'display', 'none')
                .click({force: true})
            })
            cy.get('.error').should('contain', 'Failed to remove blog')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
          })
        })
      })
    })
  })
})