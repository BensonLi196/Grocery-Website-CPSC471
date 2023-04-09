import {
    Typography,
    Stack,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
  } from "@mui/material";

  const ItemCard = ({ item }) => {
 
    return (
        <Box
        sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "4px",
            display: "inline-block",
            padding: "100px 20px",
            marginRight: "8px",
            width: "200px", 
            height: "80px", 
        }}
        >
        <Typography variant="h5" fontFamily={"Roboto"}>{item.name}</Typography>
        <Typography variant="h6" fontFamily={"Roboto"}>${item.price}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}>Number in stock: {item.amount}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}>Allergies: {item.allergies}</Typography>
        <Button>Add to list</Button>
     
        </Box>
    );
  };
  
  export default ItemCard;
  