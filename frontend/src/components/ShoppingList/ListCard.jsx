import {
  Typography,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteListAPI, DeleteListItemAPI } from "../../callAPI";
import { useUser } from "../../UserContext";

const ListCard = ({ list }) => {
  let itemsArray = [];
  const {userId}= useUser();

  const handleDelete = async(itemID) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");

    if (confirmed) {
      await DeleteListItemAPI(list.listID, itemID)
      console.log(`Deleting item: ${itemID}`);
      window.location.reload()
    }
  };

  const handleDeleteList = async(itemName) => {
    const confirmed = window.confirm("Are you sure you want to delete this list?");

    if (confirmed) {
      console.log("list id:"+list.listID, userId);
      await DeleteListAPI(list.listID,userId);
      console.log("Deleting list...");
      window.location.reload()
    }
  };


  if (list.itemList != null) {
    itemsArray = list.itemList.split(";").map((item) => {
      const [itemID,itemName, price, discount, amount] = item.split(",");
      return {itemID, itemName, price, discount, amount };
    });
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        borderRadius: "4px",
        display: "inline-block",
        padding: "20px",
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" fontFamily={"Roboto"}>
        <b>List Name:</b> &nbsp;{list.listName}

        <IconButton onClick={handleDeleteList} color="error">
          <DeleteIcon />
        </IconButton>
      </Typography>

      {itemsArray.length > 0 ?(
        
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsArray.map((item) => (
              <TableRow key={item.itemID}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>${item.discount}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                      <IconButton
                        onClick={() => handleDelete(item.itemID)}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ):(
        <Typography variant="body1" fontFamily={"Roboto"}>
        No items in list.
      </Typography>
      )

    }
    </Box>
  );
};

export default ListCard;