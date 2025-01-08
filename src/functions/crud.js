import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const remove = async (part, id) => {
    console.log(part, id);
    await axios.delete(apiUrl + part)
}
