import {Outlet,Link } from 'react-router-dom' 
import React from 'react'
import {useContext} from 'react'
import './navigation.styles.scss'
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
import { UserContext } from '../../contexts/user'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../cart-icon/cart-icon'
import CartDropdown from '../../cart-dropdown/cart-dropdown'
import {CartDropdownContext} from '../../contexts/cart-dropdown.context'
const Navigation = ()=>{
  //voy a accesar al usuario que esta guardado en el contexto
  const {currentUser}=useContext(UserContext)

  //INICIO consumir estado de dropdown
  const {isCartOpen}=useContext(CartDropdownContext)

  // cuando cerramos sesion, nosotros no sabemos que esta cerrando sesion basados en nuestro contexto, por eso crearemos un handler
  // para poder volver a setear el usuario actual por null.
  // const signOutHandler= async()=>{
  //   await signOutUser();
  //   setCurrentUser(null)
  // } ESTO YA NO SE USA PORQUE EL LISTENER DE SI ESTA ADENTRO O AFUERA EL USUARIO LO VA A ESCUCHAR, ENTONCES YA NO TENEMOS QUE ACTALIZARLO
  // EN EL CONTEXTO

  
    

    return (
      <React.Fragment>
        <div className='navigation'>
            <Link className='logo-container' to={'/'}>
                <CrwnLogo />
            </Link>
            <div className='nav-links-container'>
              <Link className='nav-link' to={'/shop'}>Shop</Link>
              {/* cuando el usuario ya esta adentro queremos renderizar un link distinto, en vez de entrar, pues salir 
              sign in va a cambiar a sign out cuando ya entramos, esto funciona para ambos formularios, sign in y sign up*/}
              {
                currentUser ? (<span className='nav-link' onClick={signOutUser}>Sign out</span>) : <Link className='nav-link' to={'/auth'}>Sign In</Link>
              }
              <CartIcon /> 
            </div>

             {isCartOpen && <CartDropdown />} 

            
        </div>
        <Outlet />
      </React.Fragment>
    )
  }

export default Navigation