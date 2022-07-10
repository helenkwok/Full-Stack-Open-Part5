import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test <Blog />', () => {
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

  test('url and number of likes are shown when the button has been clicked', async () => {
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

    const userTester = userEvent.setup()
    const button = screen.getByText('view')
    await userTester.click(button)

    const url = container.querySelector('.url')
    expect(url).toBeVisible()

    const likes = container.querySelector('.likes')
    expect(likes).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler received as props is called twice', async () => {
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

    const mockHandler = jest.fn()

    const { container } =render(<Blog blog={blog} user={user} addLike={mockHandler} />)

    const userTester = userEvent.setup()

    const likeButton = screen.getByText('like')
    await userTester.click(likeButton)
    await userTester.click(likeButton)
    screen.debug(container)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})