
import  React,{ useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { Link,useParams } from "react-router-dom";
import ListElement from './ListElement';
import CreateList from './CreateList';
import { getAllListsAPI } from '../../callAPI';
import { useUser } from '../../UserContext';

//import {  } from "../../callAPI";

  const ShoppingListPage = () => {
    const [lists, setLists] = useState([]);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const { category } = useParams();
    const {userId}= useUser();

    useEffect(() => {
        if (userId) {
            getAllListsAPI(userId).then((data)=> setLists(data));
        }
    }, [userId]);
    useEffect(() => {
        if (userId) {
            getAllListsAPI(userId).then((data)=> setLists(data));
        }
    }, []);


    // opens pop-up whenever the button is clicked
    const handleCreateClick = () => {
        setIsPopUpVisible(true);
    };

    /// closes the pop up
    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
    };
  
    return (
        <Box display="flex" flexDirection="column" sx={{ overflowY: "auto", flex: 1, position: "relative" }}>
        {/* Main content */}
        <Box
          p={2}
          display="flex"
          flexDirection="row"
          sx={{ overflowY: "auto", flex: 1 }}
        >
          <Box display="flex" justifyContent="center" sx={{ overflowY: "auto", flex: 1 }}>
            <ListElement lists={lists} />
          </Box>
        </Box>
        {/* Create List button */}
        <Button
        component={Link}
        variant="contained"
        sx={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
        }} 
        onClick={handleCreateClick}
        >
        Create List
        </Button>
        <CreateList
        isVisible={isPopUpVisible}
        onClose={handleClosePopUp}
      />
      </Box>
      
    );
  };

export default ShoppingListPage;
