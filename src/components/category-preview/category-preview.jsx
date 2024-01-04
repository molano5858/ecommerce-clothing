import './category-preview.scss'
import ProductCard from '../product-card/product-card'
import {Link } from 'react-router-dom' 

const  CategoryPreview= ({title,products})=>{
 
    const handleLinkScroll=()=>{
        window.scrollTo(0,0)
    }

    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title} onClick={handleLinkScroll}>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {products
                    .filter((_,index)=>index<4)
                    .map((product)=>(
                    <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}
export default CategoryPreview