
import './form-input.styles.scss'

const FormInput=({label, ...otherProps})=>{

    return(
        <div className='group'>
            {label ? // renderizar label solo si viene una prop label, si no no haga nada 
            <label className={`${otherProps.value.length ? 'shrink' : null} form-input-label`} htmlFor="name">{label}</label>            
            :null}
            <input className='form-input' {...otherProps}/>
            
        </div>
    )
}

export default FormInput