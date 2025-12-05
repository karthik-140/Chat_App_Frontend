import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

import UsersListMenu from "./UsersListMenu";

const ChatsListMenu = ({ allGroups, setSelectedGroup }) => {
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Paper className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center px-4 py-4 border-b bg-gradient-to-br from-green-500 to-green-700 text-white">
        <Typography className="font-bold" variant="h6">
          Chats
        </Typography>
        <div className="flex gap-4 relative">
          {/* {allGroups.length === 0 && (
            <p className="absolute z-50 top-0 text-orange-800 text-lg animate-bounce">
              Create group to chat.
            </p>
          )} */}
          <Tooltip title={`${showUserList ? "" : "Create Group"}`}>
            <PeopleIcon
              className="cursor-pointer"
              onClick={() => setShowUserList((prev) => !prev)}
            />
          </Tooltip>
          <Tooltip title="Logout">
            <LogoutIcon className="cursor-pointer" onClick={handleLogout} />
          </Tooltip>

          <div className="absolute z-50 top-6 right-0">
            {showUserList && (
              <UsersListMenu setShowUserList={setShowUserList} />
            )}
          </div>
        </div>
      </div>
      <List className="overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-slate-100">
        {allGroups.map((grp) => (
          <ListItem
            key={`row-${grp.id}`}
            className="flex gap-3 items-center font-semibold text-sm md:text-lg capitalize hover:bg-slate-100 cursor-default"
            onClick={() => setSelectedGroup(grp)}
          >
            <ListItemAvatar className="rounded-full py-4 flex justify-center bg-slate-200  text-gray-500">
              <GroupIcon fontSize="medium" />
            </ListItemAvatar>
            <ListItemText>{grp.groupName}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default React.memo(ChatsListMenu);
