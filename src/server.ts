import { config } from './configs/config';
import app from './app';
import {connectDB} from './configs/db';
import { createServer } from 'http';
import { initializeSocket } from './utils/socket';

const server = createServer(app)

initializeSocket(server)


// Database connection
connectDB(); 

// Run Server
server.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`));   