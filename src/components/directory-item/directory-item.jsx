import './directory-item.styles.scss'

import {Link } from 'react-router-dom' 

const DirectoryItem=({category})=>{
    const {title,imageUrl}=category
    return(
        <div  className='directory-item-container'>
            <div className='background-image' style={{
                backgroundImage:`url(${imageUrl})`
                }}>
            </div>
            {/* <div className='body'>
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </div> */}
            <Link className='body' to={'/shop/'+title}>
                <div >
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </div>
            </Link>
        </div>
    )
}
export default DirectoryItem


