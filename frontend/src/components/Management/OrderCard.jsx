import {
    Typography,
    Stack,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
  } from "@mui/material";

  const OrderCard = ({ order }) => {
 
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
        <Typography variant="h5" fontFamily={"Roboto"}><b>Order ID:</b> &nbsp;{order.orderID}</Typography>
        <Typography variant="body" fontFamily={"Roboto"}><b>Manager ID:</b> &nbsp;{order.mgrID}</Typography>
        
        <Typography variant="body2" fontFamily={"Roboto"}><b>Supplier:</b>&nbsp;{order.supName}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}><b>Supplier ID:</b>&nbsp;{order.supID}</Typography>
        <Typography variant="body2" fontFamily={"Roboto"}><b>Items:</b>&nbsp;{order.itemNames}</Typography>


     
        </Box>
    );
  };
  
  export default OrderCard;
  