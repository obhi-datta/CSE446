import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter, Stack } from '@mui/material';
import axios from 'axios'
import Payment from '../components/Payment'
import DeleteIcon from '@mui/icons-material/Delete';

function CartScreen() {
  const [cart, setCart] = useState([])
  const [subT,setST]=useState("");
  const [fee,setF]=useState("");
  const [total,setT]=useState("");
  const [open,setOpen]=useState(false)
  const fetchData = async () => {
    const result = await axios.post('http://localhost:4001/user/cart/view', {
      cookie: localStorage.getItem('authToken')
    })
    let count=0;
    result.data.cart.map((row)=>{
      count+= parseInt(row.quantity)*parseInt(row.price)
    })
    setST(count)
    setF(count* .05);
    setT(count+ (count*.05))
    setCart(result.data.cart)
  }

  const removeFromCartHandler = async (id, seller) => {
    
    console.log(id)
    await axios.post('http://localhost:4001/user/cart/delete', {
      cookie: localStorage.getItem('authToken'),
      product: id,
      seller
    })
      .then(function (response) {
        console.log(response);
        if(response.status === 200){
            window.history.go(0)
          }
          //setCartItems([...response.data.cart])
        
      })
      .catch(function (error) {
        console.log(error);
        alert('Error occured during deleting item')
      });
  }

  const handleClick= async ()=>{
    setOpen(true)
  }
  useEffect(() => {
    fetchData()
  },[])
  return (
    <div style={{ width: '80%', marginLeft: '10%' }}>
      {open && (<Payment amount={total} fee={fee}/>)}
      {!open && (<div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell>Product Name</TableCell>
                <TableCell >Price&nbsp;(৳)</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell >

                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(cart)}
              {cart.map((row) => (
                <TableRow
                  key={row.product}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell align='right'>{row.quantity}</TableCell>
                  <TableCell align='right'>
                      <Button variant='outlined' color="error" onClick={e => {removeFromCartHandler(row.product, row.seller)}}>
                        <DeleteIcon/>
                      </Button>
                  </TableCell>
                  
                </TableRow>
              ))}
              
              <hr/>
              <hr/>
              <TableRow></TableRow>

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{subT}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fee</TableCell>
                <TableCell align="right">{`5 %`}</TableCell>
                <TableCell align="right">{fee}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button onClick={handleClick} variant='contained' style={{ textAlign: 'center', marginLeft: '45%', marginTop: '20px' }}>
            Place order
          </Button>
        </div>
      </div>)}
    </div>
  )
}

export default CartScreen