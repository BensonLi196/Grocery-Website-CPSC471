
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import OrderElement from './OrderElement';
import { getAllOrdersAPI } from '../../callAPI';

//import {  } from "../../callAPI";



  const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      getAllOrdersAPI().then((data) => setOrders(data))
    }, []);
  
    return (
      <Box display="flex" flexDirection="row" sx={{ overflowY: "auto", flex: 1,height:"90vh" }}>
        {/* Sidebar */}
        <Box 
          sx={{
            backgroundColor: "#F0F0F0",
            width: "30%",
            flexShrink: 0,
            height: "100%",
          }}
          
        >
            <Button component={Link} to="/management" sx={{ width: "100%", height: "50px" }}>Management Tools</Button>
            <Button component={Link} to="/management/items" sx={{ width: "100%", height: "50px" }}>Manage Items</Button>
            <Button component={Link} to="/management/orders/create" sx={{ width: "100%", height: "50px" }}>Create An Order</Button>
        </Box>
  
        {/* Main content */}
        <Box
          p={2}
          display="flex"
          flexDirection="row"
          sx={{ overflowY: "auto", flex: 1 }}
        >
          <Box display="flex" justifyContent="center" sx={{ overflowY: "auto", flex: 1 }}>
            <OrderElement orders={orders} />
          </Box>
        </Box>
      </Box>
    );
  };

export default OrdersPage;
