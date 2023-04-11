
import  React,{ useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import ItemElement from './ItemElement';
import { getAllPharmacyItemsAPI } from '../../callAPI';

  const PharmacyPage = () => {
    const [items, setItems] = useState([]);
    const { category } = useParams();
    useEffect(() => {
      // fetchFromAPI(`api/post`).then((data) => setSortedPosts(data))
      getAllPharmacyItemsAPI().then((data) =>setItems(data));
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
            <Button component={Link} to="/items/pharmacy" sx={{ width: "100%", height: "50px" }}>All</Button>

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
            <ItemElement items={items} type="pharmacy" />
          </Box>
        </Box>
      </Box>
    );
  };

export default PharmacyPage;
