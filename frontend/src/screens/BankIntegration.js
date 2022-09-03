import React, {useState} from 'react'
import {Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link} from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


function BankIntegration() {

    const navigate = useNavigate()
    const [acNo, setAcno] = useState('')
    const [pin, setPin] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        localStorage.setItem('acNo',acNo)
        const name = JSON.parse(localStorage.getItem('user')).name
        console.log(name)
        const res2 = await axios.post('http://localhost:4000/bank/intrigate', { name ,acNo, pin  })
        console.log(res2)
        
            const result = await axios.post('http://localhost:4001/user/addbankac', { acNo, pin, cookie: localStorage.getItem('authToken')  })
            console.log(result)
        
        if(result.status === 200 && res2.status === 200){
            localStorage.setItem('verified', result.data.verified)
        navigate('/')
        }

    }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Bank integration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              
              label="Account no"
              name="acc"
              
              autoFocus
              value={acNo}
              onChange={e=> setAcno(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pin"
              label="Pin"
              type="password"
              id="pin"
            //   autoComplete="current-password"
              value={pin}
              onChange={e=> setPin(e.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  skip
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default BankIntegration