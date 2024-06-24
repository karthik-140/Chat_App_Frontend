import { useRef, useEffect } from 'react';
import { Box, List, ListItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from 'jwt-decode'

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null)
  const listContainerRef = useRef(null)

  const getToken = () => localStorage.getItem('token')
  const decodeToken = jwtDecode(getToken())

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // const handleScroll = (e) => {
  //   if (e.currentTarget.scrollTop === 0) {
  //     alert("on top")
  //   }
  // }

  return (
    <>
      <div
        className='flex justify-center pt-10 pb-8 h-full'
        ref={listContainerRef}
      // onScroll={handleScroll}
      // style={{ overflowY: 'scroll', maxHeight: '80vh' }}
      >
        <List className='w-5/6 sm:w-3/4 md:w-1/2 flex flex-col gap-6'>
          {messages.map((row, idx) => (
            <Box key={`${row.userName}-${idx}`} className={`flex gap-2 items-center`} >
              <div className='relative'>
                <AccountCircleIcon fontSize='large' className='text-blue-400' />
                <span className='absolute left-0 -top-6 font-medium capitalize'>{`${decodeToken.userId === row.userId ? 'You' : row.userName}`}</span>
              </div>
              <ListItem
                key={idx}
                className={`md:text-xl rounded rounded-tl-2xl ${decodeToken.userId === row.userId ? 'bg-white' : 'bg-gray-300'}`}
              >
                {row.message}
              </ListItem>
            </Box>
          ))}
        </List>
      </div>
      <div ref={messagesEndRef}></div>
    </>
  )
}

export default Messages