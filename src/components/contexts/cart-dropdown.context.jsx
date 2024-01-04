import { createContext, useState,useEffect} from "react"; 

const addCartItem=(cartItems,productToAdd)=>{
    // necesito ver si cartItems contiene el productToAdd
    const existingCartItem=cartItems.find(
        (cartItem)=> cartItem.id===productToAdd.id
    );

    // si si existe el producto entonces aumentar su cantidad en 1
    if(existingCartItem){
        return cartItems.map(
            (cartItem)=>cartItem.id===productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1}:cartItem
            
        )
    }
    return [...cartItems,{...productToAdd,quantity:1}]// estamos devolviendo los items del carro ya existentes y le estamos agregando el nuevo
    // y como es nuevo tenemos que agregarle la propiedad quantity porque no la traia.
}

const removeCartItem=(cartItems,cartItemToRemove)=>{
    // verificando si el producto existe en el arreglo de los items existentes
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id)

    // si existe entonces vamos a ver si su cantidad es 1 para removerlo de la lista
    if(existingCartItem.quantity===1){
        return cartItems.filter((cartItem)=>cartItem.id !== cartItemToRemove.id)
    }
    return cartItems.map(
        (cartItem)=>cartItem.id===cartItemToRemove.id ? {...cartItem,quantity:cartItem.quantity-1}:cartItem
        
    )
}

const clearCartItem=(cartItems,cartItemToClear)=>{
    return cartItems.filter((cartItem)=>cartItem.id!==cartItemToClear.id)
}

export const CartDropdownContext =createContext(
    {
        isCartOpen:'false',
        setIsCartOpen:()=>{},
        cartItems:[],// el estado de que items hemos adicionado en el carrito
        addItemToCart:()=>{}, // funcion propia para adicionar items al carrito
        removeItemToCart:()=>{}, // para ir quitando items del carrito
        cartCount:0, //para llevar la cuenta de cuantos items hay en el carro /(mas que todo para el icono del shop) 
        clearItemFromCart: () => {},
        cartTtotal:0,
    }
)

export const CartDropdownProvider =({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartTotal,setCartTotal]=useState(0)

    // Contador de items en el Carrito
    useEffect(
        ()=>{
           const newCartCount=cartItems.reduce((accumulator,cartItem)=>{return accumulator+cartItem.quantity},0)// importante poner
           // el cero en el reduce, que es el valor inicial
           setCartCount(newCartCount)
        }
    ,[cartItems])//queremos actualizar la cuenta de items cada vez que cambie este estado de cartItems, osea cada que agreguen uno

    // Contador del precio total que sale de la cantidad de items * el precio unitario
    useEffect(
        ()=>{
            const newCartTotal=cartItems.reduce((accumulator,cartItem)=> accumulator+(cartItem.quantity*cartItem.price),0);// importante poner
            // el cero en el reduce, que es el valor inicial
            setCartTotal(newCartTotal)
        },[cartItems]);

    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd))
    }

    const removeItemToCart=(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
      };

    const value={isCartOpen,setIsCartOpen,addItemToCart,removeItemToCart,cartItems,cartCount,clearItemFromCart,cartTotal}
    return (<CartDropdownContext.Provider value={value} >{children}</CartDropdownContext.Provider>)
}
