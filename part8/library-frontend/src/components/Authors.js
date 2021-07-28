import React from 'react'

const Authors = ({ show, authors }) => {

  if (!show) {
    return null
  }
  
  if (!authors) {
    return (
      <div>loading....</div>
    )
  }

  const padding = {
    paddingRight: 20
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th>
                name
              </th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td style={padding}>{a.name}</td>
                <td style={padding}>{a.born}</td>
                <td style={padding}>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Authors
