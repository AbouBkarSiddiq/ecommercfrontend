import axios from 'axios'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Messages from './Message';
import MessageInput from './MessageInput';

const ProductDetails = () => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(`https://ecommerceburraq.herokuapp.com/`);
        setSocket(newSocket);
        // cleanup function
        return () => newSocket.close();
    }, [setSocket]);
    console.log("New socket:", socket)
    
    return (
        <>
            <MessageInput socket={socket}/>
            {/* <Messages socket={socket}/> */}
        </>
    );
}

export default ProductDetails;