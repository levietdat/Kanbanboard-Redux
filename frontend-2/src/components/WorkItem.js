import {
  Button,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDispatch } from "react-redux";
import { deleteTodo, fetchTodo } from "../redux/todosSlice";
const WorkItem = (props) => {
  const dispatch = useDispatch()
  const [idTast,setTaskId]  = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [authorUpdate,setAuthorUpdate] =React.useState()
  const [workUpdate,setWorkUpdate] =React.useState()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu = (e, _id,title,author) => {
    setAuthorUpdate(author)
    setWorkUpdate(title)
    props.setWorkId(_id)
    setTaskId(_id);
    setAnchorEl(null);
  };
  const handleUpdate =() => {
    props.setAuthor(authorUpdate)
    props.setWork(workUpdate)
    props.setIsUpdate(true)
    setAnchorEl(null);
  }
  const handleDelete = (e,_id) =>{
    dispatch(deleteTodo({
      _id:idTast
    }))
    
    setAnchorEl(null);

  }
  return props.todo.map((todo) => {
    return (
      <Box   key={todo._id}>
        <Box
          key={todo._id}
          id={todo._id}
          onMouseDown={() => props.setWorkId(todo._id)}
          draggable
          component="li"
          sx={{
            
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderRadius: 1,
            padding: "1rem",
            border: "solid 1px #000",
            marginTop: "0.5rem",
          }}
        >
          
          <Box >
            <Typography variant="caption">{todo.author}</Typography>
            <Typography variant="h3" fontSize="1rem">
              {todo.title}
            </Typography>
          </Box>
          <div>
            <DragIndicatorIcon
            onMouseDown={e =>handleMenu(e,todo._id,todo.title,todo.author)}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </DragIndicatorIcon>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleDelete}>
                Delete
              </MenuItem>
              <MenuItem onClick={handleUpdate}>Update</MenuItem>
            </Menu>
          </div>
        </Box>
      </Box>
    );
  });
};

export default WorkItem;
