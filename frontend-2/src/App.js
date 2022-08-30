import "./App.css";
import WorkForm from "./components/WorkForm";
import Container from "@mui/material/Container";
import WorkList from "./components/WorkList";
import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Alert, Box } from "@mui/material";
import { useSelector } from "react-redux";
function App() {
  const isPending = useSelector((state) => state.todoReducer.status);
  const [progress, setProgress] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [author, setAuthor] = useState("");
  const [work, setWork] = useState("");
  const [workId, setWorkId] = useState("");
  const [alert, setAlert] = useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 100;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isPending]);

  return (
    <>
      <Box sx={ {position:'fixed' ,display:`${!alert?'none':''}`, right:'4px', maxWidth:'400px',opacity:1,transition: 'opacity 0.3s linear'}}>
        <Alert  severity="error">Invalid Value!</Alert>
      </Box>
      <Box sx={{ height: "4px" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            backgroundColor:
              isPending === "PENDING" ? "rgba(0,0,0,0.5)" : "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: isPending === "PENDING" ? "black" : "white",
            },
          }}
        />
      </Box>
      <Container>
        <WorkForm
        setAlert={setAlert}
          workId={workId}
          setWorkId={setWorkId}
          author={author}
          setAuthor={setAuthor}
          work={work}
          setWork={setWork}
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
        />
        <WorkList
        
          workId={workId}
          setWorkId={setWorkId}
          author={author}
          setAuthor={setAuthor}
          work={work}
          setWork={setWork}
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
        />
      </Container>
    </>
  );
}

export default App;
