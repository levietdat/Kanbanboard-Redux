import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/todosSlice";
import { addTodo } from "../redux/todosSlice";
import { StateContext } from "../Context";

const WorkForm = (props) => {
  const context = useContext(StateContext);
  const dispatch = useDispatch();
  const handleChangeAuthor = (e) => {
    context.setAuthor(e.target.value);
  };
  const handleUpdate = () => {
    if (context.work === "" || context.author === "") {
      context.setAlert(true);
    } else {
      dispatch(
        updateTodo({
          _id: context.workId,
          author: context.author,
          title: context.work,
        })
      );
      context.setAlert(false);
      context.setWork("");
      context.setAuthor("");
      context.setIsUpdate(false);
    }
  };

  const handleChangeWork = (e) => {
    context.setWork(e.target.value);
  };
  const handleAddTask = (e) => {
    if (context.author === "" || context.work === "") {
      context.setAlert(true);
      setTimeout(() => {
        context.setAlert(false);
      }, 2000);
    } else {
      context.setAlert(false);
      dispatch(
        addTodo({
          author: context.author,
          title: context.work,
          status: "todo",
        })
      );
      context.setWork("");
      context.setAuthor("");
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
          value={context.author}
          id="outlined-basic"
          label="Author Name"
          size="small"
          variant="outlined"
        />
        <TextField
          onChange={handleChangeWork}
          value={context.work}
          id="outlined-basic"
          label="Task Work"
          size="small"
          variant="outlined"
          sx={{ marginLeft: 1, marginRight: 1 }}
        />
        {!context.isUpdate && (
          <Button
            sx={{
              paddingBottom: 1,
              paddingTop: 1,
            }}
            size="small"
            variant="outlined"
            onClick={handleAddTask}
          >
            ADD TASK
          </Button>
        )}
        {context.isUpdate &&   <Button
          sx={{
            paddingBottom: 1,
            paddingTop: 1,
          }}
          size="small"
          variant="outlined"
          onClick={handleUpdate}
        >
          UPDATE
        </Button> }
      
      </Box>
    </Container>
  );
};

export default WorkForm;
