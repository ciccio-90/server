const sql = require('mssql');
const mssqlCfg = require('../mssql.json');

class BackendApi { 
    getMsSqlVersionInfo(req, res) { 
        sql.connect(mssqlCfg).then(() => {
            return sql.query `SELECT * FROM [dbo].[msdb_version]`;
        }).then(result => {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(result.recordset, null, 4));
            sql.close();
        }).catch(err => {
            // ... error checks
            res.send(err);
            sql.close();
        });
         
        sql.on('error', err => {
            // ... error handler
            res.send(err);
            sql.close();
        });
    } 
}

module.exports = BackendApi;