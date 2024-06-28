import React, { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, Box, Card, List, ListItem, Typography, Checkbox, IconButton, Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { format, parseISO } from 'date-fns'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { jwtDecode } from 'jwt-decode';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { useAddUsersMutation, useRemoveUserFromGroupMutation, useMakeUserIsAdminMutation, useGetGroupInfoQuery, useExistGroupMutation } from '../../api/groupApi';
import { useGetAllGroupUsersQuery } from '../../api/userApi';

const MessageTopBar = ({ selectedGroup }) => {
  const [openGroupInfo, setOpenGroupInfo] = useState(false)
  const [selected, setSelected] = useState('overview')
  const [selectedUsers, setSelectedUsers] = useState([])
  const isAdminRef = useRef()
  const cardRef = useRef(null)
  const userActionsRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const [userInfo, setUserInfo] = useState({})

  const groupId = selectedGroup?.id

  const { data: group = [] } = useGetGroupInfoQuery({ groupId })
  const { data: users = [] } = useGetAllGroupUsersQuery()
  const [addUsers] = useAddUsersMutation()
  const [removeUserFromGroup] = useRemoveUserFromGroupMutation()
  const [makeIsAdmin] = useMakeUserIsAdminMutation()
  const [exitGroup] = useExistGroupMutation()

  const decodedToken = jwtDecode(localStorage.getItem('token'))

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget)
    setUserInfo(user)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeUserFromGroupHandler = async () => {
    try {
      const userId = userInfo.userId
      await removeUserFromGroup({ groupId, userId })
      setAnchorEl(null)
    } catch (err) {
      console.log(err)
    }
  }

  const makeGroupAdminHandler = async () => {
    try {
      const userId = userInfo.userId
      await makeIsAdmin({ groupId, userId })
      setAnchorEl(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !userActionsRef.current && !cardRef.current.contains(event.target)) {
        setOpenGroupInfo(false)
        setSelectedUsers([])
      }
    }

    if (openGroupInfo) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openGroupInfo])

  const openGroupMembersHandler = () => {
    setSelected('members')
  }

  const openGroupOverviewHandler = () => {
    setSelected('overview')
    setSelectedUsers([])
  }

  const onSelectUserHandler = (user) => {
    const existingSelectedUsers = [...selectedUsers]
    const selectedUserIdx = existingSelectedUsers.findIndex((i) => i.id === user.id)
    if (selectedUserIdx === -1) {
      setSelectedUsers((prevUsers) => [...prevUsers, user])
    } else {
      existingSelectedUsers.splice(selectedUserIdx, 1)
      setSelectedUsers(existingSelectedUsers)
    }
  }

  const addUsersToGroupHandler = async () => {
    try {
      await addUsers({ groupId, selectedUsers })
    } catch (err) {
      console.log(err)
    }
  }

  const existFromGroupHandler = async () => {
    try {
      await exitGroup({ groupId })
      setOpenGroupInfo(false)
    } catch (err) {
      console.log(err)
    }
  }

  const render = (selected) => {
    switch (selected) {
      case 'overview':
        return (
          <Box className='max-h-fit flex flex-1 flex-col justify-between capitalize py-8'>
            <div className='flex flex-col items-center gap-2'>
              <Typography className='font-bold'>{selectedGroup?.groupName}</Typography>
              <Typography>Created - {format(parseISO(selectedGroup.createdAt), 'dd-MM-yyyy')}</Typography>
            </div>
            <Button onClick={existFromGroupHandler} className='self-center hover:bg-slate-200' color='error'>Exit group</Button>
          </Box>
        )
      case 'members':
        return (
          <List className='flex flex-1 flex-col capitalize'>
            {isAdminRef.current && <ListItem onClick={() => setSelected('addUsers')} className='flex gap-4 border-b hover:bg-slate-100'>
              <PersonAddAlt1OutlinedIcon />
              <Typography component='div'>Add users</Typography>
            </ListItem>}
            {group.map((user) => {
              if (decodedToken.userId === user.userId) {
                isAdminRef.current = user.isAdmin
              }
              return (
                <React.Fragment key={user.userId} >
                  <ListItem
                    id="group-users"
                    aria-controls={open ? 'user-actions-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => { isAdminRef.current && handleClick(e, user) }}
                    className='flex justify-between hover:bg-slate-100' >
                    <div className='relative flex gap-4'>
                      <PersonOutlineOutlinedIcon />
                      <Typography className='font-medium'>{user.userName}</Typography>
                    </div>
                    <Typography>{user.isAdmin ? 'Admin' : null}</Typography>
                  </ListItem>
                  <Menu
                    ref={userActionsRef}
                    id="user-actions-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'group-users',
                    }}
                  >
                    <MenuItem onClick={removeUserFromGroupHandler}>
                      <PersonRemoveOutlinedIcon />
                      <Typography >Remove from group</Typography>
                    </MenuItem>
                    <MenuItem onClick={makeGroupAdminHandler}>
                      <AdminPanelSettingsOutlinedIcon />
                      <Typography>Make group admin</Typography>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )
            })
            }
          </List>
        )
      case 'addUsers':
        return (
          <List className='flex flex-col items-center pt-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-slate-100'>
            <Button
              variant='contained'
              color='success'
              className='mb-4'
              onClick={addUsersToGroupHandler}
              disabled={selectedUsers.length === 0}
            >
              Add to group
            </Button>
            {users.filter(user =>
              !group.some(groupMember => groupMember.userId === user.id)
            ).map((user) => {
              const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id)
              const disable = group.some((isUser) => isUser.userId === user.id)
              return (
                <ListItem
                  className={`capitalize flex border-t hover:bg-slate-100 cursor-default ${!!disable && 'opacity-50'}`}
                  key={`row-${user.id}`}
                  onClick={() => onSelectUserHandler(user)}
                  secondaryAction={
                    <IconButton>
                      <Checkbox edge="end"
                        aria-label="check box"
                        disabled={!!disable}
                        checked={!!disable ? false : isSelected}
                        color='default'
                      />
                    </IconButton>
                  }
                >
                  {user.name}
                </ListItem>
              )
            })
            }
          </List >
        )
      default:
        return null
    }
  }

  return (
    <>
      <Box onClick={() => {
        setOpenGroupInfo(true)
        setSelected('overview')
      }}
        component='div'
        className='absolute flex justify-between items-center w-full z-40 bg-gray-400 px-4 md:px-8 py-3 text-white font-bold text-xl'>
        <Box className='flex flex-1 gap-4 items-center'>
          <Box className='rounded-full p-2 flex justify-center bg-slate-200  text-gray-500' >
            <GroupIcon fontSize='medium' />
          </Box>
          <span className='cursor-default'>
            {selectedGroup?.groupName}
          </span>
        </Box>
      </Box>
      {openGroupInfo &&
        <Card ref={cardRef} className='absolute z-40 flex top-16 left-0 cursor-default w-96 max-h-96'>
          <div className='bg-gray-100'>
            <Box onClick={openGroupOverviewHandler} className='flex justify-between gap-2 p-2 hover:bg-gray-200'>
              <InfoOutlinedIcon className='p-0.5' />
              <Typography className='font-semibold' >Overview</Typography>
            </Box>
            <Box onClick={openGroupMembersHandler} className='flex justify-between gap-2 p-2 hover:bg-gray-200'>
              <PeopleOutlineIcon className='p-0.5' />
              <Typography className='font-semibold' >Members</Typography>
            </Box>
          </div>
          <Box className='flex flex-1 flex-col capitalize min-h-96'>
            {render(selected)}
          </Box>
        </Card>
      }
    </>
  )
}

export default MessageTopBar
