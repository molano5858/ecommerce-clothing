import {useParams} from 'react-router-dom'
import {useContext ,useEffect,useState} from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../product-card/product-card'
import './category.styles.scss'

const Category = ()=>{
    const {category}=useParams();
    const {categoriesMap}=useContext(CategoriesContext)

    const [products,setProducts]=useState(categoriesMap[category])

    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return(
        <>
        <h2 className='title'>{category.toLocaleUpperCase()}</h2>
        <div className='category-container'>
            
            { products && // colocamos esto para que renderice solamente si products existe ya que products es asincrono entonces se va a demorar
            // mientras los datos de productos llegan, si no ponemos esto, va a decir que products es undefined porque no existe
                products.map((product)=>{
                    return <ProductCard key={product.id} product={product}/>
                })
            }
        </div>
        </>
        
    )
}

export default Category