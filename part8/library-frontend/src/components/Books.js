import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, FILTERED_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  const [getBooks, getResult] = useLazyQuery(FILTERED_BOOKS)

  let genres = ['']
  let books

  const filterBooks = (value) => {
    console.log(value)
    getBooks({ variables: { genre: value }})
  }

  useEffect(() => {
    if (getResult.data) {
      //console.log(getResult.data)
      setFilter(getResult.data.allBooks)
    }
  }, [getResult.data])

  if (!props.show) {
    return null
  }

  if(result.loading){
    return (
      <div>loading...</div>
    )
  }

  if (result) {
    books = result.data.allBooks
  }

  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)){
        genres = genres.concat(genre)
      }
    })
    genres.sort()
  })

  //console.log(filter)

  const padding = {
    paddingRight: 10
  }

  if (filter) {
    return(
      <div>
        <h2>Books</h2>
        <label>filter by genre: </label>
        <select onChange={({ target }) => filterBooks(target.value)}>
          {genres.map(genre =>
            <option key={genre} value={genre}>{genre}</option>)
          }
        </select>
        <br/><br/>
        <table>
          <tbody>
            <tr>
              <th>book title</th>
              <th>author</th>
              <th>published</th>
            </tr>
              {filter.map(b =>
                <tr key={b.title}>
                  <td style={padding}>{b.title}</td>
                  <td style={padding}>{b.author.name}</td>
                  <td style={padding}>{b.published}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h2>Books</h2>
      <label>filter by genre: </label>
      <select onChange={({ target }) => filterBooks(target.value)}>
        {genres.map(genre =>
          <option key={genre} value={genre}>{genre}</option>)
        }
      </select>
      <br/><br/>
      <table>
        <tbody>
          <tr>
            <th>book title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td style={padding}>{a.title}</td>
              <td style={padding}>{a.author.name}</td>
              <td style={padding}>{a.published}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default Books