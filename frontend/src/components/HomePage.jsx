import React from 'react';
import Slideshow from './Slideshow/Slideshow';
import { Link } from "react-router-dom";

function HomePage() {
  const styles = {
    marginTop: '-20px'
  };

  const rectangleStyle = {
    height: '490px',
    width: '425px',
    backgroundColor: '#fbc546',
    border: '1px solid orange',
    marginRight: '20px',
    borderRadius: '20px',
    textAlign: 'center',
    color: 'black',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around', 
    marginTop: '70px',
    margin: '0 auto', // center the container horizontally
    width: '100%', // set a fixed width to the container
    
  };

  const imageStyle = {
    width: '100%',
    height: '80%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
    borderRadius: '20px',
  };

  const buttonStyle = {
    width: '40%',
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

  return (
    <div style={{ overflowX: 'hidden' }}>
        <div style={styles}>
            <br/>
            <Slideshow/>
            <ul>
            </ul>
        </div>
        <br/>
         <div style={containerStyle}>
            <div style={rectangleStyle}>
            <img style={imageStyle} src="https://stopfoodwaste.ie/wp-content/uploads/2017/09/shopping-list.jpg" alt="shopping list" />
                <h3>Try our convenient shopping list!</h3>
                <Link to="/shopping_list">
                    <button  style = {buttonStyle}>Go</button>
                </Link>
            </div>
            <div style={rectangleStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/09dce7b7-ea40-406b-a2c0-a3f57c420b17-1657946362.jpeg?crop=0.660xw:1.00xh;0.0794xw,0&resize=1200:*" alt="shopping list" />
                <h3>Browse our stock of Grocery items!</h3>
                <Link to="/items/grocery">
                    <button  style = {buttonStyle}>Go</button>
                </Link>
            </div>
            <div style={rectangleStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-510693044-1550590816.jpg" alt="shopping list" />
                <h3>Browse our stock of Household items!</h3>
                <Link to="/items/household">
                    <button  style = {buttonStyle}>Go</button>
                </Link>
            </div>
      </div>
      <br/>
      <br/>
    </div>
  );
}

export default HomePage;
