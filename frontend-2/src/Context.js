import { createContext, useState } from "react";
const StateContext = createContext();
const StateProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [author, setAuthor] = useState("");
  const [work, setWork] = useState("");
  const [workId, setWorkId] = useState("");
  const [alert, setAlert] = useState(false);
  const [idTask,setTaskId]  = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [authorUpdate,setAuthorUpdate] =useState()
  const [workUpdate,setWorkUpdate] =useState()
  const value = {
    progress,
    setProgress,
    isUpdate,
    setIsUpdate,
    author,
    setAuthor,
    work,
    setWork,
    workId,
    setWorkId,
    alert,
    setAlert,
    idTask,setTaskId,
    anchorEl,setAnchorEl,
    authorUpdate,setAuthorUpdate,
    workUpdate,setWorkUpdate,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
export  {StateProvider,StateContext}
