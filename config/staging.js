const config = {
   hcmAPI:{
         baseURL: "https://ejom-test.fa.us6.oraclecloud.com:443/hcmRestApi/resources/latest/",
         auth:{
             username: "integration.specialist",
             password: "Welcome2019"
           },
        pagesize: 50
       },
     dbConfig:{
         host: "sql-test-tibco-pass.database.windows.net",
         username: "svcTalentusAdminLogin",
         password: "Copa2019!",
         database: "COPA_TalentusDB",
         port: 1433,
         options: {        
              encrypt: true,
              requestTimeout: -1
          },
          pool: {
              max: 1000,
              min: 0,
              idleTimeoutMillis: 300000
          }
       }   
    };
   
    module.exports = config;