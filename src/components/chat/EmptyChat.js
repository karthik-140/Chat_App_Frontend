import { Box, Typography, Stack } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const EmptyChat = () => {
  return (
    <Box
      className="absolute inset-0 flex items-center justify-center"
      // sx={{ textAlign: "center" }}
    >
      <Stack
        spacing={1.5}
        alignItems="center"
        sx={{
          opacity: 0,
          transform: "translateY(6px)",
          animation: "fadeUp 0.4s ease-out forwards",
          "@keyframes fadeUp": {
            from: { opacity: 0, transform: "translateY(6px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <ChatBubbleOutlineIcon
          sx={{
            fontSize: 55,
            color: "primary.main",
            opacity: 0.85,
          }}
        />

        <Typography
          variant="h6"
          className="text-gray-600"
          sx={{ fontWeight: 600 }}
        >
          Select a chat
        </Typography>

        <Typography variant="body2" className="text-gray-400">
          Start messaging once you choose a conversation
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyChat;
