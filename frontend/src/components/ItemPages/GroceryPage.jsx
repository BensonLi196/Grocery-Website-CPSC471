
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import ItemElement from './ItemElement';

//import {  } from "../../callAPI";

const items = [
    {
      id: '#F5A623',
      amount:2,
      name: 'Almond Chocolate',
      price:2.25,
      allergies: 'Dairy, Cocoa, Almonds'
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'French Bread',
      price: 6.23,
      allergies: 'Gluten, Wheat',
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'Apples',
      price: 5.99,
      allergies: 'Apples',
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'Eggs',
      price: 7.99,
      allergies: 'eggs',
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'Milk',
      price: 5.99,
      allergies: 'dairy',
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'Cheese',
      price: 5.99,
      allergies: 'dairy',
    }
    ,
    {
      id: '#4A90E2',
      amount:2,
      name: 'Chips',
      price: 2.99,
      allergies: '',
    },
    {
      id: '#4A90E2',
      amount:2,
      name: 'Cookies',
      price: 2.99,
      allergies: '',
    },
    {
        id: '#F5A623',
        amount:2,
        name: 'Almond Chocolate',
        price:2.25,
        allergies: 'Dairy, Cocoa, Almonds'
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'French Bread',
        price: 6.23,
        allergies: 'Gluten, Wheat',
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'Apples',
        price: 5.99,
        allergies: 'Apples',
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'Eggs',
        price: 7.99,
        allergies: 'eggs',
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'Milk',
        price: 5.99,
        allergies: 'dairy',
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'Cheese',
        price: 5.99,
        allergies: 'dairy',
      }
      ,
      {
        id: '#4A90E2',
        amount:2,
        name: 'Chips',
        price: 2.99,
        allergies: '',
      },
      {
        id: '#4A90E2',
        amount:2,
        name: 'Cookies',
        price: 2.99,
        allergies: '',
      }
  ];


  const GroceryPage = () => {
    // const [items, setItems] = useState([]);
    const { category } = useParams();
    useEffect(() => {
      // fetchFromAPI(`api/post`).then((data) => setSortedPosts(data))
    }, []);
  
    return (
      <Box display="flex" flexDirection="row" sx={{ overflowY: "auto", flex: 1,height:"90vh" }}>
        {/* Sidebar */}
        <Box 
          sx={{
            backgroundColor: "#F0F0F0",
            width: "20%",
            flexShrink: 0,
            height: "100%",
          }}
          
        >
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Frozen</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Dairy</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Meat</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Bakery</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Deli</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Drinks</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Seafood</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Breakfast</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Snacks</Button>
          {/* Sidebar content goes here */}
        </Box>
  
        {/* Main content */}
        <Box
          p={2}
          display="flex"
          flexDirection="row"
          sx={{ overflowY: "auto", flex: 1 }}
        >
          <Box display="flex" justifyContent="center" sx={{ overflowY: "auto", flex: 1 }}>
            <ItemElement items={items} />
          </Box>
        </Box>
      </Box>
    );
  };

export default GroceryPage;
