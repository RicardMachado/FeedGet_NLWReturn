import axios from "axios";

export const api = axios.create({
    baseURL: 'http://10.85.200.5:3333'
})