import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import axios from 'axios'
import { Button } from "@mui/material";
import AddProduct from "../components/AddProduct";


function Home() {
  const [products, setproducts] = useState([]);
  const [modal, setModal] = useState(false)
  const fetchProduct = async () => {
    const { data } = await axios.get('http://localhost:4001/product/allproduct')
    console.log(data)
    setproducts(data)
    // localStorage.removeItem('user')
    if(localStorage.getItem('user')){
      const res = await axios.post('http://localhost:4001/user/',{cookie: localStorage.getItem('authToken')})
      localStorage.removeItem('user')
      localStorage.setItem('user',JSON.stringify(res.data.userInfo))
    }
  }

  useEffect(() => {
    fetchProduct()

  }, [])

  return (
    <div style={{width:'90%', paddingLeft:'8%'}}>
      {localStorage.getItem('role') === 'supplier' && 
      <div style={{marginLeft:"4%", marginTop:'10px', display:'flex', justifyContent:'space-between'}}>
        <h2>Products</h2>
        <Button variant="contained"  style={{marginRight:'2%'}}
        onClick={e=>{setModal(true)}}
        >Add Product</Button>
        {modal && <AddProduct modal={modal} setModal={setModal}/>}
      </div>
}
      <div style={{ display: "flex", justifyContent: "space-around", width: "1200px" }}>
        

          {
            products.map((prod) => {
              return (
                <Product image={prod.image} name={prod.name} price={prod.price} description={prod.description} countInStock={prod.quantity} id={prod.product} seller={prod.seller}  />
              )
            })
          }


        
      </div>
    </div>

  );
}

export default Home;
