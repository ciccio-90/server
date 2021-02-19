import * as express from 'express';
import * as sql from 'mssql';

const mssqlCfg = require('../mssql.json');

export class BackendApi { 
    getMsSqlVersionInfo(req: express.Request, res: express.Response) { 
        const connection: sql.ConnectionPool = new sql.ConnectionPool(mssqlCfg, (err: any) => {
            if (err != null) {
                // ... error checks
                res.send(err);
                connection.close();
            } else {
                connection.query('SELECT * FROM [dbo].[msdb_version]').then(result => {
                    res.header('Content-Type', 'application/json');
                    res.send(JSON.stringify(result.recordset, null, 4));
                    connection.close();
                }).catch(err => {
                    // ... error checks
                    res.send(err);
                    connection.close();
                });
            }
        });
         
        connection.on('error', err => {
            // ... error handler
            res.send(err);
            connection.close();
        });
    } 
}