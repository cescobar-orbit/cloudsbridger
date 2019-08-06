const axios = require('axios');

const getJobs = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "jobs?limit="+pagesize+'&offset='+offset+'&onlyData=true', 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
            }
        });
    
      console.log(response.data.items || {}); 
      return response.data; 
    }
     catch(e){  console.log(e); return {}; }
}

const getJobFamilies = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "jobFamilies?limit="+pagesize+'&offset='+offset+'&onlyData=true', 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
            }
        });
    
      //console.log(response.data.items || {}); 
      return response.data; 
    }
     catch(e){  console.log(e); return {}; }
}

module.exports = {
    getJobs: getJobs,
    getJobFamilies: getJobFamilies
};