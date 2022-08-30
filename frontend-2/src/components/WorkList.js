import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, updateTodo } from "../redux/todosSlice";

const WorkList = (props) => {
  const [workId, setWorkId] = useState("");
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e, status) => {
    e.preventDefault();
    console.log(workId, status);
    dispatch(
      updateTodo({
        _id: workId,
        status: status,
      })
    );
  };
  const fakeTodo = useSelector((state) => state.todoReducer.todo);
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
        sx={{
          borderRadius: 1,
          flex: "0 0 30%",
          padding: "0 0",
          border: "1px solid #ccc",
          padding: "0.5rem",

          listStyle: "none",
          minHeight: "30vh",
        }}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          {" "}
          TODO{" "}
        </Typography>

        <WorkItem
          workId={props.workId}
          setWorkId={props.setWorkId}
          author={props.author}
          setAuthor={props.setAuthor}
          work={props.work}
          setWork={props.setWork}
          setIsUpdate={props.setIsUpdate}
          isUpdate={props.isUpdate}
          todo={fakeTodo.filter((todo) => todo.status === "todo")}
        />
      </Box>

      <Box
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, "inprogress")}
        component="ul"
        sx={{
          borderRadius: 1,
          flex: "0 0 30%",

          padding: "0.5rem",
          border: "1px solid #ccc",
          listStyle: "none",
          minHeight: "30vh",
        }}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          {" "}
          INPROGRESS{" "}
        </Typography>

        <WorkItem
          workId={props.workId}
          setWorkId={props.setWorkId}
          author={props.author}
          setAuthor={props.setAuthor}
          work={props.work}
          setWork={props.setWork}
          setIsUpdate={props.setIsUpdate}
          isUpdate={props.isUpdate}
          onDragOver={false}
          todo={fakeTodo.filter((todo) => todo.status === "inprogress")}
          setTodo={props.setTodo}
        />
      </Box>

      <Box
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, "completed")}
        component="ul"
        sx={{
          borderRadius: 1,
          flex: "0 0 30%",
          padding: "0 0",
          border: "1px solid #ccc",
          padding: "0.5rem",

          listStyle: "none",
          minHeight: "30vh",
        }}
      >
        <Typography align="center" borderBottom={"1px solid #ccc"}>
          {" "}
          COMPLETED{" "}
        </Typography>
        <WorkItem
          author={props.author}
          setAuthor={props.setAuthor}
          work={props.work}
          setWork={props.setWork}
          setIsUpdate={props.setIsUpdate}
          isUpdate={props.isUpdate}
          workId={props.workId}
          setWorkId={props.setWorkId}
          todo={fakeTodo.filter((todo) => todo.status === "completed")}
        />
      </Box>
    </Container>
  );
};

export default WorkList;
