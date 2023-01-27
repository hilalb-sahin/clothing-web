import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../shop-data.json';

//store product data 
//you need both context and provider
export const ProductContext = createContext({
        products: [],


    });


    //provider returns context
export const ProductProvider = ( {children} )=> {
    //default useState value is products.
    const [products, setProducts] = useState(PRODUCTS);
    //value is products as the object
    const value ={products};
    return(
        <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
    )
}

export default ProductContext;