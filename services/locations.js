const axios = require('axios');

const getLocations = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
    try
    {
     const response = await axios({method: "GET", url: baseURL + "locations?limit="+pagesize+'&offset='+offset+'&expand=locations.LocationDFF', 
                                  auth: {username: auth.username, password: auth.password},
                                  headers: {
                                     'Accept': 'application/json',
                                     'Content-Type': 'application/json'
                                   }
                                 });
     return response.data.items;                            
    }
    catch(e) {
        console.error(e);
        return {};
    }
}

module.exports = {
    getLocations: getLocations
};