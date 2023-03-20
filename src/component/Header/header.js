import React,{useRef,useEffect } from 'react'

import './header.css'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/logo-icon.png'
import { Container, Row } from 'reactstrap'
import useAuth from '../../custom-hooks/useAuth'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
 import { auth } from '../../firebase config'
import { toast } from 'react-toastify'

const nav__link =[
    {
        path:'home',
        disply: 'Home'
    },
    {
        path:'shop',
        disply: 'Shop'
    },
    {
        path:'cart',
        disply: 'Cart'
    }
]
const Header = () => {
const totalQuantity = useSelector((state) => state.cart.totalQuantity)

const profileARef = useRef(null)

const menuRef = useRef(null)
const navigate = useNavigate()
const {currentUser} = useAuth()
const headerRef = useRef(null)


   const stickyHeaderFunc =()=>{
    window.addEventListener('scroll',()=>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop
           > 80){
            headerRef.current.classList.add('sticky__header')
           }else{
            headerRef.current.classList.remove('sticky__header')
           }
    })
   }

   const logout = ()=>{
    signOut(auth).then(()=>{
    toast.success('logged out')
    }).catch(err =>{
        toast.error(err.message)
        navigate("/home")
    })
   }
   useEffect(()=>{
    stickyHeaderFunc()
    return()=> window.removeEventListener('scroll',stickyHeaderFunc)
   })

   const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const NavigateToCart = ()=>{
    navigate("/cart")
  }

  const  toggleProfileActions = () => profileARef.current.classList.toggle('show_btn')
   
  return (
    <header className='header' ref={headerRef}>
    <Container>
<Row>
<div className='nav__wrapper'>
    <div className="logo">
        <img src={logo} alt="logo" />
        <div>
            <h1>shopmart</h1>
         </div>
    </div>
    <div className="navigation" ref={menuRef} onClick={menuToggle}>
        <ul className="menu">
            {
                nav__link.map((item, index )=>(
                    <li className='nav__item' key={index}>
                    <NavLink to={item.path} 
                    className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>
                    {item.disply}</NavLink>
                    </li>
                )) }
        </ul>
    </div>
    <div className="nav__icons">
    <span className='fav__icon'>
    <i className="ri-heart-line"></i>
    <span className='badge'>1</span>
    </span>
        <span className='cart__icons' onClick={NavigateToCart}>
            <i className="ri-shopping-bag-line"></i>
            <span className='badge'>{totalQuantity}</span>
        </span>
        
        <div className='profile'>
        <motion.img whileTap={{scale:1.2}} src={currentUser? 
        currentUser.photoURL : userIcon} 
        alt=""
        onClick={toggleProfileActions} />
        
        <div className="profile__actions" ref={profileARef}
        onClick={toggleProfileActions}>
            {currentUser? ( 
                <span onClick={logout}>Logout</span>
                 ) : ( 
                <div className='d-flex align-items-center
                 justify-content-center flex-column'>
                 <Link to="/signup">Signup</Link> 
                 <Link to='/login'>Login</Link>  
                 <Link to='/dashboard'>Dashboard</Link>  
                </div>
            )}
        </div>
    </div>
        <div className="mobile__menu">
        <span onClick={menuToggle}>
            <i className="ri-menu-line"></i>
        </span>
    </div>
 </div>
</div>
</Row>
    </Container>
    </header>
  )
}

export default Header
