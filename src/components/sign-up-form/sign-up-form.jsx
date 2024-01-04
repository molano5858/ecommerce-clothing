import { useState} from "react"
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input"
import './sign-up-form.styles.scss'
import Button from "../button/button"

const defaultFormFields={
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const SignUpForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields);
    const {name,email,password,confirmPassword}=formFields;
    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit= async (event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            alert('Password doesn´t match')
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{name})
            resetFormFields()
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('email is aready in use')
            }
            console.log('user creationg encounter an error ',error)
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
            <h2>Don´t have an account?</h2>
            <span>Sign up with email and password</span>
            <form action="" onSubmit={handleSubmit}>
                {/* <label htmlFor="name">Name</label> */}
                <FormInput label='Name' name='name' type="text" required onChange={handleChange} value={name}/>
                {/* <label htmlFor="email">Email</label> */}
                <FormInput label='Email' name='email' type="email" required onChange={handleChange} value={email}/>
                {/* <label htmlFor="password">Password</label> */}
                <FormInput label='Password' name='password' type="password" required onChange={handleChange} value={password}/>
                {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                <FormInput label='Confirm Password' name='confirmPassword' type="password" required onChange={handleChange} value={confirmPassword}/>
                <Button type="submit" buttonType='default' >Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm