import { useEffect, useState } from 'react';
import './App.css';
import { Products , Navbar , Cart , Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [ products , setProducts ] = useState([]);
  const [ cart , setCart ] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() =>{
    fetchProducts();
    fetchCart();
  }, [])

  const fetchProducts = async () =>{
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () =>{
    const response = await commerce.cart.retrieve();
    setCart(response)
  }

  const handleAddToCart = async(productId , quanitity) =>{
    const item = await commerce.cart.add(productId , quanitity);

    setCart(item.cart);
  }

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };


  return (
    <Router>
      <Navbar totalItems={ cart.total_items }></Navbar>
      <Switch>
        <Route exact path="/">
          <Products products={ products } onAddToCart={ handleAddToCart }></Products>
        </Route>
        <Route path="/cart">
          <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
        </Route>
        <Route path="/checkout">
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
