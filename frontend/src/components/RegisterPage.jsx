import React, {useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";

function RegisterPage() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  // button and container styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    marginTop: '-90px'
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    backgroundColor: '#FFFFFF',
    borderRadius: '2px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '60%'
  };

  const labelStyle = {
    marginBottom: '25px',
    fontSize: '20px',
    fontWeight: 400,
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontStyle: 'normal'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4279e5',
    color: '#000000',
    border: 'none',
    //borderRadius: '3px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: 20,
            border: '1px solid #e3e3e3',
            pl: 2,
            boxShadow: 'none',
            mr: { sm: 5 } 
  };

  const regbuttonStyle = {
    minWidth: '300px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#DBDCF9',
    color: '#000000',
    border: 'none',
    //borderRadius: '3px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: 20,
            border: '1px solid #e3e3e3',
            pl: 2,
            boxShadow: 'none',
            mr: { sm: 5 } 
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF'
    //boxShadow: '#DBDCF9'
  };
  const headerStyle = {
    fontFamily: 'Roboto',
    margin: '20px 0 10px 0',
    fontSize: '26px',
    textAlign: 'center',
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
     

  };


  //handles the user entering username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //handles the user entering password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <div >
     <Typography variant="h4" component="h2" style={headerStyle}>Register</Typography>
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
      <label  style={labelStyle}>
          First Name:
          <input type="Username" value={Username} onChange={handleUsernameChange} 
          style = {inputStyle}/>
        </label>
        <label  style={labelStyle}>
          Last Name:
          <input type="Username" value={Username} onChange={handleUsernameChange} 
          style = {inputStyle}/>
        </label>
      <label  style={labelStyle}>
          Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="Username" value={Username} onChange={handleUsernameChange} 
          style = {inputStyle}/>
        </label>
        <br />
        <label  style={labelStyle}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} 
          style = {inputStyle}/>
        </label>
        <br />
        <button type="submit" style = {buttonStyle}>Register</button>

        <p></p>
        <hr style={{ width: "165%", height: "1px", background: "gray", border: "none", margin: "1px 0" }} />
        <p style={headerStyle}>Already have an account?</p>
        <Link to="/login">
            <button style = {regbuttonStyle}>Sign in</button>
        </Link>

      </form>
      
    </div>
    </div>
  );
}

export default RegisterPage;
