import axios from "axios";
import { Alert } from "react-bootstrap";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import IconButton from "@mui/material/IconButton";

import FilledInput from "@mui/material/FilledInput";

import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function OrderScreen() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  const [orders, setOrders] = React.useState([]);
  const getBankBalance = async () => {
    // if(localStorage)
    const result = await axios.post("http://localhost:4000/bank", {
      acNo: user.acNo,
      amount: "0",
    });
    // console.log(result);
    setValues({
      ...values,
      password: result.data.acInfo.balance,
    });
  };

  const getOrders = async () => {
    if (localStorage.getItem('role') === 'user') {
      const result = await axios.post("http://localhost:4001/order/show", {
        user: localStorage.getItem("email"),
      });
      //console.log(result.data)
      setOrders(result.data);
    }
    else {
      const result = await axios.post("http://localhost:4001/order/seller", {
        seller: user.acNo
      })
      // console.log(result.data)
      setOrders(result.data);

    }

  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateOrder = async (order) => {
    const result = await axios.post("http://localhost:4001/order/status", {
      order
    });
    if (result.status === 200) {
      // navigate('/order')
      window.history.go(0)
    }
    console.log(result)
  }

  React.useEffect(() => {
    getOrders();
    getBankBalance();

  }, []);
  return (
    <div style={{ width: "70%", marginLeft: "10%", marginTop: "20px" }}>
      <div>
        <h1 style={{ width: "70%", marginTop: "25px" }}>Bank Information</h1>
      </div>
      <div>
        <FilledInput
          id="filled-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          //onChange={handleChange('password')}
          disabled
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>

      <div>
        <div>
          <h1 style={{ width: "70%", marginTop: "25px" }}>Order Information</h1>
        </div>

        {orders.length == 0 ? (
          <Alert variant="info">
            {/* <Alert variant={variant}>{children}</Alert> */}
            Your order list is empty.
          </Alert>
        ) : (
          <div>
            {console.log(orders.filter(i => i.delivered).length, orders.filter(i => !i.delivered).length)}
            {orders.filter(i => !i.delivered).length > 0 &&
              <div>
                <h3>Processing order</h3>
                <TableContainer component={Paper}>
                  <Table sx={{}} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order Number</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>Transaction ID</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>Order Status</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {orders.filter(item => item.delivered === false).map((row) => (
                      <TableBody>
                        <StyledTableRow key={row.order}>
                          <StyledTableCell component="th" scope="row">
                            {row.order}
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: 'center' }}>{row.transactionID}</StyledTableCell>
                          <StyledTableCell style={{ textAlign: 'center' }}>
                            {row.delivered ? `Delivered` : `Processing`}

                            {!row.delivered && localStorage.getItem('role') === 'supplier' &&
                              <Button style={{ marginLeft: '20%' }} onClick={e => validateOrder(row.order)}>
                                <FactCheckIcon></FactCheckIcon> Validate
                              </Button>
                            }

                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>

              </div>

            }
            <br/>

            {
              orders.filter(i => i.delivered).length > 0 &&


              <div>
                <h3>Delivered order</h3>

                <TableContainer component={Paper}>

                  <Table sx={{}} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order Number</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>Transaction ID</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>Order Status</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {orders.filter(item => item.delivered === true).map((row) => (
                      <TableBody>
                        <StyledTableRow key={row.order}>
                          <StyledTableCell component="th" scope="row">
                            {row.order}
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: 'center' }}>{row.transactionID}</StyledTableCell>
                          <StyledTableCell style={{ textAlign: 'center' }}>
                            {row.delivered ? `Delivered` : `Processing`}

                            {!row.delivered && localStorage.getItem('role') === 'supplier' &&
                              <Button style={{ marginLeft: '20%' }} onClick={e => validateOrder(row.order)}>
                                <FactCheckIcon></FactCheckIcon> Validate
                              </Button>
                            }

                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderScreen;
