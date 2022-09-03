import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



export default function FormDialog({ amount, fee }) {
    const [open, setOpen] = React.useState(true);
    const [pin, setPin] = React.useState('')
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate()

    const handleClick = async () => {
        const result = await axios.post('http://localhost:4000/bank/pin', {
            pin,
            acNo: JSON.parse(localStorage.getItem('user')).acNo
        })
        if (result.data) {
            toast.success("PIN verified");
            //setOpen(false)
            setLoader(true)
            const result = await axios.post('http://localhost:4000/bank', { acNo: JSON.parse(localStorage.getItem('user')).acNo , amount })
            console.log(result.data)
            if (result.data.result) {
                const t1 = await axios.post("http://localhost:4000/transaction/add", { accountIn: "2017000000", accountOut: JSON.parse(localStorage.getItem('user')).acNo, transactionAmount: amount })
                const t2 = await axios.post("http://localhost:4000/transaction/add", { accountOut: "2017000000", accountIn: "2017331007", transactionAmount: (amount-fee) })
                //console.log(t1,t2)
                //add seller 
                const op = await axios.post("http://localhost:4001/order/add",{cookie:localStorage.getItem('authToken'),transactionID:t1.data.transactionID,sellerTransactionID:t2.data.transactionID,seller:"2017331007"});
                const clearCart = await axios.post("http://localhost:4001/user/cart/clear", { cookie: localStorage.getItem('authToken') })
                setLoader(false)
                setOpen(false)
                toast.success("Transaction Successful");
                navigate('/order')

            } else {
                setOpen(false)
                toast.error("Insufficient Balance")
                navigate('/cart')
            }
        } else {
            toast.error("Incorrect PIN");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Your Bank Secret PIN</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your order ${amount}tk will be deducted from your bank accout. Enter the pin only if you agree.
                    </DialogContentText>
                    {!loader && (
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pin"
                            label="PIN"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />
                    )}
                    {
                        loader && (<div>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>Confirm PIN</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
