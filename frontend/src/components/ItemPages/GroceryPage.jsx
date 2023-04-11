
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import ItemElement from './ItemElement';
import { getAllGroceryItemsAPI } from '../../callAPI';

  const GroceryPage = () => {
    const [items, setItems] = useState([]);
    const { category } = useParams();
    useEffect(() => {
      // fetchFromAPI(`api/post`).then((data) => setSortedPosts(data))
      getAllGroceryItemsAPI().then((data) =>setItems(data));
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
            <Button component={Link} to="/items/grocery" sx={{ width: "100%", height: "50px" }}>All</Button>
            <Button component={Link} to="/items/grocery/frozen" sx={{ width: "100%", height: "50px" }}>Frozen</Button>
            <Button component={Link} to="/items/grocery/dairy" sx={{ width: "100%", height: "50px" }}>Dairy</Button>
            <Button component={Link} to="/items/grocery/meat" sx={{ width: "100%", height: "50px" }}>Meat</Button>
            <Button component={Link} to="/items/grocery/bakery" sx={{ width: "100%", height: "50px" }}>Bakery</Button>
            <Button component={Link} to="/items/grocery/deli" sx={{ width: "100%", height: "50px" }}>Deli</Button>
            <Button component={Link} to="/items/grocery/drinks" sx={{ width: "100%", height: "50px" }}>Drinks</Button>
            <Button component={Link} to="/items/grocery/seafood" sx={{ width: "100%", height: "50px" }}>Seafood</Button>
            <Button component={Link} to="/items/grocery/breakfast" sx={{ width: "100%", height: "50px" }}>Breakfast</Button>
            <Button component={Link} to="/items/grocery/snacks" sx={{ width: "100%", height: "50px" }}>Snacks</Button>
            <Button component={Link} to="/items/grocery/produce" sx={{ width: "100%", height: "50px" }}>Produce</Button>
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
            <ItemElement items={items} category={category} type="grocery" />
          </Box>
        </Box>
      </Box>
    );
  };

export default GroceryPage;
