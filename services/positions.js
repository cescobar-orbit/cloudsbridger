const axios = require('axios');

const getPositions = async (config) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "positions?limit="+pagesize, 
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

const getFlexfields = async (config, link) => 
{
    const {auth} = config;
    try{
          const response = await axios({ method: "GET", url: link, 
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
    getPositions: getPositions,
    getFlexfields: getFlexfields
};