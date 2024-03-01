import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseValue, getAllCartProduct, increaseValue, removeItem } from '../feature/userDetailSlice'

function Cart() {
    const { cart } = useSelector((state) => state.app)
    console.log(cart, 'cart')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCartProduct())
    }, [])

    const handleIncrease = (id) => {
        const findObj = cart.find((elem) => elem.id === id)
        if (findObj.qty >= 1 && findObj.stock > 0) {
            const updatedQty = findObj.qty + 1
            const updatedStock = findObj.stock - 1
            dispatch(increaseValue({ ...findObj, qty: updatedQty, stock: updatedStock }))
        }

    }
    const handleDecrease = (id) => {
        const findObj = cart.find((elem) => elem.id === id)
        if (findObj.qty > 1 && findObj.stock >= 0) {
            const updatedQty = findObj.qty - 1
            const updatedStock = findObj.stock + 1
            dispatch(decreaseValue({ ...findObj, qty: updatedQty, stock: updatedStock }))
        }

    }
    const handleRemove = (id) => {
        const filterCart = cart.filter((elem) => elem.id !== id)
        dispatch(removeItem({ id, filterCart }))
    }
    useEffect(() => {
        dispatch(getAllCartProduct())
    }, [])

    const initialvalue = 0
    const totalAmount = cart.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue.price * currentValue.discountPercentage) / 100) * (currentValue.qty)
    }, initialvalue)
    // console.log(totalAmount, 'totalAmount')

    return (
        <div >
            <div>
                <h4><u>Total Price: $ {(totalAmount).toFixed(2)}</u></h4>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {cart && cart.map((product) => {
                    return (
                        <div class="card" style={{ width: '24%', marginTop: '20px' }}>
                            <img class="card-img-top" src={product.thumbnail} alt="Image" style={{ height: '300px' }} />
                            <div class="card-body">
                                <h5 class="card-title">{product.title}</h5>
                                <p class="card-text">{product.description}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Price: {`$ ${(product.price).toFixed(2)}`}</li>
                                <li class="list-group-item">Discount Percentage: {product.discountPercentage}</li>
                                <li class="list-group-item">Net Price: {` $ ${(((product.price * product.discountPercentage) / 100)).toFixed(2)}`} </li>
                                <li class="list-group-item">Gross Price: {` $ ${(((product.price * product.discountPercentage) / 100) * (product.qty)).toFixed(2)}`} </li>
                                <li class="list-group-item">Stock: {product.stock}</li>
                            </ul>
                            <div class="card-body">
                                <button className='btn btn-dark' onClick={() => handleDecrease(product.id)} disabled={product.qty === 1}>-</button>
                                <span style={{ marginLeft: '10px', marginRight: '10px' }}>{product.qty}</span>
                                <button className='btn btn-dark' onClick={() => handleIncrease(product.id)} disabled={product.stock === 0}>+</button><span style={{ marginLeft: '10px' }}></span>
                                <button type='button' class="btn btn-danger" onClick={() => handleRemove(product.id)}>Remove</button>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Cart