import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios  from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product({ image, name, description, price, countInStock ,id , seller}) {
  const [quantity, setQuantity] = React.useState(0);
  const [addBtn, setAddBtn] = useState(false)
  const navigate = useNavigate()
  const handleClick = async ()=>{
    const result = await axios.post('http://localhost:4001/user/cart/add',{
      product:id,
      price,
      quantity,
      seller,
      name,
      cookie:localStorage.getItem('authToken')
    })

    if(result.status === 200){
      toast.success("Product added to cart.")
      navigate('/cart')
    }
  }

  console.log(image)

  return (
    <div
      className="card"
      style={{ height: "500px", width: "400px", marginTop: "25px" , marginLeft: '20px'}}
    >
      <img src={`http://localhost:4001/${image}`} alt={name} className="card__img" />
      <div className="card__body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <h2 className="card__title">{name}</h2>
        <p className="card__description">{description}</p>
        <h3 className="card__price">{price}</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <InputLabel id="demo-select-small" style={{ color: "black" }}>
            Quantity
          </InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={quantity}
            label="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          >

            {[...Array(countInStock).keys()].map((x) => (
              <MenuItem value={x + 1}>{x + 1}</MenuItem>
            ))}
          </Select>
        </div>

        <button className="card__btn" onClick={handleClick} style={{backgroundColor: '#5f99f5', padding:'5px', borderRadius: '5px', }}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
