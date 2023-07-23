import React, { useState } from "react";
import { Grid, Paper, TextField, Button, InputAdornment } from "@mui/material";
import { MuiTelInput } from 'mui-tel-input'
import { Navigate } from "react-router-dom";
import validator from 'validator';
import { AccountCircle, AlternateEmail } from '@mui/icons-material';

function LoginPage() {

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' }
    const inputStyle = { margin: '20px 0px' };
    const btnStyle = { margin: '10px 0px 15px 0px' };

    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [Error, setError] = useState(false);
    const [phone, setPhone] = useState("");
    const [dis, setDis] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function handleSubmit() {
        setDis(true);
        const nameInput=document.getElementById("nameInput") as HTMLInputElement;
        const emailInput=document.getElementById("emailInput") as HTMLInputElement;
        const name=validator.escape(nameInput?.value)||"";
        const email=validator.escape(emailInput?.value)||"";
        console.log(phone);
        if(!validator.isEmail(email)){
            setEmailError(true);
            setDis(false)
        }
        if(name===""){
            setError(true);
            setDis(false);
        }
        if(phone===""){
            setPhoneError(true);
            setDis(false);
        }else{
            const user = {
                name: name,
                phone: phone,
                email: email
            }
            localStorage.setItem("userObject",JSON.stringify(user));
            setRedirect(true);
        }
        
    }

    function setPhoneNumber(newValue:string){
        setPhone(newValue);
    }

    return (
        <div>
            {redirect && <Navigate to="/home" replace={true} />}
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid container alignItems="center" justifyContent="center" >
                        <h2 style={{ margin: "40px 0px 45px 0px" }}>Sign In</h2>
                        <TextField id="nameInput" label="Name" variant="outlined" fullWidth required type="text" placeholder="Full Name" style={inputStyle}
                            error={Error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField id="emailInput" label={emailError ? "Incorrect Email" : "Email"} variant="outlined" fullWidth required type="email" placeholder="example@gmail.com" style={inputStyle}
                            error={emailError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmail />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <MuiTelInput error={phoneError} style={inputStyle} label="Phone" required fullWidth value={phone} onChange={setPhoneNumber} defaultCountry="IN" focusOnSelectCountry/>
                        <Button variant="outlined" fullWidth style={btnStyle} onClick={handleSubmit} disabled={dis}>Sign In</Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default LoginPage;