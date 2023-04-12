import { Stack,Button,Textfield,Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../logo.png";
import logo_mobile from "../logo_mobile.png";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "../UserContext";

const Navbar = () => {
  const [groceryAnchorEl, setGroceryAnchorEl] = useState(null);
  const [householdAnchorEl, setHouseholdAnchorEl] = useState(null);
  const { userId, manager, setUserId,setManager } = useUser();
  const [mobileView, setMobileView] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [MobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600 ? setMobileView(true) : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', setResponsiveness);
    return () => {
      window.removeEventListener('resize', setResponsiveness);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClick = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
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

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/items/search/${search}`;
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
          pr: 5,
          pl: 5,
          zIndex: 20,
          boxSizing: "border-box",
        }}
      >


  {mobileView ? (
  <>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start",}}>
    <Link to="/" >
        <img src={logo_mobile} alt="logo_mobile" height={45} />
  </Link>
  </div>
    {/* ////////////////////////////  Search Bar/////////////////////////////////////////////*/ }
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "5px", padding: "0px 0px",marginLeft: "25px", marginRight: "25px" }}>
    <input type="text" style={{ border: "none", backgroundColor: "transparent", marginLeft: "10px", fontSize: "1rem",  width: "100%", boxSizing: "border-box"}} placeholder="Search"  onChange={(e) => setSearch(e.target.value)} />
    <IconButton onClick={handleSearch}>
        <SearchIcon sx={{ color: "grey", cursor: "pointer" }} />
    </IconButton>
    </div>
    <div style={{ display: "flex", alignItems: "center"}}  >
  <IconButton onClick={handleMobileMenuClick}>
    <MenuIcon />
  </IconButton>
  <Menu anchorEl={MobileAnchorEl} open={Boolean(MobileAnchorEl)} onClose={handleMobileMenuClose} >
    <MenuItem onClick={handleMobileMenuClose}>
      <Link to="/items/grocery">Grocery</Link>
    </MenuItem>
    <MenuItem onClick={handleMobileMenuClose}>
      <Link to="/items/household">Household</Link>
    </MenuItem>
    <MenuItem onClick={handleMobileMenuClose}>
      <Link to="/items/pharmacy">Pharmacy</Link>
    </MenuItem>
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
   
              {manager ==='true' ?(
                    <MenuItem onClick={handleMenuClose}>
                    <Link
                    to={`/management/`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Management
                  </Link>
                  </MenuItem>
                ):(
                  <MenuItem onClick={handleMenuClose}>
                  <Link
                    to={`/shopping_list`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Lists
                  </Link>
                </MenuItem>
                )
                }
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
           <MenuItem onClick={handleMobileMenuClose}>
            <Link to="/login">
                Sign in/Register
            </Link>
            </MenuItem>
          </div>
        )} 
  </Menu>
  </div>
  </div>
</>
  ):(
    <>
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
            fontFamily: "Roboto",
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
          <MenuItem onClick={handleGroceryClose}>
            <Link to="/items/grocery/produce">Produce</Link>
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
        }}
      >
        <p
          style={{
            fontFamily: "Roboto",
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
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}>
        <Link to="/items/pharmacy">
      <p
          style={{
            fontFamily: "Roboto",
            fontWeight: "",
            fontSize: "1.5rem",
            margin: 0,
            marginRight: "20px",
          }}
        >
          Pharmacy
        </p>
        </Link>
      </div>
            {/* ////////////////////////////  Search Bar/////////////////////////////////////////////*/ }
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "5px", padding: "0px 0px" }}>
  <input type="text" style={{ border: "none", backgroundColor: "transparent", marginLeft: "5px", fontSize: "1rem",  width: "75%", boxSizing: "border-box"}} placeholder="Search"  onChange={(e) => setSearch(e.target.value)} />
  <IconButton onClick={handleSearch}>
      <SearchIcon sx={{ color: "grey", cursor: "pointer" }} />
  </IconButton>

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
   
              {manager ==='true' ?(
                    <MenuItem onClick={handleMenuClose}>
                    <Link
                    to={`/management/`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Management
                  </Link>
                  </MenuItem>
                ):(
                  <MenuItem onClick={handleMenuClose}>
                  <Link
                    to={`/shopping_list`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Lists
                  </Link>
                </MenuItem>
                )
                }
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
      </>
    )}

      </Stack>
    );
  };
  export default Navbar;