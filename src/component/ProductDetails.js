import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, getProductDetail } from '../feature/userDetailSlice'
import { useDispatch, useSelector } from 'react-redux'

function ProductDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { product } = useSelector((state) => state.app)
    console.log(product, 'productState')


    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [])


    const addToCartHandler = (product) => {
        dispatch(addToCart({ ...product, qty: 1, stock: (product.stock - 1) }))
        navigate('/cart')
    }

    return (
        <div class="card mx-auto" style={{ width: '50%', marginTop: '10px', marginBottom: '20px' }}>
            <img class="card-img-top" src={product.thumbnail} alt="Image" style={{ height: '300px' }} />
            <div class="card-body">
                <h5 class="card-title">{product?.title}</h5>
                <p class="card-text">{product?.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{`Product Price: $ ${product?.price}`}</li>
                <li class="list-group-item">{`Discount Percentage: ${product?.discountPercentage}`}</li>
                <li class="list-group-item">{`Rating: ${product?.rating}`}</li>
                <li class="list-group-item">{`Stock: ${product?.stock}`}</li>
            </ul>
            <div class="card-body">
                <button class="btn btn-warning" onClick={() => addToCartHandler(product)}>Add To Cart</button>
                <button type="button" class="btn btn-info" style={{ marginLeft: '10px' }}
                    onClick={() => navigate("/")}>Back to home</button>
            </div>
        </div>
    )
}

export default ProductDetails