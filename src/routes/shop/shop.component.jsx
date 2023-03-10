import { useContext } from 'react';
import './shop.styles.scss'
import { ProductContext } from '../../context/product.context'
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {
    const { products } = useContext(ProductContext);

    return(
        <div className = "products-container"> 
            {products.map((product) => (
                <ProductCard key ={product.id} product ={product}> </ProductCard>
            ))}
        </div>
    )
    
}

export default Shop;