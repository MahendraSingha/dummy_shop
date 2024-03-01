import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getAllProduct } from '../feature/userDetailSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.app)
    console.log(products, 'products')

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProduct())
    }, [])

    const addToCartHandler = (product) => {
        dispatch(addToCart({ ...product, qty: 1, stock: (product.stock - 1) }))
        navigate('/cart')
    }



    return (
        <div>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {products.map((product) => {
                    return (
                        <div class="card" style={{ width: '24%', marginTop: '20px' }}>
                            <img class="card-img-top" src={product.thumbnail} alt="Image" style={{ height: '300px' }} />
                            <div class="card-body">
                                <h5 class="card-title">{product.title}</h5>
                                <p class="card-text">{product.description}</p>
                                <button class="btn btn-warning" onClick={() => addToCartHandler(product)}>Add To Cart</button>
                                <button type="button" class="btn btn-info" style={{ marginLeft: '10px' }}
                                    onClick={() => navigate(`/product-detail/${product.id}`)}>Product Details</button>
                            </div>
                        </div>

                    )
                })}

            </div>
        </div>
    )
}

export default Home