import Button from '../button/button'
import CartItem from '../cart-item/cart-item'
import { useContext } from 'react'
import {CartDropdownContext} from '../contexts/cart-dropdown.context'
import {useNavigate} from 'react-router-dom' // para poderle dar la ruta al boton y que nos lleve a la pagina
import './cart-dropdown.scss'


const CartDropdown=()=>{
    const {cartItems}=useContext(CartDropdownContext)

    //inicio de como navegar con el boton
    const navigate=useNavigate()
    const goToCheckoutHandler=()=>{
        navigate('/checkout')
    }
    //fin de como navegar con el boton
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item)=><CartItem key={item.id} cartItem={item}/>)}

            </div>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </div>
    )
    
    
}

export default CartDropdown