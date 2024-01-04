import { useState} from "react"
import {
        signInAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth,
        signInWithGooglePopUp} from '../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input"
import './sign-in-form.styles.scss'
import Button from "../button/button"

const defaultFormFields={
    email:'',
    password:'',
}
const SignInForm=()=>{

    // vamos a crear el usuario que va a pedir a firebase atutenticacion, tiene que ser asincrono
    const singInWithGoogle= async ()=>{
        await signInWithGooglePopUp();
    }

    const [formFields, setFormFields]=useState(defaultFormFields);
    const {email,password}=formFields;

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit= async (event)=>{ // esta se ejecuta cuando el submit del formulario se envia, en este caso el Sign In
        event.preventDefault();// prevenir el default del boton submit que ya sabes que genera cuando se ejecuta
        try {
            // aqui deconstruyo response, seria lo mismo que response.user
            const {user} = await signInAuthUserWithEmailAndPassword(email,password) // 
            resetFormFields()
        } catch (error) {
            if(error.code ==='auth/invalid-credential'){
                alert('el usuario no existe')
            }
        }
    }

    const handleChange =(event)=>{
        const {name,value}=event.target
        setFormFields({
            ...formFields, 
            [name]:value,
        })
    }
    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
                <FormInput label='Email' name='email' type="email" required onChange={handleChange} value={email}/>
                {/* <label htmlFor="password">Password</label> */}
                <FormInput label='Password' name='password' type="password" required onChange={handleChange} value={password}/>
                <div className="buttons-container">
                    <Button type="submit" buttonType='default'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={singInWithGoogle} >Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm