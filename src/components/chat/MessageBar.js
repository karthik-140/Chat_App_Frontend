import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'
import { jwtDecode } from 'jwt-decode'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import { CustomTextField } from '../../customComponents'

export const socket = io.connect('http://localhost:3001')

const MessageBar = ({ sendMessage, groupId, setMessages }) => {
  const [uploadedFile, setUploadedFile] = useState()

  const { control, handleSubmit, reset, watch } = useForm()
  const message = watch('message')

  useEffect(() => {
    if (message) {
      setUploadedFile(null)
    }
  }, [message])

  const getToken = () => localStorage.getItem('token')
  const decodeToken = jwtDecode(getToken())

  const onSubmit = async (data) => {
    try {
      const message = data.message
      const userGroupInfo = { userId: decodeToken.userId, userName: decodeToken.name, groupId }
      await sendMessage({ message, groupId })
      socket.emit('send-message', message, userGroupInfo)
      setMessages((prev) => [...prev, { ...userGroupInfo, message }])
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  const onUploadFile = async () => {
    const formData = new FormData()

    if (uploadedFile) {
      formData.append('file', uploadedFile);
    }

    const response = await fetch(`http://localhost:3001/messages/uploadFile?groupId=${groupId}`, {
      method: 'POST',
      body: formData,
      headers: { 'Authorization': getToken() }
    });

    console.log(response)
  }

  const uploadFileHandler = (e) => {
    // console.log(e.target.files[0], e.target.value)
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setUploadedFile(file)
    }
  }

  return (
    <div className='flex gap-1 sticky bottom-0 w-full'>
      <div className='flex-1'>
        <CustomTextField
          name='message'
          placeholder='Type a message'
          control={control}
          className='w-full bg-white'
          style={{ borderRadius: 35 }}
          sx={{ "& fieldset": { border: 'none' } }}
          InputProps={{
            startAdornment: (
              <>
                <input
                  style={{
                    display: 'none'
                  }}
                  type='file'
                  id='file'
                  accept='image/*'
                  onChange={(e) => uploadFileHandler(e)}
                />
                <label htmlFor='file'>
                  <InputAdornment className='cursor-pointer' position='start'>
                    <AddToPhotosIcon />
                  </InputAdornment>
                </label>
              </>
            )
          }}
        />
      </div>
      {/* {(!!message || uploadedFile) && */}
      <Button
        style={{
          borderRadius: 35,
          backgroundColor: "#fff",
          fontSize: "18px",
          color: 'green',
        }}
        variant="contained"
        onClick={uploadedFile ? onUploadFile : handleSubmit(onSubmit)}
      // disabled={!message}
      >
        <SendIcon />
      </Button>
      {/* } */}
    </div>
  )
}

export default React.memo(MessageBar)
