import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> receives all values correctly', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('.title')
    const authorInput = component.container.querySelector('.author')
    const urlInput = component.container.querySelector('.url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'test blog' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'test author' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'testurl.com' }
    })
    fireEvent.submit(form)
    //console.log(createBlog.mock.calls[0][0].title)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(
      'test blog'
    )
    expect(createBlog.mock.calls[0][0].author).toBe(
      'test author'
    )
    expect(createBlog.mock.calls[0][0].url).toBe(
      'testurl.com'
    )
  })
})
