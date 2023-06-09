import { motion } from 'framer-motion'
import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

 import Helmet from '../component/Helmet/Helmet'
import CommonSection from '../component/ul/CommonSection'
import '../styles/product-details.css'
import ProductsList from '../component/ul/ProductList'
import { useRef } from 'react'
import {useDispatch} from 'react-redux'
import { cartActions } from '../redux/slice/cartSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { db } from '../firebase config'
import { doc, getDoc} from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'

 const ProductDetails = () => {

  const [product, setProduct] = useState({})

  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch =useDispatch()

  const [rating, setRating]=useState(null)
  const {id} = useParams()
   
  const {data: products, loading} =useGetData('products')

   const docRef = doc(db, 'products', id)

   useEffect(()=>{
    const  getProduct = async()=>{
      const docsnap =await getDoc(docRef)

      if(docsnap.exists()){
       setProduct((docsnap.data())) 
      }else{
        console.log('no product');
      }
    }
    getProduct()
   },[])

  const { imgUrl,
     productName,
     price,
    //  avgRating, 
    //  reviews,
     description,
     shortDesc,
     category
    } = product
     const relatedProducts = products.filter(item => item.category === category)
     const submitHandler = (e)=>{
      e.preventDefault()
      const reviewUserName = reviewUser.current.value
      const reviewUserMsg = reviewMsg.current.value;
      
      const reviewObj ={
        userName:reviewUserName,
        text:reviewMsg,
        rating
      }
      console.log(reviewObj);
      toast.success("Review submitted")
     }

     const addToCart = () =>{
      dispatch(cartActions.addItem({
        id,
        Image:imgUrl,
        productName,
        price,
      }))
      toast.success('product added successfully')
     }
     useEffect(()=>{
      window.scrollTo(0,0)
     },[product])
     return (
    <Helmet title={productName}> 
    <CommonSection title={productName}/>
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={imgUrl} alt="" />
          </Col>
          <Col lg='6'>
            <div className="product__details">
              <h2>{productName}</h2>
              <div className="product__rating d-flex align-items-center
              gap-5 mb-3 ">
                <div>
                  <span><i className='ri-star-s-fill'></i></span>
                  <span><i className='ri-star-s-fill'></i></span>
                  <span><i className='ri-star-s-fill'></i></span>
                  <span><i className='ri-star-s-fill'></i></span>
                  <span><i className='ri-star-half-s-line'></i></span>
                </div>
                {/* <p>(<span>{avgRating}</span>rating)</p> */}
              </div>
              <div className="d-flex align-items-center gap-3">
              <span className='product__price'>${price}</span>
              <span>category: {category.toUpperCase()}</span>
              </div>
              <p className='mt-3'>{shortDesc}</p>

              <motion.button whileTap={{scale:1.2}}  onClick={addToCart} className="buy__btn mt-3">
                add to cart
              </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section >
    <Container>
    <Row>
      <Col lg='12'>
      <div className="tab__wrapper d-flex align-items-center gap-5">
        <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} 
        onClick={()=> setTab('desc')}>
        Description
        </h6>
        <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} 
        onClick={()=> setTab('rev')}>
        {/* Reviews ({reviews.length}) */}
        </h6>
      </div>
      {
        tab === 'desc' ? (<div className="tab__content mt-5">
      <p>{description}</p>
      </div> ):( 
        <div className='product__review'>
        <div className="review__wrapper">
          {/* <ul>
            {
              reviews?.map((item,index)=>(
                <li key={index} className='mb-4 mt-4'>
                <h6> mako Rae</h6>
                <span>{item.rating}(average rating)</span>
                <p> {item.text}</p>
                </li>
              ))
            }
          </ul> */}
          <div className="review__form">
          <h4> Leave your experience</h4>
          <form action="" onSubmit={submitHandler}>
            <div className="form__group">
              <input type="text" placeholder='enter name' required ref={reviewUser}/>
            </div>
            <div className="form__group d-flex align-items-center 
            gap-5 rating__group" >
            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(1)}>1<i className='ri-star-s-fill'></i></motion.span>
            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(2)}>2<i className='ri-star-s-fill'></i></motion.span>
            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(3)}>3<i className='ri-star-s-fill'></i></motion.span>
            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(4)}>4<i className='ri-star-s-fill'></i></motion.span>
            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(5)}>5<i className='ri-star-s-fill'></i></motion.span>
            </div>
            <div className="form__group">
              <textarea ref={reviewMsg} required rows={4} type="text" placeholder='Review Message...'/>
            </div>

            <motion.button type='submit'
             whileTap={{scale:1.2}} className='buy__btn'>submit</motion.button>
          </form>
          </div>
        </div>
      </div>
      )}
     
      </Col>
      <Col lg='12' className='mt-5'>
        <h2 className="related__title">you might also like</h2>
      </Col>
      <ProductsList data={relatedProducts}/>
    </Row>
     </Container>
    </section>
    </Helmet>
  )
}

export default ProductDetails
