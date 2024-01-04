// ESTE ARCHIVO ES UNA COPIA DE LO QUE TENIAMOS HASTA CIERTA CLASE, PERO EL PROFESOR LO BORRO PARA SEGUIR, ES IMPORTANTE
// LO QUE HAY AQUI YA QUE EXPLICA COMO USAR AUTENTICACION CON FIREBASE Y CREAR REGISTROS EN LA BASE DE DATOS FIRESTORE

// aqui vamos a crear todo para incorporar firebase al proyecto

import {initializeApp} from 'firebase/app' // INICIALIZAR
import {getAuth, signInWithPopup ,signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'// AUTENTICACION
import {getFirestore,doc, getDoc,setDoc} from 'firebase/firestore' // FIRESTORE BASE DE DATOS

// esta es la parte de INICIALIZAR 
// lo siguiente se copia y pega desde la pagina de firebase, se debe entrar al proyecto alla y registrarlo y genera este codigo
const firebaseConfig = {
    apiKey: "AIzaSyASVI7orOm6edo8BO-vLFVfeYIjCGe2dmE",
    authDomain: "crwn-clothing-db-aa0b4.firebaseapp.com",
    projectId: "crwn-clothing-db-aa0b4",
    storageBucket: "crwn-clothing-db-aa0b4.appspot.com",
    messagingSenderId: "419872883535",
    appId: "1:419872883535:web:7fd7767ff4596594897b3a"
};
const firebaseApp = initializeApp(firebaseConfig);

// parte de AUTENTICACION
const googleProvider= new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
});

export const auth= getAuth();
 export const signInWithGooglePopUp= ()=> signInWithPopup(auth, googleProvider) // saca un popup para autenticarnos
export const signInWithGoogleRedirect= ()=> signInWithRedirect(auth, googleProvider)// nos redirije a otra ventana apra autenticarnos


// ahora hay que ir a firebase y buscar autenticacion, entrar y seleccionar google y darle en permitir 

// parte de FIRESTORE BASE DE DATOS
// lo que hace todo esto es tomar la info del usuario que se registro y agregarlo a la base de datos
export const db=getFirestore();

export const createUserDocumentFromAuth= async (userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.uid)
    console.log(userDocRef)
    const userSnapShot= await getDoc(userDocRef) // sirve para ver si el usuario existe o no en la base de datos
    //console.log(userSnapShot.exists()) //el usuario no existe aun por eso deberia dar false

    // si el usuario no existe vamos a crearlo
    if(!userSnapShot.exists()){
        const {displayName, email} =userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creatint user ', error.message)
        }

    }else {
        return userDocRef
    }
} 