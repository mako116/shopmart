import React,{ useState ,useEffect }  from 'react'
import { Container ,Row, Col} from 'reactstrap'
import Helmet from '../component/Helmet/Helmet'
import '../styles/home.css'
import heroimg from '../assets/images/hero-img.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
 import Services from '../services/Services'
import ProductList from '../component/ul/ProductList'
import Clocks from '../component/ul/clock'
import counterImg from '../assets/images/counter-timer-img.png'

import useGetData from '../custom-hooks/useGetData'
  const Home = () => {

  const {data:products, loading} =useGetData('products')

const[trendingProducts, settrendingProducts] = useState([])
const[bestSaleProducts, setbestSaleProductss] = useState([])
const[mobileProducts, setMobileProduct] =useState([])
const[wirelessProducts, setwirelessProduct] =useState([])
const[popularProducts, setPopularProducts] =useState([])

const year = new Date().getFullYear()
useEffect(()=>{
    const filtertrendingProducts= products.filter((item)=>
item.category === 'chair'
    )

    const filterbestSaleProducts= products.filter((item)=>
item.category === 'sofa'
    )
    const filtermobileProducts= products.filter((item)=>
item.category === 'mobile'
    )
    const filterwirelessProducts= products.filter((item)=>
item.category === 'wireless'
    )
    const filterpopularProducts= products.filter((item)=>
item.category === 'watch'
    )

    settrendingProducts(filtertrendingProducts)
    setbestSaleProductss(filterbestSaleProducts)
    setMobileProduct(filtermobileProducts)
    setwirelessProduct(filterwirelessProducts)
    setPopularProducts(filterpopularProducts)
},[products])
  return (
    <Helmet title={"Home"}>
<section className="hero__section">
<Container>
    <Row>
        <Col lg='6' md='6'>
        <div className="hero__content">
            <p className="hero__subtitle">Trending product in {year}</p>
       <h2>make more <span  className='opacity'> interior More </span> Minimalistic & 
       <span className='opacity'> Modern</span></h2>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facilis 
       voluptatibus nemo porro tenetur accusantium quasi,strtry, djhfhfgf?</p>
    
        <motion.button whileTap={{scale:1.2}} className="buy__btn">
        <Link to='/shop'>Shop Now</Link></motion.button>
        </div>
</Col>
<Col lg='6' md='6'>
    <div className="hero__img">
        <img src={heroimg} alt="" />
    </div>
</Col>
    </Row>
</Container>
</section>
<Services />
<section className="trending__products">
    <Container>
        <Row>
            <Col lg='12' className='text-center'>
            <h2 className="section__title">Trending Product</h2>
            </Col>
            {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={trendingProducts}/>
                )
            }
       
        </Row>
    </Container>
</section>
<section className='best__sales'>
    <Container>
    <Row>
        <Col lg='12' className='text-center'>
            <h2 className="section__title">Best Sales</h2>
            </Col>
            {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={bestSaleProducts}/>
                )
            }
       
        </Row>
    </Container>
</section>
  <section className="timer__count">
    <Container>
     <Row>
       <Col lg="6" md="12" className='count__down-col'>
       <div className="clock__top-content">
        <h4 className='text-white fs-6 mb-2'>Limited offers</h4>
        <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
        </div>
        <Clocks/>
        <motion.button whileTap={{scale:1.2}} className='buy__btn store__btn'>
        <Link to='/shop'>visit store</Link>
        </motion.button>
       </Col>
       <Col lg="6" md="12" className='text-end counter__img'>
        <img src={counterImg} alt="" />
      </Col>
    </Row>
</Container>
</section>
<section className="new__arrivals">
    <Container>
        <Row>
            <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>New Arrivals</h2>
            </Col>
            {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={mobileProducts} />
                )
            }
            {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={wirelessProducts} />
                )
            }
          
           
        </Row>
    </Container>
</section>
<section className="popular__category">
<Container>
        <Row>
            <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>popular in category</h2>
            </Col>
            {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={popularProducts} />
                )
            }
            {/* {
                loading ?( <h5 className='fw-bold'>Loading</h5> 
                ):(
                    <ProductList data={wirelessProducts} />
                )
            } */}
          
           
        </Row>
    </Container> 
</section>
    </Helmet>
  )
}

export default Home
