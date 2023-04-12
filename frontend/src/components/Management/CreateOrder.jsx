import React from "react";
import { useState } from "react";
import { Box, Stack, styled, Button, Typography } from "@mui/material";
import { WithContext as ReactTags } from "react-tag-input";
import { useUser } from "../../UserContext";
import { MakeOrderAPI } from "../../callAPI";
import { Link,useParams } from "react-router-dom";

const TitleInput = styled("textarea")`
  width: 10vw;
  height: 20px;
  padding: 10px;
  border: 1px solid #b7b9f7;
  border-radius: 1px;
  resize: none;
`;

const buttonStyle = {
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  color: "#6b6c7f",
  padding: "6px 18px",
  border: "2px solid",
  borderRadius: 0,
  lineHeight: 1.5,
  marginLeft: 40,
  backgroundColor: "#D7D8FF",
  borderColor: "#D7D8FF",
  "&:hover": {
    backgroundColor: "#b7b9f7",
    borderColor: "#b7b9f7",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#b7b9f7",
    borderColor: "#b7b9f7",
  },
};

const CreateOrder = () => {
  const { user } = useUser();
  const {manager,userId} = useUser();
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput]= useState("");
  const [itemRemove, setItemRemove]= useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");


  //remove item from item array
  const handleDelete = (i) => {
    setItems(items.filter((item, index) => item !== itemRemove));
  };

  //Adds a new tag to tag array
  const handleAddition = (item) => {
    if (itemInput<0){
        alert("item id cannot be negative");
    }
    else if (!items.includes(itemInput)){
        setItems([...items, itemInput]);
    }
    else{
        alert("item id already exists");
    }
    setItemInput("");
  };

//handles the user entering item
  const handleItemChange = (event) => {
    setItemInput(event.target.value);
  };

  //handles the user entering item
  const handleItemRemoveChange = (event) => {
    setItemRemove(event.target.value);
  };


  //functionality on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (supplier.trim() === "" || items.length==0){
      alert("There are no items or the supplier is empty, cannot make order.")
      return;
    }

    //add data inputted into form to a FormData object
    let data = new FormData();
    //Add all items to an array
    for (let i = 0; i < items.length; i++) {
      data.append("items", items[i].text);
    }

    //submit api request
    const res = MakeOrderAPI(userId,supplier,items);

    setSupplier("");
    setItems([]);
    // window.location.href = window.location.href;
  };

  return (
    <div>
      
      <Box display="flex" flexDirection="row" sx={{ overflowY: "auto", flex: 1,height:"90vh" }}>
      <Box 
          sx={{
            backgroundColor: "#F0F0F0",
            width: "20%",
            flexShrink: 0,
            height: "100%",
          }}
          
        >
            <Button component={Link} to="/management" sx={{ width: "100%", height: "50px" }}>Management Tools</Button>
            <Button component={Link} to="/items" sx={{ width: "100%", height: "50px" }}>Manage Items</Button>
            <Button component={Link} to="/management/orders/" sx={{ width: "100%", height: "50px" }}>View Orders</Button>
        </Box>
      <Box
        width="100wh"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        ml={35}
      >
          <h1><b>Create Order</b></h1>
        <Box
          mb={40}
          pb={5}
          sx={{
            backgroundColor: "#4279e5", 
            borderRadius: 1,
            border: "none",
            textAlign: 'center'
          }}
        >
        <Typography><b>Supplier:</b></Typography>
          <form onSubmit={handleSubmit}>
            {/* Supplier Input */}
            <Box pt={4} pr={4} pl={4} pb={2}>
              <TitleInput
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Supplier Id"
              />
            </Box>
          <Box >
            <Typography><b>Item ids:</b></Typography>
          </Box >
            {/* Inputs */}
            <Box  pb={10} >
              <Box  p={2} pl={25} pr={25} sx={{overflowY: "auto"}} >
              {items.map((item) => (
                    <Box key={item}>
                        <Typography>{item}</Typography>
                    </Box>
                ))}

                <input type="number" placeholder="item id" value={itemInput} onChange={handleItemChange} min="0" oninput="validity.valid||(value='');">
                </input>

                
              </Box>
              <Box  display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexDirection="column">
              <Button onClick={handleAddition} style={buttonStyle}>
                  Add item
                </Button>
      
                </Box>
            </Box>
            <Box display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexDirection="column">
            <input type="number" placeholder="item id" value={itemRemove} onChange={handleItemRemoveChange} min="0" oninput="validity.valid||(value='');">
                </input>
                <Button onClick={handleDelete} style={buttonStyle}>
                  Remove Item
                </Button>
            </Box>
            <Box pt={5}>
            <Button type="submit" style={buttonStyle}>
                  Submit Order
                </Button>
            </Box>
          </form>
        </Box>
                {/* Sidebar */}
      
      </Box>
      </Box>
    </div>
  );
};

export default CreateOrder;
