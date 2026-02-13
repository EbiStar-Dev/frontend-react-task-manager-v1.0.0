import {createContext, useContext, useEffect, useState} from "react";
import { ListTask } from "../services/TaskServices";

const TaskContext = createContext();
export default TaskContext;


export const TaskProvider=({children})=>{
    const [Tasks,setTask]=useState([]);

    useEffect(()=>{
        ListTask().then(res=>setTask(res.data));
        
    },[]);

    return(
        <TaskContext value={{ Tasks }}>
            {children}
        </TaskContext>
    )
}
export const useTask = () => {
    return useContext(TaskContext)
}