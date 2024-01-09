import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import UserForm from './components/UserForm';
import Receipt from './components/Receipt';

function App() {


  return (
    <>
      <Header />
      <div className="flex h-full justify-between mt-16 pb-8">
        <div className='pl-6 flex'>
          <UserForm />
          <span className='h-full box-border mx-16 w-4 bg-shade rounded-full' />
          <Receipt />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default App
