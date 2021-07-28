import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommended = ({ show, token }) => {
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(GET_USER)


  if (!show || !token) {
    return null
  }

  if(bookResult.loading || userResult.loading){
    return (
      <div>loading...</div>
    )
  }

  const books = bookResult.data.allBooks
  const user = userResult.data.me

  const padding = {
    paddingRight: 10
  }

  console.log(userResult.data.me)
  return (
    <div>
      <h2>recommendations</h2>
      {user.favoriteGenre ? 
        <div>
          books in your favorite genre <b>{user.favoriteGenre}</b>
          <table>
            <tbody>
              <tr>
                <th>
                  book title
                </th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {books.filter(b => b.genres.includes(user.favoriteGenre))
                .map(b =>
                  <tr key={b.title}>
                    <td style={padding}>{b.title}</td>
                    <td style={padding}>{b.author.name}</td>
                    <td style={padding}>{b.published}</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
        
      : <div>no favorites found</div>}
      

    </div>
  )
}

export default Recommended