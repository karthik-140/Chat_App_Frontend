import { useRef, useState } from 'react'
import { List, ListItem, Card, Typography, Checkbox, InputBase, Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { useCreateGroupMutation } from '../../api/groupApi';
import { useGetAllGroupUsersQuery } from '../../api/userApi';

const UsersListMenu = ({ setShowUserList }) => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [step, setStep] = useState(1)
  const groupNameRef = useRef()

  const [createGroup] = useCreateGroupMutation()
  const { data: users = [] } = useGetAllGroupUsersQuery()

  const onClickHandler = (user) => {
    const existingSelectedUsers = [...selectedUsers]
    const selectedUserIdx = existingSelectedUsers.findIndex((i) => i.id === user.id)
    if (selectedUserIdx === -1) {
      setSelectedUsers((prevUsers) => [...prevUsers, user])
    } else {
      existingSelectedUsers.splice(selectedUserIdx, 1)
      setSelectedUsers(existingSelectedUsers)
    }
  }

  const handleNextHandler = () => {
    setStep(2)
  }

  const onBackClickHandler = () => {
    if (step === 1) {
      setShowUserList(false)
    } else {
      setStep(1)
    }
  }

  const createGroupHandler = async () => {
    try {
      const groupName = groupNameRef.current.value
      await createGroup({ groupName, selectedUsers })
      setShowUserList(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card className='absolute z-50 right-6 md:left-56 w-1/3 md:w-1/6'>
      <div className='flex flex-col gap-2 px-2 mt-2'>
        <div className='flex items-center gap-2'>
          <KeyboardBackspaceIcon onClick={onBackClickHandler} className='text-gray-600 hover:bg-slate-200' />
          <Typography variant='h6' >New group</Typography>
        </div>
        {(step === 1) &&
          <Button disabled={selectedUsers.length === 0} className='self-start' onClick={handleNextHandler} variant='contained' color='success' size='small' >Next</Button>}
      </div>
      {step === 1 &&
        <List className='overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-slate-100'>
          {users.map((user) => {
            const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id)
            return (
              <ListItem
                className='capitalize flex border-t hover:bg-slate-100 cursor-default'
                key={`row-${user.id}`}
                onClick={() => onClickHandler(user)}
                secondaryAction={
                  <Checkbox edge="end" aria-label="check box" checked={isSelected} color='default' />
                }
              >
                {user.name}
              </ListItem>
            )
          })}
        </List>}
      {step === 2 &&
        <div className='flex flex-col gap-8 px-4 mt-6 mb-4'>
          <InputBase
            inputRef={groupNameRef}
            placeholder='Enter Group Name'
            required={true}
            autoFocus
          />
          <Button
            onClick={createGroupHandler}
            variant='contained'
            color='success'
            size='small'
          >
            Create
          </Button>
        </div>}
    </Card>
  )
}

export default UsersListMenu