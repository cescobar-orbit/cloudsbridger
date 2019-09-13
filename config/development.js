const config = {
     hcmAPI:{
         baseURL: "https://ejom-dev1.fa.us6.oraclecloud.com/hcmRestApi/resources/11.13.18.05/",
         auth:{
             username: "Integration.Specialist",
             password: "Welcome2019"
           },
        pagesize: 100
       },
     dbConfig:{
         host: "sql-int-tibco-pass.database.windows.net",
         username: "talentusAdmin",
         password: "CopaMax9",
         database: "TalentusDB",
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