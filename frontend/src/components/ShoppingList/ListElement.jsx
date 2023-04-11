import { Stack, Box, Typography } from "@mui/material";
import ListCard from "./ListCard";

const ListElement = ({ lists }) => {
  return (
    <Stack direction="column" justifyContent="center" gap={2} width="75vw">
      {lists.map((list) => (
        <Box key={list.listID}>
            <ListCard  list={list} />
        </Box>
      ))}
    </Stack>
  );
};

export default ListElement;
