// ESTE ARCHIVO ES UNA COPIA DE LO QUE TENIAMOS HASTA CIERTA CLASE, PERO EL PROFESOR LO BORRO PARA SEGUIR, ES IMPORTANTE
// LO QUE HAY AQUI YA QUE EXPLICA COMO USAR AUTENTICACION CON FIREBASE Y CREAR REGISTROS EN LA BASE DE DATOS FIRESTORE


import {signInWithGooglePopUp,signInWithGoogleRedirect, createUserDocumentFromAuth ,auth} from '../../utils/firebase/firebase.utils'
// se importa auth para que getAuth pueda funcionar
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

const SignIn=()=>{
    useEffect(async ()=>{
        const response= await getRedirectResult(auth);
        if(response){
            const userDocRef=await createUserDocumentFromAuth(response.user)
        }
    },[])// el redireect de google se tiene que hacer asi con un useEffect porque si se hace como el popup, al volver a la pagina no pasa nada
    // y no tenemos acceso al usuario ya que al ser un redirect(osea que se va para otra ventana) y vuelve va a volver a cargar la pagina
    // entonces no tendremos acceso al codigo despues del redirect.

    // vamos a crear el usuario que va a pedir a firebase atutenticacion, tiene que ser asincrono
    const logGoogleUser= async ()=>{
        const response = await signInWithGooglePopUp();
        const userDocRef=await createUserDocumentFromAuth(response.user)
        console.log(userDocRef)
    }
    
    
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Pop up
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign In with Google Redirect
            </button>
        </div>
    )
}

export default SignIn