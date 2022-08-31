import {
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React,{ useContext } from "react";
import { DragHandle } from '@mui/icons-material'
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/todosSlice";
import {StateContext} from '../Context'
import { style } from "../styles/index";
const WorkItem = (props) => {
  const context = useContext(StateContext)
  const dispatch = useDispatch()
  const open = Boolean(context.anchorEl);
  const handleClick = (event) => {
    context.setAnchorEl(event.currentTarget);
  };
  const handleMenu = (e, _id,title,author) => {
    context.setAuthorUpdate(author)
    context.setWorkUpdate(title)
    context.setWorkId(_id)
    context.setTaskId(_id);
    context.setAnchorEl(null);
  };
  const handleUpdate =() => {
    context.setAuthor(context.authorUpdate)
    context.setWork(context.workUpdate)
    context.setIsUpdate(true)
    context.setAnchorEl(null);
  }
  const handleDelete = (e,_id) =>{
    dispatch(deleteTodo({
      _id:context.idTask
    }))
    context.setAnchorEl(null);
  }
  return props.todo.map((todo,index) => {
    return (
        <Box
         key={index}
          id={todo._id}
          onMouseDown={() => context.setWorkId(todo._id)}
          draggable
          component="li"
          sx={style.taskItem}
        >
          <Box >
            <Typography variant="caption">{todo.author}</Typography>
            <Typography variant="h3" fontSize="1rem">
              {todo.title}
            </Typography>
          </Box>
          <div>
            <DragHandle
            onMouseDown={e =>handleMenu(e,todo._id,todo.title,todo.author)}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </DragHandle>
            <Menu
              id="basic-menu"
              anchorEl={context.anchorEl}
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
    );
  });
};

export default WorkItem;
