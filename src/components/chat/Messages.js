import { List, ListItem } from '@mui/material'

const messages = ['hii', 'hlo', 'how are you?', 'good!!', 'nice', 'Thanks']

const Messages = () => {
  return (
    <div className='flex justify-center mt-8'>
      <List className='w-3/4 flex flex-col gap-2'>
        {messages.map((msg, idx) => (
          <ListItem
            key={idx}
            className='odd:bg-white even:bg-gray-300 shadow md:text-xl rounded'
          >
            {msg}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Messages