import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const DashboardLayout = () => {
  return (
    <div className='flex flex-row'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout