import axios from "axios";

const PUBLIC_URL= "http://localhost:9000"

export const ListTask=()=>{
const url = `${PUBLIC_URL}/task`;
return axios.get(url);
}