import {
  Typography,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import  React,{ useState, useEffect } from 'react';
import "./../ShoppingList/PopUp.css";
import { useUser } from "../../UserContext";
import {  UpdateItemAPI, DeleteItemAPI, getAllListsAPI, AddItemToListAPI } from "../../callAPI";

const AddToListInterface= ({
  isVisible,
  onClose,
  itemID
}) => {
  const [Iamount, setIAmount] = useState("");
  const [lists,setLists]= useState([]);

  const {userId}= useUser();

  useEffect(() => {
    if (userId) {
        getAllListsAPI(userId).then((data)=> setLists(data));
    }
  }, []);


  if (!isVisible) {
    return null;
  }




  // handles the confirmation of updating the item
  const handleListClick = async (e,listID) => {
    e.preventDefault();

    if (
       Iamount === "" 
    ) {
      alert('Amount cannot be null');
    } else {
      try {
        const response = await AddItemToListAPI(listID,itemID,Iamount);
        alert('Item added to list!');
      } catch (error) {
        console.error(error);
      }
    }
  };

  //// hides the pop-up
  const handleCloseClick = () => {
    onClose(); // hide the pop-up
  };

  return (
    <div className="popup">
      <div className="inside-pop">
        <div className={`Edit-Profile-Pop-Up ${isVisible ? "visible" : ""}`}>
          <h2>Add Item to Shopping List</h2>
          <form>
       

          
            <label >
              <b>Amount:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="number"
              min = '1'
              value={Iamount}
              onChange={(e) => setIAmount(e.target.value)}
            />

            <br />
            <label >
              <b>Lists:</b>
            </label>
            {lists.map((list) => (
              <Box key={list.listID}>
                <Button className="change-btn"  onClick={(e) => handleListClick(e, list.listID)} style={{ border: "1px solid black", width: "100%" }}>
                    <b>{list.listName}</b>
                </Button>
              </Box>
            ))}
   
 
            <br />
          </form>
        </div>
        <button className="close-btn" onClick={handleCloseClick}>
          <b>X</b>
        </button>
      </div>
    </div>
  );
};

export default AddToListInterface;
