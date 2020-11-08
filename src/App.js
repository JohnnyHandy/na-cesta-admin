import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import List from './components/List'
import ProductDetails from './components/details'
import { fetchProductsRequest } from './store/products'

import './App.css';


const Container = ({children}) => (
  <div
    style={{
      width: '40%',
      height: '90%',
      background: 'white',
      padding: '2%'
    }}  
  >
    {children}
  </div>
)

function App() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [selectedProduct, setSelectedProduct] = React.useState()
  React.useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])
  console.log('products', products)
  const selectedProductDetails = products.items.find(item => item.id === selectedProduct)
  return (
    <div className="App">
      <Container
      >
        <List
          data={products.items}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
        />
      </Container>
      <Container>
        <ProductDetails product={selectedProductDetails} />
      </Container>
    </div>
  );
}

export default App;
