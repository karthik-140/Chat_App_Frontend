import React, { useState } from 'react'
import { Paper, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupIcon from '@mui/icons-material/Group';

import UsersListMenu from './UsersListMenu';

const ChatsListMenu = ({ allGroups, setSelectedGroup }) => {
  const [showUserList, setShowUserList] = useState(false)

  return (
    <Paper className='flex flex-col w-full h-full'>
      <div className='flex justify-between items-center px-4 py-4 border-b'>
        <Typography className='font-bold' variant='h6'>Chats</Typography>
        <div>
          <PeopleOutlineIcon className='cursor-pointer' onClick={() => setShowUserList(true)} />
          {showUserList && <UsersListMenu setShowUserList={setShowUserList} />}
        </div>
      </div>
      <List className='overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-slate-100' >
        {allGroups.map((grp) => (
          <ListItem
            key={`row-${grp.id}`}
            className='flex gap-3 items-center font-semibold text-sm md:text-lg capitalize hover:bg-slate-100 cursor-default'
            onClick={() => setSelectedGroup(grp)}
          >
            <ListItemAvatar
              className='rounded-full py-4 flex justify-center bg-slate-200  text-gray-500'
            >
              <GroupIcon fontSize='medium' />
            </ListItemAvatar>
            <ListItemText>{grp.groupName}</ListItemText>

          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default React.memo(ChatsListMenu)
