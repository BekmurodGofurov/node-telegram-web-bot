import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { getData } from './constants/db';

const fruits = getData()
const tg = window.Telegram.WebApp

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tg.ready()
  })

  const onAddItem = item => {
    const existItem = cartItems.find(c => c.id == item.id);
    console.log("Exist item" ,existItem);
    
    if (existItem) {
      const newData = cartItems.map(c => c.id == item.id ? {...existItem, quontity: existItem.quontity + 1} : c);
      setCartItems(newData);
      console.log("add quontity exist item", newData);
      
    } else {
      const newData = [...cartItems, {...item, quontity: 1}];
      setCartItems(newData)
      console.log("add quontity", newData);
    }
  };

 
  const onRemove = item => {
    const existItem = cartItems.find(c => c.id == item.id);
    console.log("existitem" , existItem);
    
    if (existItem.quontity ==1) {
      const newData = cartItems.filter(c => c.id != existItem.id)
      setCartItems(newData)
      console.log("make quontity 0", newData);
    } else{
      const newData = cartItems.map(c => c.id == existItem.id ? {...existItem, quontity: existItem.quontity -1} : c);
      setCartItems(newData)
      console.log("reove only 1 item", newData);
      
    }
  };

  const onCheckOut = () => {
    tg.MainButton.text = "Sotib olish :)";
    tg.MainButton.show();
  }

  const onSentData = useCallback(() => {
    const queryID = tg.initDataUnsafe?.query_id;

    if (queryID) {
      fetch("http://localhost:8000/web-data", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({products: cartItems, queryID: queryID})
      })
      
    } else {
      tg.sendData(JSON.stringify(cartItems))
    }

  }, [cartItems]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSentData)

    return() => tg.offEvent('mainButtonClicked', onSentData);
  }, [onSentData])

  return (
    <>
      <h1 className='heading'>Mevalar</h1>
      <Cart cartItems={cartItems} onCheckOut={onCheckOut}/> 

      <div className='cards_container'>
        {fruits.map(fruit => (
          <Card key={fruit.id} fruit={fruit} onAddItem={onAddItem} onRemove={onRemove}></Card>
        ))}
      </div>
    </>
  )
};

export default App