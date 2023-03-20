import React from 'react'
import '../styles/cart.css'
import Helmet from '../component/Helmet/Helmet'
import CommonSection from '../component/ul/CommonSection'
import { Col, Container, Row } from 'reactstrap'

 import { motion } from 'framer-motion'
import { cartActions } from '../redux/slice/cartSlice'
import {useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  return (
    <Helmet>
      <CommonSection  title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
            {
              cartItems.length === 0 ? ( <h2 className='fs-4 text-center'> No item added</h2>):( 
                <table className='table bordered'> 
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
              {
                cartItems.map((item, id)=>(
                 <Tr   item={item} key={id}/>
                ))
              }
            
              </tbody>
              </table>
            )}

            </Col>
            <Col lg='3'>
              <div className='mb-2'>
                <h6 className='d-flex align-items-center 
                justify-content-between'>subtotal
                <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mb-3 mt-2'>taxes and shipping will calculate in checkout</p>
              <div>               
                <button className='buy__btn w-100'><Link to='/checkout'> Checkout</Link></button>
                <button className='buy__btn w-100 mt-3'><Link to='/shop'> continue shopping</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet> 
    )
}

const Tr = ({item})=>{

  const dispatch = useDispatch()
  const deleteProduct = ()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  return(
  <tr>
  <td>
  <img src={item.imgUrl} alt="" />
  </td>
  <td>{item.productName}</td>
  <td> ${item.price}</td>
  <td>{item.quantity}px</td>
  <td>
    <motion.i whileHover={{scale:1.2 }} onClick={deleteProduct} className='ri-delete-bin-line'></motion.i>
  </td>
</tr>
  )
}
export default Cart
