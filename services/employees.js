const axios = require('axios');

const getEmployees = async (config,offset) => {
    const {baseURL, auth, pagesize} = config;
  
    try {
          const response = await axios({ method: "GET", url: baseURL + "emps?limit=" + pagesize+'&offset='+offset+'&expand=MaritalStatusLOV,assignments,assignments.assignmentDFF,assignments.assignmentDFF.LVVO_PROGRBENEFASG,assignments.PersonTypeIdLOV,assignments.ActionReasonCodeLOV&onlyData=true', 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
            }
        });
    
      //console.log(response.data.items || {}); 
      return response.data; 
    } catch(e){  console.log(e); return {}; }
  }

const getAssignment = async (config, link) => 
{
    //console.log(link);
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
      return response.data; 
    }
     catch(e){ console.log(e); return {}; }
}

const getDirectReports = async(config) => {
  const {baseURL, auth} = config;
}


const getPublicWorker = async(config, personId) => {
  const {baseURL, auth} = config;
  try{
        const response = await axios({ method: "GET", url: baseURL + 'publicWorkers/'+ personId +'?field=WorkerNumber&expand=assignments&onlyData=true', 
        auth: {username: auth.username, password: auth.password},
        headers: {
            'Accept': 'application/json',
            //'Content-Type': 'application/json'
        }
      });

    //console.log(response.data.items || {}); 
    return response.data; 
  } catch(e) { }
 //publicWorkers/{100000014883613}?expand=assignments
}


module.exports = {
    getEmployees: getEmployees,
    getAssignment: getAssignment,
    getDirectReports: getDirectReports,
    getPublicWorker: getPublicWorker
};