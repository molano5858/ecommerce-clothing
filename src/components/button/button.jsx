import './button.styles.scss'

// en la app hay tres tipos de butones, por eso vamos a crear una variable para poder manejarlos

const Button_type_classes={
    google:'google-sign-in',
    inverted:'inverted',
    
}

const Button=({children, buttonType, ...otherProps})=>{
    return(
        <button className={`button-container ${Button_type_classes[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}
export default Button