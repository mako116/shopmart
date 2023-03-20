import React from 'react'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Helmet from '../component/Helmet/Helmet'
import CommonSection from '../component/ul/CommonSection'
import '../styles/checkout.css'
import {useSelector} from 'react-redux'
const Checkout = () => {
  
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout'/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
                <FormGroup className='form__group'>
                <input type="text" placeholder='Enter your name'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your email'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="number" placeholder='Phone Number'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="text" placeholder='Street address'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="text" placeholder=' city'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="text" placeholder='postal code'/>
                </FormGroup>

                <FormGroup className='form__group'>
                <input type="text" placeholder='country'/>
                </FormGroup>
              </Form>
            </Col>

            <Col lg='4'>
            <div className="checkout__cart">
              <h6>Total Qty : <span>{totalQty} Items</span></h6>
              <h6>Subtotal : <span>${totalAmount}</span></h6>
              <h6>Shipping : <br />
              free shipping <span>$0</span>
              </h6>
               <h4>Total Cost : <span>${totalAmount}</span></h4>
               <button className=' auth__btn  w-100'> place an order</button>           
            </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout
