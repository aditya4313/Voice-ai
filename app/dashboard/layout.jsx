import React from 'react'
import Header from './_components/Header'
import RecordOrder from './order/[orderid]/_components/RecordOrder'
import Addneworder from './_components/Addneworder'

function layout({children}) {
  return (
    <div >
      
      <div className='mx-5 md:mx-20 lg:mx-36'>
      {children}
      </div>
      <Header />

      <RecordOrder />

      {/* <Addneworder /> */}
      
  
    </div>
  )
}

export default layout
