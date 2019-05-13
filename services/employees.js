const axios = require('axios');

const getEmployees = async (config) => 
{
    const {baseURL, auth} = config;
      try{
          const pagesize =  500;
          const response = await axios({ method: "GET", url: baseURL + "employees?limit=" + pagesize, 
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
    getEmployees: getEmployees
};