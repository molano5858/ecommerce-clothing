// context para el Sign in and sign up
import { createContext, useState, useEffect} from "react"; 
import {onAuthStateChangedListener,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

// el valor actual al que quieres tener acceso
export const UserContext= createContext({
    currentUser:null,// valores por defecto para que funcione abajo el contexto
    setCurrentUser:()=>null// valores por defecto para que funcione abajo el contexto
}) 

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const value={currentUser,setCurrentUser}

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user)
            }// solo crear este user document si viene un usuario, si no no
            setCurrentUser(user)
        });
        return unsubscribe
    },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// despues de crear este contexto hay que envolver App en el index.js y el componente que necesite almacenar datos en el contexto
// se debe de usar useContext, por ejemplo en sign-in-form.jsx
// UserProvider va para envolver app
// UserContext va para el componente el cual quiere almacenar info, como sign-in-form