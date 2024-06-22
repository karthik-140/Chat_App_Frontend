import { Box, List, ListItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from 'jwt-decode'

const Messages = ({ messages }) => {

  const getToken = () => localStorage.getItem('token')
  const decodeToken = jwtDecode(getToken())

  return (
    <div className='flex justify-center mt-8'>
      <List className='w-5/6 sm:w-3/4 md:w-1/2 flex flex-col gap-6'>
        {messages.map((row, idx) => (
          <Box key={`${row.userName}-${idx}`} className={`flex gap-2 items-center`} >
            <div className='relative self-end'>
              <AccountCircleIcon fontSize='large' className='text-blue-400' />
              <span className='absolute left-1 -top-5 font-medium capitalize'>{`${decodeToken.userId === row.userId ? 'You' : row.userName}`}</span>
            </div>
            <ListItem
              key={idx}
              className={`md:text-xl rounded ${decodeToken.userId === row.userId ? 'bg-white' : 'bg-gray-300'}`}
            >
              {row.message}
            </ListItem>
          </Box>
        ))}
      </List>
    </div>
  )
}

export default Messages