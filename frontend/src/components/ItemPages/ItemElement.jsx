import { Stack, Box, Typography } from "@mui/material";
import ItemCard from "./ItemCard";

const ItemElement = ({ items ,category,type}) => {
  console.log({category});
  return (
    <Stack direction="row" justifyContent="left" gap={2} width="75vw" sx={{flexWrap: "wrap"}}>
      
      {items
        .filter((item) => (category ? item.category === category : true))
        .map((item) => (
          <Box key={item.itemID}>
            <ItemCard item={item} type={type}/>
          </Box>
        ))}
    </Stack>
  );
};

export default ItemElement;
