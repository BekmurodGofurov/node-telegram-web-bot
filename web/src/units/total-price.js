export const totalPrice = (arr) =>  {
    return arr.reduce((a, c)=> a + c.price * c.quontity, 0)
}