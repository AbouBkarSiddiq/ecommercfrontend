import React, {useEffect} from 'react'

const ProductDetails = () => {
    useEffect(() =>{
        console.log("Rendered.")
    })
    
    return (
        <div>
            <h3>Product Details Page.</h3>
        </div>
    )
}

export default ProductDetails
