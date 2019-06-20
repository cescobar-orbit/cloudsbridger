const axios = require('axios');

const getPositions = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "positions?expand=PositionCustomerFlex,PositionCustomerFlex.LVVO_PROGBENEFPOS&limit="+pagesize+'&offset='+offset, 
                  auth: {username: auth.username, password: auth.password},
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
                  }
          });
          //console.log(response.data.items || {}); 
          return response.data; 
        }
     catch(e){  console.log(e); return {}; }
}

module.exports = {
    getPositions: getPositions
};