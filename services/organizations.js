const axios = require('axios');

const getOrganizations = async (config) => 
{
    const {baseURL, auth} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "organizations", 
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
    getOrganizations: getOrganizations
};