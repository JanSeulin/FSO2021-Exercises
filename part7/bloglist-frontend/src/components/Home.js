import React from 'react'

const Home = () => {
  return (
    <div>
      <h3>Welcome!</h3>
      <p>This is an application created for the <b><a href="https://fullstackopen.com/en/">
        Full Stack Open 2021</a></b> course by Helsinki University.
      </p>
      <p>Here, we practice refactoring the state from vanilla React to Redux and create
        individual views for each entry in the database. Each view has its own url.
      </p>
      <p>
        The blog entries are sorted by number of likes. The deletion of entries is only possible
        by the user who created it.
      </p>
    </div>
  )
}

export default Home