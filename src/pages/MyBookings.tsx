import React from 'react'
import BookingHistoryComponent from './components/BookingHistoryComponent'

export default function MyBookings() {
  return (
    <div style={{backgroundColor: '#edeff0'}} className='h-lvh'>
      <div className="h-full w-full m-auto shadow-md" style={{backgroundColor: '#f6f8fa' ,maxWidth: '1500px'}}>
      <div className="bg-white m-auto h-full shadow-md p-3 flex flex-col" style={{maxWidth: '900px'}}>
        <BookingHistoryComponent />
        <BookingHistoryComponent />
        <BookingHistoryComponent />
      </div>
      </div>
    </div>
  )
}
