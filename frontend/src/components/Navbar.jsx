import { Stack,Button,Textfield,Menu, MenuItem, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "../UserContext";

const Navbar = () => {
  const [groceryAnchorEl, setGroceryAnchorEl] = useState(null);
  const [householdAnchorEl, setHouseholdAnchorEl] = useState(null);
  const { userId, setUserId,setManager } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserId(null);
    setManager(false);
    localStorage.removeItem("id");
    localStorage.removeItem("manager");
    window.location.href = "/";
  };
  
  const handleGroceryClick = (event) => {
    setGroceryAnchorEl(event.currentTarget);
  };

  const handleGroceryLink = (event) => {
    window.location.href = "/items/grocery";
  };

  const handleGroceryClose = () => {
    setGroceryAnchorEl(null);
  };
  
  const handleHouseholdClick = (event) => {
    setHouseholdAnchorEl(event.currentTarget);
  };

  const handleHouseholdClose = () => {
    setHouseholdAnchorEl(null);
  };


    return (
      <Stack
        display="flex"
        direction="row"
        alignItems={"center"}
        p={2}
        sx={{
          position: "sticky",
          background: "#4279e5",
          top: 0,
          justifyContent: "space-between",
          pr: 10,
          pl: 5,
          zIndex: 20,
          boxSizing: "border-box",
        }}
      >

<Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <div
        onMouseEnter={handleGroceryClick}
        onMouseLeave={handleGroceryClose}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
         
        }}
      >

         <p
          style={{
            fontFamily: "Arial",
            fontWeight: "",
            fontSize: "1.5rem",
            margin: 0,
            marginRight: "20px",
          }}
        >
         Grocery
        </p>

        <Menu
          anchorEl={groceryAnchorEl}
          open={Boolean(groceryAnchorEl)}
          onClose={handleGroceryClose}
        >
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery">Grocery</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/frozen">Frozen</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/dairy">Dairy</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/meat">Meat</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/bakery">Bakery</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/deli">Deli</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/drinks">Drinks</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/seafood">Seafood</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/breakfast">Breakfast</Link>
          </MenuItem>
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/snacks">Snacks</Link>
          </MenuItem>
        </Menu>
      </div>

      <div
        onMouseEnter={handleHouseholdClick}
        onMouseLeave={handleHouseholdClose}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          width: "150px", // add a fixed width
        }}
      >
        <p
          style={{
            fontFamily: "Arial",
            fontWeight: "",
            fontSize: "1.5rem",
            margin: 0,
            marginRight: "20px",
          }}
        >
          Household
        </p>
        <Menu
          anchorEl={householdAnchorEl}
          open={Boolean(householdAnchorEl)}
          onClose={handleHouseholdClose}
        >
          <MenuItem onClick={handleHouseholdClose}>
            <Link to="/items/household">Household</Link>
          </MenuItem>
          <MenuItem onClick={handleHouseholdClose}>
            <Link to="/items/household/pharmacy">Pharmacy</Link>
          </MenuItem>
          <MenuItem onClick={handleHouseholdClose}>
            <Link to="/items/household/baby">Baby</Link>
          </MenuItem>
          <MenuItem onClick={handleHouseholdClose}>
            <Link to="/items/household/home">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleHouseholdClose}>
            <Link to="/items/household/hygiene">Personal Hygiene</Link>
          </MenuItem>
        </Menu>
      </div>

      {/* ////////////////////////////  Search Bar/////////////////////////////////////////////*/ }
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "5px", padding: "5px 25px" }}>
  <input type="text" style={{ border: "none", backgroundColor: "transparent", marginLeft: "10px", fontSize: "1rem",  width: "650px", boxSizing: "border-box"}} placeholder="Search" />
  <SearchIcon sx={{ color: "grey", cursor: "pointer" }} />
</div>
        <Stack direction="row" alignItems={"right"}>
        {userId ? (
          <div>
            <Button onClick={handleMenuOpen}>
              <Avatar />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
   

              <MenuItem onClick={handleMenuClose}>
                <Link
                  to={`/user/`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
           <Link to="/login">
                <Button variant="contained">Sign in/Register</Button>
            </Link>
          </div>
        )}
      
        </Stack>
      </Stack>
    );
  };
  export default Navbar;