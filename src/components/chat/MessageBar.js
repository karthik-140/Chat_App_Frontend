import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'
import { jwtDecode } from 'jwt-decode'

import { CustomTextField } from '../../customComponents'

export const socket = io.connect('http://localhost:3001')

const MessageBar = ({ sendMessage, groupId, setMessages }) => {

  const { control, handleSubmit, reset, watch } = useForm()
  const message = watch('message')

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
        />
      </div>
      {!!message &&
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#fff",
            fontSize: "18px",
            color: 'green',
          }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!message}
        >
          <SendIcon />
        </Button>}
    </div>
  )
}

export default React.memo(MessageBar)
