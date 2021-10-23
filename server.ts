import express from 'express'; 
import * as path from 'path'; 
import * as http from 'http';
import { BackendApi } from './routes/backend-api';

export class Server {
    private _app: express.Application; 

    public static bootstrap(): Server { 
        return new Server(); 
    } 

    constructor() {
        // create expressjs application 
        this._app = express(); 
        // configure application 
        this.config();     
        // configure routes 
        this.routes();
    }
    
    private config() {
        // Parsers for POST data 
        this._app.use(express.json()); 
        this._app.use(express.urlencoded({ extended: false })); 
        // Point static path to public folder 
        this._app.use(express.static(path.join(__dirname, 'public'))); 
     
        /** 
         * Get port from environment and store in Express. 
         */ 
        const port = process.env.PORT || '3000'; 

        this._app.set('port', port); 
    
        /** 
         * Create HTTP server. 
         */ 
        const server = http.createServer(this._app);
    
        /** 
         * Listen on provided port, on all network interfaces. 
         */ 
        server.listen(port, () => console.log(`API running on localhost:${port}`)); 
    }

    private routes() { 
        // get router 
        const router: express.Router = express.Router();     
        // create routes 
        const api: BackendApi = new BackendApi();
    
        // API
        router.get('/api/mssqlversioninfo', api.getMsSqlVersionInfo.bind(api.getMsSqlVersionInfo));     
        // use router middleware 
        this._app.use(router);     
        // Catch all other routes and return the index file 
        this._app.get('*', (req, res) => { 
            res.sendFile(path.join(__dirname, 'public/index.html')); 
        }); 
    }
}

Server.bootstrap();
