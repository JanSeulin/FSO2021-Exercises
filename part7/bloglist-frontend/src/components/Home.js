import React from 'react'
import { Link } from '@material-ui/core'

const Home = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is an application created for the <b><Link href="https://fullstackopen.com/en/">
        Full Stack Open 2021</Link></b> course by Helsinki University.
      <p>
        Here, we practice refactoring the state from vanilla React to Redux and create
        individual views for each entry in the database. Each view has its own url.
        The blog entries are sorted by number of likes. The deletion of entries is only possible
        by the user who created it.
      </p>
      <p>
        The styling was done with the help of MaterialUI and basic CSS.
      </p>
      </p>
    </div>
  )
}

export default Home