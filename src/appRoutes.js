import React from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Layout from './layout/layout'
import LayoutAdmin from './layoutAdmin/layoutAdmin'
import Register from './components/auth/register/register'
import HomeAdmin from './components/admin/homeAdmin'
import Users from './components/admin/users'
import Categories from './components/admin/categories'
import Posts from './components/admin/posts'
import About from './components/client/about'
import Dashboard from './components/client/dashboard'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/* outLet */}
            <Route index element={<Dashboard/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/register' element={<Register />}/>
        </Route>
        <Route path='/admin' element={<LayoutAdmin/>}>
            {/* OutLet */}
            <Route path='/admin' element={<HomeAdmin/>}/>
            <Route path='/admin/users' element={<Users/>}/>
            <Route path='/admin/categories' element={<Categories/>}/>
            <Route path='/admin/posts' element={<Posts/>}/>
        </Route>

        <Route path='*' element={<div className='bg-red-500'>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes