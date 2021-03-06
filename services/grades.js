const axios = require('axios');

const getGrades = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "grades?expand=steps&limit=" + pagesize+'&offset='+offset+'&onlyData=true', 
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

const getSteps = async (config, href) => 
{
    const {auth} = config;
      try{
          const response = await axios({ method: "GET", url: href, 
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

const getRates = async (config, offset) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "gradeRates?expand=rateValues&limit=" + pagesize+'&offset='+offset, 
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

const getRateValues = async (config, href) => 
{
    const {auth} = config;
      try{
          const response = await axios({ method: "GET", url: href+'&onlyData=true', 
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
    getGrades: getGrades,
    getSteps: getSteps,
    getRates: getRates,
    getRateValues: getRateValues
};