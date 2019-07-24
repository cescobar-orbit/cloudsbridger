'use strict';

const sql = require('mssql');
// import config reader

const getConnection = async (ctx) => {
 try
 {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    const connectionPool = await new sql.ConnectionPool(config).connect();
    
    return connectionPool;
 } catch(e) { console.error(e); }
}

module.exports = {
   getConnection: getConnection
}
