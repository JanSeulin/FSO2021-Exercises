import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import FullBlog from './FullBlog'

describe('<blog />', () => {
  test('initally renders blog name and author only', () => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 0
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )

    expect(component.container).not.toHaveTextContent(
      `${blog.url}`
    )
    expect(component.container).not.toHaveTextContent(
      `${blog.likes}`
    )
  })

  test('likes and url are shown after show button is clicked', () => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 0
    }

    const component = render(
      <Blog blog={blog} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.fullBlog')
    expect(div).toHaveTextContent(
      `${blog.url}`
    )
    expect(div).toHaveTextContent(
      `${blog.likes}`
    )
  })

  // Can't for my soul make this work with the way I wrote
  // the blog component. I tried, A LOT.
  test('make sure you can like a post more than once', () => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 0
    }

    const mockHandler = jest.fn()

    const component = render(
      <FullBlog blog={blog} like={mockHandler} blogLikes={blog.likes}/>
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
    //component.debug()

  })
})




