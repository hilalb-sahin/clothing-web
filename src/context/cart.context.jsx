import { createContext, useState, useEffect} from 'react';


//receive cartItems array and productToAdd
const addCartItem = (cartItems, productToAdd ) =>{
    //check if cartItems contains productToAdd
    //if callback true, it will return the thing 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //don't do mutations , return new array always.
    if (existingCartItem) {
        return cartItems.map ((cartItem)=> 
            cartItem.id===productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity +1 }
            : cartItem 
        );
    }
    return [...cartItems, {...productToAdd, quantity:1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) =>{
    //remove item, that already exists.
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // check if quantity equal 1 , if so remove from cart
    //use filter, gives new array 
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //return back cartitems with reduced quantity

    return cartItems.map ((cartItem)=> 
    cartItem.id===cartItemToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity -1 }
    : cartItem 
);
}


const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen : () => {},
    cartItems : [],
    addItemToCart: ()=>{},
    cartCount: 0,
    removeItemFromCart: () => {}, 
    clearItemFromCart: () => {},
    cartTotal: 0,
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen ]= useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //runs whenever the cartItems value changes 
    useEffect(()=> {
        const newCartCount = cartItems.reduce(
            (total, cartItem)=>  total +cartItem.quantity, 
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);



    useEffect(()=> {
        const newCartTotal = cartItems.reduce(
            (total, cartItem)=>  total +cartItem.quantity * cartItem.price, 
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);


    
    //receives a product
    const addItemToCart =(productToAdd)=> {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart =(cartItemToRemove)=> {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const clearItemFromCart =(cartItemToClear)=> {
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    }


    const value = { 
        clearItemFromCart,
        isCartOpen,
        setIsCartOpen ,
        addItemToCart , 
        cartItems ,
        cartCount, 
        removeItemFromCart,
        cartTotal,
     };
    
    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
};

