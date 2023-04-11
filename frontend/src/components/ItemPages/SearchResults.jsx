
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import ItemElement from './ItemElement';
import { getSearchItemsAPI } from '../../callAPI';


  const SearchResults = () => {
    const [items, setItems] = useState([]);
    const { search,category } = useParams();
    useEffect(() => {
     getSearchItemsAPI(search.trim()).then((data) =>setItems(data));
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
            <Button component={Link} to='/items/grocery' sx={{ width: "100%", height: "50px" }}>Grocery</Button>
            <Button component={Link} to="/items/household" sx={{ width: "100%", height: "50px" }}>Household</Button>
            <Button component={Link} to="/items/pharmacy" sx={{ width: "100%", height: "50px" }}>Pharmacy</Button>

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
            <ItemElement items={items} category={category} type={search} />
          </Box>
        </Box>
      </Box>
    );
  };

export default SearchResults;
