import './cart.css'
import Button from '../button/button'
import { totalPrice } from '../../units/total-price'

const Cart = ({cartItems, onCheckOut}) => {
    return (
    <div className='cart_container'>
        <p>Umumiy narhi: {totalPrice(cartItems).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}</p>
        <Button title={`${
            cartItems.length == 0 ? "Buyurma berish" : "To'lov"}`} 
            disable={cartItems.length == 0 ? true : false} 
            type={'checkout'} 
            onClick={onCheckOut}/>    
    </div>)
}

export default Cart 