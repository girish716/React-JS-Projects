import React,{createContext, useContext, useState, useEffect} from 'react'
import toast from 'react-hot-toast'

const Context = createContext();


const StateContext = ({children}) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities,setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct;
  let index;

  const incQty = ()=>{
      setQty(prevQty => prevQty+1)
  }

  const decQty = ()=>{
    setQty(prevQty => {
        if(prevQty-1<1) return 1
        return prevQty-1;
    })
  }

  const addProductToCart = (product, quantity)=>{
    const checkProductInCart = cartItems.find(item=>item._id===product._id)

    setTotalPrice(prevTotalPrice=>prevTotalPrice+product.price*quantity)
    setTotalQuantities(prevTotalQuantities=> prevTotalQuantities+quantity)

    if(checkProductInCart){
        const updatedCartItems = cartItems.map(item=>{
            if(item._id===product._id){
                return {
                    ...product,
                    quantity : item.quantity+quantity
                }
            }else{
                return item
            }
        })
    
        setCartItems(updatedCartItems)
    }
    else{
        product.quantity = quantity
        setCartItems([...cartItems, {...product}])
    }
    toast.success(`${qty} ${product.name} added`)
  }

  const toggleCartItemQuantity = (id, value)=>{
        foundProduct = cartItems.find(item=>item._id===id)

        if(value==='inc'){
            setCartItems(prevItems=>{
                let newCartItems = prevItems.map(item=>{
                    if(item._id===id){
                        return {
                            ...item,
                            quantity : item.quantity+1
                        }
                    }
                    else{
                        return item
                    }
                })
                setCartItems(newCartItems)
            })
            setTotalPrice(prevTotalPrice=>prevTotalPrice+foundProduct.price)
            setTotalQuantities(prevTotalQuantities=>prevTotalQuantities+1)
        }else if(value==='dec'){
            if(foundProduct.quantity<=1){
                return;
            }
            setCartItems(prevItems=>{
                let newCartItems = prevItems.map(item=>{
                    if(item._id===id){
                        return {
                            ...item,
                            quantity : item.quantity-1
                        }
                    }
                    else{
                        return item
                    }
                })
                setCartItems(newCartItems)
            });
            
            setTotalPrice(prevTotalPrice=>prevTotalPrice-foundProduct.price)
            setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-1)
        }
  }

  const removeItem = (product)=>{
    let newCartItems = cartItems.filter(item=>item._id!=product._id)
    setTotalPrice(prevPrice => prevPrice-product.price*product.quantity)
    setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-product.quantity)
    setCartItems(newCartItems);
  }


  return (
    <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            addProductToCart,
            setShowCart,
            toggleCartItemQuantity,
            removeItem,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
    >
        {children}
    </Context.Provider>
  )
}

const useStateContext = ()=> useContext(Context)

export {useStateContext, StateContext}
