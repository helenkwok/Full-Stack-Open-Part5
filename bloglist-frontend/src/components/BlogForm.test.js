import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const inputBLog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Blogger',
      url: 'http://www.test.com/blog'
    }
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], inputBLog.title )
    await user.type(inputs[1], inputBLog.author )
    await user.type(inputs[2], inputBLog .url )
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library' )
    expect(createBlog.mock.calls[0][0].author).toBe('Blogger' )
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.test.com/blog' )

    expect(createBlog.mock.calls[0][0]).toEqual(inputBLog )
  })
})
