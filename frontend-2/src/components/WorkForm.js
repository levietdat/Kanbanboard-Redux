import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { updateTodo } from "../redux/todosSlice";
import { addTodo } from "../redux/todosSlice";
const WorkForm = (props) => {
  const dispatch = useDispatch();
  const handleChangeAuthor = (e) => {
    props.setAuthor(e.target.value);
  };
  const handleUpdate = () => {
    dispatch(updateTodo({
      _id: props.workId,
      author:props.author,
      title:props.work,
    }))
    props.setWork('')
    props.setAuthor('')
    props.setIsUpdate(false)

  }
  const handleChangeWork = (e) => {
    props.setWork(e.target.value);
  };
  const handleAddTask = (e) => {
    if(props.author === "" || props.work === "") {
     props.setAlert(true)
     setTimeout(() => {
      props.setAlert(false)
     }, 2000);
    } 
    else {
      props.setAlert(false)
      dispatch(
        addTodo({
          author: props.author,
          title: props.work,
          status: "todo",
        })
      );
      props.setWork("");
      props.setAuthor("");
    }
  };
  return (
    <Container>
      <Box
        children={
          <Typography fontWeight="bold" variant="h4">
            KanBan Board
          </Typography>
        }
      ></Box>
      <Box>
        <TextField
          onChange={handleChangeAuthor}
          value={props.author}
          id="outlined-basic"
          label="Author Name"
          size="small"
          variant="outlined"
        />
        <TextField
          onChange={handleChangeWork}
          value={props.work}
          id="outlined-basic"
          label="Task Work"
          size="small"
          variant="outlined"
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        <Button
          sx={{
            paddingBottom: 1,
            paddingTop: 1,
            display: `${props.isUpdate ? "none" : ""}`,
          }}
          size="small"
          variant="outlined"
          onClick={handleAddTask}
        >
          ADD TASK
        </Button>
        <Button
          sx={{
            paddingBottom: 1,
            paddingTop: 1,
            display: `${props.isUpdate ? "" : "none"}`,
          }}
          size="small"
          variant="outlined"
          onClick={handleUpdate}
        >
          UPDATE
        </Button>
      </Box>
    </Container>
  );
};

export default WorkForm;
