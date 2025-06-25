import { Box, Card, Typography } from "@mui/material";

const dummyCreds = [
  {
    email: "demo@gmail.com",
    password: "1234",
  },
  {
    email: "karthik@gmail.com",
    password: "1234",
  },
];

const DummyCredentials = () => {
  return (
    <Box className="relative z-30">
      <Card className="p-4 space-y-4">
        {dummyCreds.map((item, idx) => (
          <div key={`dummy-creds-${idx}`}>
            <Typography variant="body2" color={"peru"} fontWeight={700}>
              Credentials-{idx + 1}:
            </Typography>
            <hr />
            <Box className="grid grid-cols-2 mt-2">
              <Box className="text-md"> Email</Box>{" "}
              <Typography>: {item.email}</Typography>
              <Box className="text-md"> Password</Box>{" "}
              <Typography>: {item.password}</Typography>
            </Box>
          </div>
        ))}
        {/* <hr/> */}
      </Card>
    </Box>
  );
};

export default DummyCredentials;
