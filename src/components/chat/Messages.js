import React, { useRef, useEffect } from 'react';
import { Box, List, ListItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from 'jwt-decode'

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(messages?.length)

  const getToken = () => localStorage.getItem('token')
  const decodeToken = jwtDecode(getToken())

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages?.length])

  function checkMessageType(message) {
    const urlPattern = /^(https?|blob):\/\/[^\s]+$/;
    const blobUrlPattern = /^blob:http:\/\/[^\s]+$/;
    const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;

    if (urlPattern.test(message) || blobUrlPattern.test(message)) {
      return (
        <img src={`${message}`} alt={`${message}`} />
      )
    } else if (base64Pattern.test(message)) {
      return (
        <img src={message} alt="Base64" />
      )
    } else {
      return message
    }
  }

  return (
    <>
      <div className='pt-4 pb-4 flex relative z-0'>
        <List className='w-full flex flex-col gap-6 mx-4'>
          {messages.map((row, idx) => (
            <Box
              key={`${row.userName}-${idx}`}
              className={`flex gap-2 items-center ${decodeToken.userId === row.userId ? 'self-end flex-row-reverse' : 'self-start'}`} >
              <div className='flex flex-col'>
                <span className='font-medium capitalize'>{`${decodeToken.userId === row.userId ? 'You' : row.userName}`}</span>
                <AccountCircleIcon fontSize='large' className='text-blue-400' />
              </div>
              <ListItem
                key={idx}
                className={`md:text-xl max-w-32 md:max-w-xs overflow-hidden self-end rounded  ${decodeToken.userId === row.userId ? 'bg-white rounded-tr-2xl' : 'bg-gray-300 rounded-tl-2xl'}`}
              >
                {checkMessageType(row.message)}
              </ListItem>
            </Box>
          ))}
        </List>
      </div>
      <div ref={messagesEndRef}></div>
    </>
  )
}

export default React.memo(Messages)
