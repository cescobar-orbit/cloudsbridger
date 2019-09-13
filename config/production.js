const config = {
        hcmAPI:{
            baseURL: "https://ejom-dev1.fa.us6.oraclecloud.com/hcmRestApi/resources/latest",
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
            port: "1433"
          }   
    };
   
    module.exports = config;