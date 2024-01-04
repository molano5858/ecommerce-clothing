import './checkout.scss'
import { useContext } from 'react'
import { CartDropdownContext } from '../../contexts/cart-dropdown.context'
import CheckoutItem from '../../checkout-item/checkout-item'

const Checkout=()=>{
    const {cartItems,cartTotal}=useContext(CartDropdownContext)

    
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem)=>{
            return(
                // <div key={cartItem.id}>
                //     <h4>{cartItem.name}</h4>
                //     <span onClick={()=>removeItemToCart(cartItem)}>decrement</span>
                //     <span>{cartItem.quantity}</span>
                //     <span onClick={()=>addItemToCart(cartItem)}>increment</span>
                // </div>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )}
            )}

            
                
            <span className='total'>Total: ${cartTotal}</span>

        </div>
    )
}

export default Checkout