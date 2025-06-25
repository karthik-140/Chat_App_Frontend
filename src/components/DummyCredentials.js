import { Box, Card, Typography } from "@mui/material";
import React from "react";

const DummyCredentials = () => {
  return (
    <Box>
      <Card className="p-4 space-y-4">
        <Typography color="peru" className="font-bold text-center text-2xl underline">
          Dummy Credentials
        </Typography>
        <Box className="grid grid-cols-2">
          <Box className="text-lg"> Email</Box> <Typography>: demo@gmail.com</Typography>
          <Box className="text-lg"> Password</Box> <Typography>: 1234</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default DummyCredentials;
