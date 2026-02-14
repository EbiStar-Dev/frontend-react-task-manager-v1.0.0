import axios from "axios";

const PUBLIC_URL= "http://localhost:9000"

export const ListTask=()=>{
const url = `${PUBLIC_URL}/task`;
return axios.get(url);
}

export const createTask=(data)=>{
    const url = `${PUBLIC_URL}/task`;
    return axios.post(url,data)
}

export const editTask=(data,id)=>{
    const url = `${PUBLIC_URL}/task/${id}`;
    return axios.put(url,data)
}
export const DeleteTask=(id)=>{
    const url = `${PUBLIC_URL}/task/${id}`;
    return axios.delete(url,id)
}
// status

export const ListStatus=()=>{
    const url = `${PUBLIC_URL}/Status`;
    return axios.get(url);
}
// Priority

export const ListPriority=()=>{
    const url = `${PUBLIC_URL}/Priority`;
    return axios.get(url);
}