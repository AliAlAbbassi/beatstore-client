import React from 'react'
import { useRecoilState } from 'recoil'
import { cartBeatState, isCartModelOpen } from '../atoms'
import store from '../store'
import { updateCart } from '../actions/authActions'
import { connect } from 'react-redux'
import { uniq } from 'lodash'

const CartModel = ({ beat, auth }) => {
    const [cart, setCart] = useRecoilState(cartBeatState)
    const [isOpenCart, setIsOpenCart] = useRecoilState(isCartModelOpen)

    const handleCartModel = () => {
        setIsOpenCart(!isOpenCart)
    }
    const removeItem = () => {
        if (auth.isAuthenticated) {
            let newCart = []
            cart.map(track => {
                if (track.name !== beat.name) {
                    newCart.push(track)
                }
                return null
            })
            store.dispatch(updateCart(uniq(newCart)))
            setCart(uniq(newCart))
            if (cart.length === 1)
                handleCartModel()
        } else {
            let newCart = []
            cart.map(track => {
                if (track.name !== beat.name) {
                    newCart.push(track)
                }
                return null
            })
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(newCart)
            if (cart.length === 1)
                handleCartModel()
        }
    }
    return (
        <div>
            <div className='grid grid-cols-3'>
                <img src={beat.cover60} className='beatCoverCartModel lg:w-10 lg:object-cover lg:rounded' alt='cover' />
                <div className='beatNameCartModel text-black text-left'>{beat.name}</div>
                <div>
    <svg className='whiteCrossWhiteModel' onClick={() => removeItem()} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512.001 512.001" space="preserve">
<g>
	<g>
		<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                </div>
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(CartModel)