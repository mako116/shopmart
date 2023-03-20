import React from 'react'
import Helmet from '../component/Helmet/Helmet'
import '../styles/login.css'
import { Container,Row,Col, Form, FormGroup } from 'reactstrap'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
// import { Auth } from 'firebase/auth'
import{toast} from 'react-toastify'
// import { async } from '@firebase/util'
import { auth } from '../firebase config'

const Login = () => {
  const [email, setEmail] =useState('')
  const [password, setpassword] =useState('')
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate()

  const signin = async(e)=>{
    e.preventDefault()
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email,password)
    
    const user = userCredential.user
    console.log(user);
    setLoading(false)
    toast.success('successfully logged in')
    navigate('/checkout')
    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }
  return (
    <Helmet title='Login'>
    <section>
      <Container>
        <Row>
         {
          loading ? <Col lg='12' className='text-center'><h5
           className='fw-bold'>Loading....</h5></Col> :
            
            <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold fs-4 mb-3'>Login</h3>
            <Form className='auth__form' onSubmit={signin}>
              <FormGroup className='form__group'>
              <input type="email" placeholder='Enter your email'
                    onChange={e => setEmail(e.target.value)}  value={email}/>
              </FormGroup>
              <FormGroup className='form__group'>
              <input type="password" placeholder='Enter your password'
                  onChange={e => setpassword(e.target.value)}  value={password}
              />
              </FormGroup>
              <button type='submit' className='buy__btn auth__btn'>Login</button>
              <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
            </Form>
          </Col>
         }
        </Row>
      </Container>
    </section>
    </Helmet>
  )
}

export default Login
