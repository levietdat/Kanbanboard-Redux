import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useContext } from "react";
import WorkItem from "./WorkItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, updateTodo } from "../redux/todosSlice";
import { StateContext } from "../Context";
import { style } from "../styles/index";
const WorkList = () => {
  const context = useContext(StateContext)
  const todoTask = useSelector((state) => state.todoReducer.todo);
  const dispatch = useDispatch();
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e, status) => {
    e.preventDefault();
        dispatch(
          updateTodo({
            _id: context.workId,
            status: status,
          })
        );
    };
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);
  return (
    <Container
      sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
    >
      <Box
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, "todo")}
        component="ul"
        sx={style.task}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          TODO
        </Typography>
        <WorkItem
          todo={todoTask.filter((todo) => todo.status === "todo")}
        />
      </Box>
      <Box
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, "inprogress")}
        component="ul"
        sx={style.task}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          INPROGRESS
        </Typography>

        <WorkItem
          todo={todoTask.filter((todo) => todo.status === "inprogress")}
        />
      </Box>
      <Box
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, "completed")}
        component="ul"
        sx={style.task}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          COMPLETED
        </Typography>
        <WorkItem
          todo={todoTask.filter((todo) => todo.status === "completed")}
        />
      </Box>
    </Container>
  );
};

export default WorkList;
