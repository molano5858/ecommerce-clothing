import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {useContext} from 'react'
import {CartDropdownContext} from '../contexts/cart-dropdown.context'
import './cart-icon.scss'

const CartIcon=()=>{

    const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartDropdownContext);
    const toggleIsCartOpen=()=>{
        console.log(isCartOpen)
        setIsCartOpen(!isCartOpen)
    }

    return(
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen} />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon