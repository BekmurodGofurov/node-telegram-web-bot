import { useState } from 'react';
import Button from '../button/button';
import './card.css';

const Card = props => {
    const [count, setCount] = useState(0);
    const {fruit, onAddItem, onRemove} = props;
    
    const handleIncrement = () => {
        setCount(prev => prev + 1)
        onAddItem(fruit)
    };

    const handleDecrement = () => {
        setCount(prev => prev - 1)
        onRemove(fruit)
    };
    
    return (
        <div className='card'>
            <span className={`${count !== 0 ? 'card_badge' : 'card_badge_hiddin'}`}>{count}</span>

            <div className='image_container'>
                <img src={fruit.Image} alt={fruit.title} width={'100%'} height={'230px'}/>
            </div>

            <div className='card_body'>
                <h2 className='card_title'>{fruit.title}</h2>
                <div className='card_price'>
                    <p>{fruit.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}</p>
                </div>
            </div>

            <div className='hr'></div>

            <div className='btn_container'>
                <Button title={'+'} type={"add"} onClick={handleIncrement} />
                {count !== 0 && (
                    <Button title={'-'} type={"remove"} onClick={handleDecrement} />
                )}
            </div>

        </div>
    )

};

export default Card;