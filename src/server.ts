import { config } from './configs/config';
import app from './app';
import {connectDB} from './configs/db';

// Database connection
connectDB(); 
// Run Server
app.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`));   