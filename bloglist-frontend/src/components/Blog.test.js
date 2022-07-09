import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Blogger',
    url: 'http://www.test.com/blog',
    likes: 5,
    user: {
      username: 'tt123',
      id: '12345abcdefg',
      name: 'Tester',
    }
  }

  const user = {
    username: 'tester2',
    id: '12345abcdefg',
    name: 'Tester2',
  }

  const { container } =render(<Blog blog={blog} user={user} />)
  screen.debug(container)

  screen.getByText('Component testing is done with react-testing-library')

  const author = screen.getByText('Blogger')
  expect(author).toBeDefined()

  const url = container.querySelector('.url')
  expect(url).not.toBeVisible()

  const likes = container.querySelector('.likes')
  expect(likes).not.toBeVisible()
})
