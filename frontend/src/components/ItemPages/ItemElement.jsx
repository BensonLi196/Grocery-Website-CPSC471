import { Stack, Box, Typography } from "@mui/material";
import ItemCard from "./ItemCard";

const ItemElement = ({ items }) => {
  return (
    <Stack direction="row" justifyContent="center" gap={2} width="75vw" sx={{flexWrap: "wrap"}}>
      {items.map((item) => (
        <Box key={item.id}>
            <ItemCard  item={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default ItemElement;
