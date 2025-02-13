
import { BrowserRouter, Route, Routes } from 'react-router';
import Shop from './pages/Shop';
import OnSales from './pages/OnSales';
import NewArrival from './pages/NewArrival';
import Brands from './pages/Brands';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Gym from './pages/gym';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <>
    <Provider store={store}>

   
   
<BrowserRouter>
<Routes>
  <Route path='/' index element={<Shop/>}/>
  <Route path='/onsales'  element={<OnSales/>}/>
  <Route path='/newarrivals' element={<NewArrival/>}/>
  <Route path='/brands' element={<Brands/>}/>
  <Route path='/productDetails' element={<ProductDetail/>}/>
  <Route path='/categorypage' element={<CategoryPage/>}/>
  <Route path='/gym' element={<Gym/>}/>
  <Route path='/cart' element={<Cart/>}/>
</Routes>
</BrowserRouter>
</Provider>
   </>
  );
}

export default App;
