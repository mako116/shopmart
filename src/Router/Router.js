import React from 'react'
import { Route, Routes ,Navigate } from 'react-router-dom'


import Cart from '../pages/cart'
import Checkout from '../pages/checkout'
import Home from '../pages/home'
import Login from '../pages/Login'
import ProductDetails from '../pages/productDetails'
import Shop from '../pages/shop'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'

import AddProduct from '../admin/AddProduct'
import AllProduct from '../admin/AllProduct'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/user'

const Routers = () => {
  return (
    <Routes>
    <Route path='/' element={<Navigate to='home'/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='shop/:id' element={<ProductDetails/>}/>
        <Route path='cart' element={<Cart/>}/>

        <Route path='/*' element={<ProtectedRoute/>}>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='dashboard/all-products' element={<AllProduct/>}/>
        <Route path='dashboard/add-products' element={<AddProduct/>}/>
        <Route path='dashboard/users' element={<Users/>}/>
        </Route>

        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
    </Routes>
    )
}

export default Routers
