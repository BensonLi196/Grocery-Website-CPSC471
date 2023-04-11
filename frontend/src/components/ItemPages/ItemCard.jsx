import {
    Typography,
    Stack,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
  } from "@mui/material";
import { useUser } from "../../UserContext";
import  React,{ useState, useEffect } from 'react';
import UpdateItem from "./UpdateItem";
import AddToListInterface from "./AddToListInterface";

  const ItemCard = ({ item, type }) => {
    const {userId,manager}= useUser();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isPopUpListVisible, setIsPopUpListVisible] = useState(false);

    
    // opens pop-up whenever the button is clicked
    const handleUpdateClick = () => {
      setIsPopUpVisible(true);
    };

    // opens pop-up whenever the button is clicked
    const handleAddClick = () => {
      setIsPopUpListVisible(true);
    };

    /// closes the pop up
    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
        setIsPopUpListVisible(false);
    };
 
    return (
        <Box
        sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "4px",
            display: "inline-block",
            padding: "100px 20px",
            marginRight: "8px",
            width: "200px", 
            height: "170px", 
        }}
        >
        <Typography variant="h5" fontFamily={"Roboto"}>{item.itemName}</Typography>
        <Typography variant="h6" fontFamily={"Roboto"}>${item.price}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}>Discount: ${item.discount}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}>Aisle: {item.aisle}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}>Number in stock: {item.amount}</Typography>

        {type==="grocery"?(
          <>
          <Typography variant="body2" fontFamily={"Roboto"}>Category: {item.category}</Typography>
          <Typography variant="body2" fontFamily={"Roboto"}>Expiry: {item.expiryDate}</Typography>
          <Typography variant="body2" fontFamily={"Roboto"}>Allergies: {item.allergies}</Typography>
          </>
        ): type==="household"?(
          <>
          <Typography variant="body2" fontFamily={"Roboto"}>Category: {item.category}</Typography>
          </>
        ): type==="pharmacy"?(
          <>
          <Typography variant="body2" fontFamily={"Roboto"}>Generic Name: {item.genName}</Typography>
          <Typography variant="body2" fontFamily={"Roboto"}>Brand Name: {item.brandName}</Typography>
          </>
        ):(
          null
        )
        }
       

        {manager === 'true'?(
          <Button onClick={handleUpdateClick}>Edit item</Button>
        ):(
          <Button onClick={handleAddClick}>Add to list</Button>
        )
        }
       <UpdateItem
        isVisible={isPopUpVisible}
        onClose={handleClosePopUp}
        itemName={item.itemName}
        price={item.price}
        discount={item.discount}
        aisle={item.aisle}
        amount={item.amount}
        supplier={item.supplier}
        itemID={item.itemID}
      />

      <AddToListInterface
        isVisible={isPopUpListVisible}
        onClose={handleClosePopUp}
        itemID={item.itemID}
      />
        </Box>
    );
  };
  
  export default ItemCard;
  