import "./App.css";
import WorkForm from "./components/WorkForm";
import Container from "@mui/material/Container";
import WorkList from "./components/WorkList";
import React, { useContext, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Alert, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { StateContext } from "./Context";
import { style } from "./styles/index";
function App() {
  const isPending = useSelector((state) => state.todoReducer.status);
  const context = useContext(StateContext);
  useEffect(() => {
    const timer = setInterval(() => {
      context.setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [isPending]);
  return (
    <>
      <Box sx={{ height: "4px" }}>
        <LinearProgress
          variant="determinate"
          value={context.progress}
          sx={{
            backgroundColor:
              isPending === "PENDING" ? "rgba(0,0,0,0.5)" : "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: isPending === "PENDING" ? "black" : "white",
            },
          }}
        />
      </Box>
      {context.alert && (
        <Box sx={style.alert}>
          <Alert severity="error">Invalid Value!</Alert>
        </Box>
      )}

      <Container>
        <WorkForm />
        <WorkList />
      </Container>
    </>
  );
}

export default App;
