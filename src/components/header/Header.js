import React, { useState } from "react";
import { Box } from "@mui/material";

import DummyCredentials from "../DummyCredentials";

const Header = () => {
  const [showDummyCreds, setShowDummyCreds] = useState(false);
  return (
    <div className="bg-green-600 px-4 md:px-8 py-4 text-white font-bold flex justify-between">
      <Box className="text-xl">Chat App</Box>
      <Box
        className="cursor-pointer relative text-md hover:text-blue-700 underline transition-all duration-500 ease-in-out"
        onClick={() => setShowDummyCreds((prev) => !prev)}
      >
        Test Credentials
      </Box>
      {showDummyCreds && (
        <div className="absolute top-16 right-6 ">
          <DummyCredentials />
        </div>
      )}
    </div>
  );
};

export default Header;
