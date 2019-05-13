const axios = require('axios');

const getJobs = async (config) => 
{
    const {baseURL, auth} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "jobs", 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    
      console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

const getJobFamilies = async (config) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "jobFamilies?limit="+pagesize, 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    
      console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

module.exports = {
    getJobs: getJobs,
    getJobFamilies: getJobFamilies
};