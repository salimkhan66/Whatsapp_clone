import React from 'react'
import Left from './LeftPart/Left'
import Right from './Right/Right'
import Logout from './LeftPart/Logout'

function Home() {
  return (
    <div className='flex'>
      <Logout/>
        <Left />
       <Right/>
    </div>
  )
}

export default Home