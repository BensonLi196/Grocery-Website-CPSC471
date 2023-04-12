import  React,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../../UserContext';
import AddItemInterface from "./AddItemInterface";

function ItemManagementPage() {
  const styles = {
    marginTop: '-20px'
  };

  const {manager}=useUser();

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

  const mobileRecStyle = {
    height: '90%',
    width: '95%',
    backgroundColor: '#fbc546',
    border: '1px solid orange',
    marginRight: '20px',
    borderRadius: '20px',
    textAlign: 'center',
    color: 'black',
    margin: '10px 0' 
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

  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600 ? setMobileView(true) : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', setResponsiveness);
    return () => {
      window.removeEventListener('resize', setResponsiveness);
    };
  }, []);


  const [isGPopUpVisible, setIsGPopUpVisible] = useState(false);
  const [isHPopUpVisible, setIsHPopUpVisible] = useState(false);
  const [isPPopUpVisible, setIsPPopUpVisible] = useState(false);

    
  // opens Grocery pop-up whenever the button is clicked
  const handleGClick = () => {
    setIsGPopUpVisible(true);
    setIsPPopUpVisible(false);
    setIsHPopUpVisible(false);
  };

  // opens pop-up whenever the button is clicked
  const handleHClick = () => {
    setIsHPopUpVisible(true);
    setIsGPopUpVisible(false);
    setIsPPopUpVisible(false);
  };

  // opens pop-up whenever the button is clicked
  const handlePClick = () => {
    setIsPPopUpVisible(true);
    setIsGPopUpVisible(false);
    setIsHPopUpVisible(false);
  };



  /// closes the pop up
  const handleClosePopUp = () => {
      setIsGPopUpVisible(false);
      setIsHPopUpVisible(false);
      setIsPPopUpVisible(false);
  };

  return (
  
    <div style={{ overflowX: 'hidden' }}>
      {manager ==='true'?(
        <>
      <div style={styles}>
            <br/>
            <h1 style={{textAlign: 'center', fontFamily: 'Roboto'}}>Item Management Tools</h1>
            <ul>
            </ul>
      </div>
        <br/>
        {mobileView ?(
        <div style={{containerStyle, display: 'flex', flexDirection: 'column'}} >
            <div style={mobileRecStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/09dce7b7-ea40-406b-a2c0-a3f57c420b17-1657946362.jpeg?crop=0.660xw:1.00xh;0.0794xw,0&resize=1200:*" alt="shopping list" />
                <h3>Create Grocery Item</h3>
                    <button  style = {buttonStyle}onClick={handleGClick}>Create</button>
            </div>
            <div style={mobileRecStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-510693044-1550590816.jpg" alt="shopping list" />
                <h3>Create Household Items</h3>
                    <button  style = {buttonStyle}onClick={handleHClick}>Create</button>
            </div>
            <div style={mobileRecStyle}>
                <img style={imageStyle} src="https://media.istockphoto.com/id/673531980/vector/drugs-and-medicines.jpg?s=612x612&w=0&k=20&c=RKHz0NXsfGBFktrC6q0ihybeGfoj6FR6LPeuKyFEsn4=" alt="shopping list" />
                <h3>Create Pharmacy Items</h3>
                    <button  style = {buttonStyle} onClick={handlePClick}>Create</button>
            </div>
      </div>
        ):(
      <div style={containerStyle}>
            <div style={rectangleStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/09dce7b7-ea40-406b-a2c0-a3f57c420b17-1657946362.jpeg?crop=0.660xw:1.00xh;0.0794xw,0&resize=1200:*" alt="shopping list" />
                <h3>Create Grocery Item</h3>
                    <button  style = {buttonStyle}onClick={handleGClick}>Create</button>
            </div>
            <div style={rectangleStyle}>
                <img style={imageStyle} src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-510693044-1550590816.jpg" alt="shopping list" />
                <h3>Create Household Items</h3>
                    <button  style = {buttonStyle}onClick={handleHClick}>Create</button>
            </div>
            <div style={rectangleStyle}>
                <img style={imageStyle} src="https://media.istockphoto.com/id/673531980/vector/drugs-and-medicines.jpg?s=612x612&w=0&k=20&c=RKHz0NXsfGBFktrC6q0ihybeGfoj6FR6LPeuKyFEsn4=" alt="shopping list" />
                <h3>Create Pharmacy Items</h3>
                    <button  style = {buttonStyle} onClick={handlePClick}>Create</button>
            </div>
      </div>
      )} 
      </>
      ):
      (
        <h1 style={{textAlign: 'center', fontFamily: 'Roboto'}}>401 NOT AUTHORIZED</h1>
      )
      }
      <br/>
      <br/>
      <AddItemInterface
        isGVisible={isGPopUpVisible}
        isHVisible={isHPopUpVisible}
        isPVisible={isPPopUpVisible}
        onClose={handleClosePopUp}
      />
    </div>
  );
}

export default ItemManagementPage;
