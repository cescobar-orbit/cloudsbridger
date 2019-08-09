const axios = require('axios');

const getOrganizations = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
    try{
        const response = await axios({ method: "GET", url: baseURL + "organizations?expand=OrganizationDFF&limit="+pagesize+'&offset='+offset+'&onlyData=false', 
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

const getOrganizationDFFLOV = async (config, baseURL) => 
{
    const {auth} = config;
    try{
        const response = await axios({ method: "GET", url: baseURL, 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
            }
        });
    
      //console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

module.exports = {
    getOrganizations: getOrganizations,
    getOrganizationDFFLOV: getOrganizationDFFLOV
};