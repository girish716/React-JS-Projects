import React from 'react'
import {client, urlFor} from '../../lib/client'
import {AiOutlineMinus,  AiOutlinePlus, AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {Product} from '../../components'
import { useState } from 'react'
import {useStateContext} from '../../context/StateContext'

const ProductDeatils = ({product, products}) => {
  const {image, name, details, price} = product
  const [index, setIndex] = useState(0)

  const {qty, incQty, decQty, addProductToCart, setShowCart} = useStateContext()

  const handleBuyNow = ()=>{
    addProductToCart(product, qty)
      setShowCart(true)
  }

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={urlFor(image && image[index])}/>
                </div>
                <div className='small-images-container'>
                {
                    image.map((item, i)=>(
                        <img 
                        src={urlFor(item)} className={i===index ? 
                        'small-image selected-image':'small-image'
                        }
                        onMouseEnter={()=>setIndex(i)}
                        key={i}
                        />
                    ))
                }
            </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                </div>
                <p>20</p>
                <h4>Details : </h4>
                <p>{details}</p>
                <p className='price'>{price}$</p>
                <div className='quantity'>
                    <h3>Quantity : </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                        <span className='num' >{qty}</span>
                        <span className='plsu' onClick={incQty}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button 
                    type="button"
                    className='add-to-cart'
                    onClick={()=>addProductToCart(product,qty)}>
                    Add to Cart
                    </button>
                    <button 
                    type="button"
                    className='buy-now'
                    onClick={()=>{handleBuyNow()}}>
                    Buy Now
                    </button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {
                        products.map(product=>{
                            return (
                                <Product 
                                key={product._id}
                                product = {product}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths= async ()=>{
    // just return the current slug property
    const query = `*[_type == "product"]{ 
        slug{
            current
        }
    }`
    const products = await client.fetch(query);

    const paths = products.map((product)=>({
        params : {
            slug : product.slug.current
        }
    }))

    return {
        paths : paths,
        fallback : 'blocking'
    }
}

export const getStaticProps = async ({params : {slug}})=>{
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`
    const product = await client.fetch(query);
  
    const productsQuery = '*[_type == "product"]'
    const products = await client.fetch(productsQuery);
  
    return {
      props : {product, products}
    }
  }

export default ProductDeatils