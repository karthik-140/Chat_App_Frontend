import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import { CustomTextField } from '../../customComponents'

const MessageBar = ({ sendMessage, groupId }) => {

  const { control, handleSubmit, reset, watch } = useForm()
  const message = watch('message')

  const onSubmit = async (data) => {
    try {
      await sendMessage({ message: data.message, groupId })
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

export default MessageBar
