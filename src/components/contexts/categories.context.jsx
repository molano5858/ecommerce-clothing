import { createContext, useEffect, useState} from "react"; 
import { addCollectionsAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from '../../shop-data.js'
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext=createContext({
    categoriesMap:{},
})

export const CategoriesProvider=({children})=>{
    const [categoriesMap,setCategoriesMap]=useState({});

    // llamamos addCollectionsAndDocuments
    // useEffect(()=>{addCollectionsAndDocuments('categories',SHOP_DATA)},[])// ya no lo usamos, solo era para subirlo a firebase
    //con esto creamos nuestras categorias en la base de datos firebase
    
    useEffect(()=>{
        const getCategoriesMap=async ()=>{
            const categoryMap= await getCategoriesAndDocuments()
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap()
    },[])

    const value={categoriesMap}
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}