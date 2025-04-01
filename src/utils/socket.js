import io from "socket.io-client";
import {BASE_URL} from "./constansts";

const createSocketConnection = ()=>{
    return io(BASE_URL);
};

export default createSocketConnection;