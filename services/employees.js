const axios = require('axios');

const getEmployees = async (config) => 
{
    const {baseURL, auth, pagesize} = config;
      try{
          const response = await axios({ method: "GET", url: baseURL + "emps?limit=" + pagesize, 
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

const getAssignment = async (config, link) => 
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
    
      console.log(response.data.items || {}); 
      return response.data.items; 
    }
     catch(e){  console.log(e); return {}; }
}

const getDirectReports = async(config) => {
  const {baseURL, auth} = config;
}

const getAssignmentFlex = async(config) => {
  const {baseURL, auth} = config;
}

const getPublicWorker = async(config) => {
  const {baseURL, auth} = config;
  
}

const getCandidates = async (config) => {
    const {baseURL, auth} = config;
      try{
          const pagesize =  500;
          const response = await axios({ method: "GET", url: baseURL + "recruitingCandidates?limit=" + pagesize, 
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
    getEmployees: getEmployees,
    getAssignment: getAssignment,
    getDirectReports: getDirectReports,
    getAssignmentFlex: getAssignmentFlex,
    getPublicWorker: getPublicWorker,
    getCandidates: getCandidates
};