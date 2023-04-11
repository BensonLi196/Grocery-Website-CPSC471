import { Stack, Box, Typography } from "@mui/material";
import OrderCard from "./OrderCard";

const OrderElement = ({ orders }) => {
  return (
    <Stack direction="row" justifyContent="left" gap={2} width="75vw" sx={{flexWrap: "wrap"}}>
      {orders.map((order) => (
        <Box key={order.orderID}>
            <OrderCard  order={order} />
        </Box>
      ))}
    </Stack>
  );
};

export default OrderElement;
