import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCartProduct } from '../feature/userDetailSlice'

function NavBar() {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.app)

    useEffect(() => {
        dispatch(getAllCartProduct())
    }, [])


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to='/' class="nav-link active" aria-current="page" >Home</Link>
                            </li>
                        </ul>
                        <Link to='/cart'>
                            <h5>Cart: {cart.length} </h5>
                        </Link>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar