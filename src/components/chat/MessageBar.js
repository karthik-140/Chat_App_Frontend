import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Card, InputAdornment, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import io from 'socket.io-client'
import { jwtDecode } from "jwt-decode";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningIcon from "@mui/icons-material/Warning";

import { useUploadImageMutation } from "../../api/messageApi";
import { Toast } from "../../customComponents";
import { CustomTextField } from "../../customComponents";
import { socket } from "../../services/Socket";

// export const socket = io.connect('https://chat-app-backend-nu-five.vercel.app/')
// export const socket = io.connect('http://localhost:3001')

const MessageBar = ({ sendMessage, groupId, setMessages }) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [image, setImage] = useState(null);

  const [uploadImage, { isError }] = useUploadImageMutation();
  const { control, handleSubmit, reset, watch } = useForm();
  const message = watch("message");

  useEffect(() => {
    if (message) {
      setUploadedFile(null);
    }
  }, [message]);

  const getToken = () => localStorage.getItem("token");
  const decodeToken = jwtDecode(getToken());

  const onSubmit = async (data) => {
    try {
      const message = data.message;
      const userGroupInfo = {
        userId: decodeToken.userId,
        userName: decodeToken.name,
        groupId,
      };
      await sendMessage({ message, groupId });
      socket.emit("send-message", message, userGroupInfo);
      setMessages((prev) => [...prev, { ...userGroupInfo, message }]);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadFile = async () => {
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }

    // const response = await fetch(`http://localhost:3001/messages/uploadFile?groupId=${groupId}`, {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Authorization': getToken() }
    // });
    // console.log(await response.json())
    await uploadImage({ groupId, formData });
    setImage(null);
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (!!file) {
      const previewFile = URL.createObjectURL(file);
      setImage(previewFile);
      setUploadedFile(file);
    }
  };

  return (
    <div className="flex gap-1 sticky bottom-0 w-full">
      <div className="flex-1">
        <CustomTextField
          name="message"
          placeholder="Type a message"
          control={control}
          className="w-full bg-white"
          style={{ borderRadius: 35 }}
          sx={{ "& fieldset": { border: "none" } }}
          InputProps={{
            startAdornment: (
              <>
                <input
                  style={{
                    display: "none",
                  }}
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => uploadFileHandler(e)}
                />
                <label htmlFor="file">
                  <InputAdornment className="cursor-pointer" position="start">
                    <AddToPhotosIcon />
                  </InputAdornment>
                </label>
              </>
            ),
          }}
        />
      </div>
      {/* {(!!message || !!uploadedFile) && ( */}
      <Button
        style={{
          borderRadius: 35,
          backgroundColor: "#fff",
          fontSize: "18px",
          // color: "green",
        }}
        className={`${message ? "text-green-700 hover:text-green-600" : ""}`}
        variant="contained"
        onClick={uploadedFile ? onUploadFile : handleSubmit(onSubmit)}
        disabled={!message}
      >
        <SendIcon />
      </Button>
      {/* )} */}
      {image && (
        <div className="absolute w-80 bottom-14 object-fit">
          <div className="flex">
            <WarningIcon color="error" />
            <Typography color={"error"} className="w-full">
              {" "}
              This feature is not available for now!!
            </Typography>
          </div>
          <Card>
            <Box
              className="float-end cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => setImage(null)}
            >
              <CancelOutlinedIcon />
            </Box>
            <img
              className="p-1"
              width={"100%"}
              height={"100%"}
              src={`${image}`}
              alt={`${image}`}
            />
          </Card>
        </div>
      )}
      {
        isError && (
          <Toast
            message={"This feature is not available for now!!"}
            severity={"error"}
          />
        )
        // <p className='absolute bottom-full animate-bounce'>This feature is not available for now!!</p>
      }
    </div>
  );
};

export default React.memo(MessageBar);
