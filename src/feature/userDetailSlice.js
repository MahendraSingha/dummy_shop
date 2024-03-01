import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";


//for getting all product
export const getAllProduct = createAsyncThunk('getAllProduct', async () => {
    const response = await axios.get(`https://dummyjson.com/products`)
    const { products } = response.data
    // console.log(products, 'products')
    return products
})

//for getting product details
export const getProductDetail = createAsyncThunk('getProductDetail', async (id) => {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`)
    console.log(data, 'productDetailData')
    return data
})

// for add to cart action
export const addToCart = createAsyncThunk('addToCart', async (product) => {
    const { data } = await axios.post(`http://localhost:8500/carts`, product)
    console.log(data, 'res')
    return data
})

export const getAllCartProduct = createAsyncThunk('getAllCartProduct', async () => {
    const { data } = await axios.get(`http://localhost:8500/carts`)
    // console.log(response, 'response')
    return data
})
export const increaseValue = createAsyncThunk('increaseValue', async (obj) => {
    // console.log(obj, 'obj')
    const { data } = await axios.put(`http://localhost:8500/carts/${obj.id}`, obj)
    // console.log(data, 'ddd')
    return data
})
export const decreaseValue = createAsyncThunk('decreaseValue', async (obj) => {
    const { data } = await axios.put(`http://localhost:8500/carts/${obj.id}`, obj)
    return data
})
export const removeItem = createAsyncThunk('removeItem', async (obj) => {
    // console.log(obj, 'obj')
    const { data } = await axios.delete(`http://localhost:8500/carts/${obj.id}`)
    // console.log(data, 'dlt')
    return obj.filterCart
})


export const product = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: {},
        loading: false,
        error: null,
        cart: [],
    },
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, '890')
            state.products = [...action.payload]
        },
        [getAllProduct.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },

        //product detail
        [getProductDetail.pending]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload
        },
        [getProductDetail.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },

        //for cart action
        [addToCart.pending]: (state) => {
            state.loading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, '890')
            state.cart.push(action.payload)
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },

        //for getting all cart product
        [getAllCartProduct.pending]: (state) => {
            state.loading = true;
        },
        [getAllCartProduct.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, '890')
            state.cart = [...action.payload]
        },
        [getAllCartProduct.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },
        //for increase action
        [increaseValue.pending]: (state) => {
            state.loading = true;
        },
        [increaseValue.fulfilled]: (state, action) => {
            state.loading = false;
            const find = state.cart.findIndex((elem) => elem.id === action.payload.id)
            // console.log(find, 'find')
            state.cart[find] = action.payload
        },
        [increaseValue.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },
        //for decrease action
        [decreaseValue.pending]: (state) => {
            state.loading = true;
        },
        [decreaseValue.fulfilled]: (state, action) => {
            state.loading = false;
            const find = state.cart.findIndex((elem) => elem.id === action.payload.id)
            // console.log(find, 'find')
            state.cart[find] = action.payload
        },
        [decreaseValue.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },
        //action for remove
        [removeItem.pending]: (state) => {
            state.loading = true;
        },
        [removeItem.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log(action.payload, 'ppp')
            state.cart = [...action.payload]
        },
        [removeItem.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },

    }
})

export default product.reducer