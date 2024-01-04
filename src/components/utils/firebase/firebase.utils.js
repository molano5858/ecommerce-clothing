// aqui vamos a crear todo para incorporar firebase al proyecto

import {initializeApp} from 'firebase/app' // INICIALIZAR
import {
        getAuth, 
        signInWithPopup ,
        signInWithRedirect, // para redirect de google
        GoogleAuthProvider,// cuando el proveedor que elegimos en firebase es google
        createUserWithEmailAndPassword,// cuando elegimos el proveedor nativo de email y contraseña
        signInWithEmailAndPassword, // cuando elegimos entrar con email y password
        signOut, //metodo de firebase para salir
        onAuthStateChanged,// este es como un observador que nos permite cambiar cosas cuando la autenticacion cambia
    } from 'firebase/auth'// AUTENTICACION
import {getFirestore,doc, getDoc,setDoc,
        collection,// sirve para crear una nueva coleccion en firebase
        writeBatch,// 
        query,
        getDocs,
    } from 'firebase/firestore' // FIRESTORE BASE DE DATOS

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
 export const signInWithGooglePopUp= ()=> signInWithPopup(auth, googleProvider) // esta opcion da nos errores de CORS en consola, igual funciona
// pero mejor la hago con la opcion signInWithRedirect
export const signInWithGoogleRedirect= ()=> signInWithRedirect(auth, googleProvider)
// ahora hay que ir a firebase y buscar autenticacion, entrar y seleccionar google y darle en permitir 

// parte de FIRESTORE BASE DE DATOS
// lo que hace todo esto es tomar la info del usuario que se registro y agregarlo a la base de datos
export const db=getFirestore();

// vamos a crear un metodo para poder crear colecciones en firebase, es para subir un json con los productos
export const addCollectionsAndDocuments =async(collectionKey,objectsToAdd)=>{// (nombre que le quiero dar, elementos que quiero crear)
    const collectionRef= collection(db,collectionKey)//Collection es el metodo que importamos, db es la db de firebase, collectionKey es como el nombre que le vamos a dar
    const batch=writeBatch(db);
    
    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef,object.title.toLowerCase())
        batch.set(docRef,object)
    })

    await batch.commit();
    console.log('done')
} // esto va a ir en el contexto de productos

// vamos a crear un metodo para traer esa coleccion que creamos aqui arriba con addCollectionsAndDocuments
export const getCategoriesAndDocuments = async ()=>{
    const collectionRef=collection(db,'categories');// 'categories' es el nombre que tiene la colecction en firebase
    const q= query(collectionRef)

    const querySnapshot= await getDocs(q);
    const categoryMaps=querySnapshot.docs.reduce((
        accumulator, docSnapShot)=>{
            const {title, items}=docSnapShot.data();
            accumulator[title.toLowerCase()]=items;
            return accumulator
        }
        ,{})// aquivalor inicial de reduce es un {} vacio
    return categoryMaps
}

export const createUserDocumentFromAuth= async (userAuth, additionalInformation={})=>{
    if(!userAuth){return} // si no recibimos nada no se hace nada
    const userDocRef=doc(db,'users',userAuth.uid)
    const userSnapShot= await getDoc(userDocRef) // sirve para ver si el usuario existe o no en la base de datos
    //console.log(userSnapShot.exists()) //el usuario no existe aun por eso deberia dar false

    // si el usuario no existe vamos a crearlo
    if(!userSnapShot.exists()){
        const {displayName,email} =userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('Error creatint user ', error.message)
        }

    }else {
        return userDocRef
    }
} 

// creando autenticacion par aun usuario con email y contraseña

export const createAuthUserWithEmailAndPassword= async (email,password)=>{
    if(!email || !password){return} // si no recibimos nada no se hace nada
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password){return} // si no recibimos nada no se hace nada
    return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser= async ()=>await signOut(auth); 
// este lo vamos a importar en navigation para cerrar sesion

// este es como un observador o un escuchador de cuando la autenticacion cambia
export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth,callback)// recibe dos parametros, 1 al autenticador, 2 un callback 
//de lo que queires hacer