const axios = require('axios');

const getGrades = async (config) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "grades?limit=" + pagesize, 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    
      //console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

const getSteps = async (config, href) => 
{
    const {auth} = config;
      try{
          const response = await axios({ method: "GET", url: href, 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    
      //console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

module.exports = {
    getGrades: getGrades,
    getSteps: getSteps
};