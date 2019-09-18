const axios = require('axios');

const getEmployees = async (config, offset) => {
    const {baseURL, auth, pagesize} = config;
  
    try {
          //const restEmployeeAPI = baseURL + "emps?limit=" + pagesize+'&offset='+offset+'&expand=MaritalStatusLOV,assignments,assignments.assignmentDFF,assignments.assignmentDFF.LVVO_PROGRBENEFASG,assignments.PersonTypeIdLOV,assignments.ActionReasonCodeLOV&onlyData=true';
          const restEmployeeAPI = baseURL + 'emps?limit='+pagesize+'&offset='+offset+'&expand=MaritalStatusLOV';
          console.log(restEmployeeAPI);
          const response = await axios({ method: "GET", url: restEmployeeAPI, 
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

const getAssignment = async(config, personId) => 
{
    //console.log(link);
    const {baseURL,auth} = config;
    try{
          //const url = href+'?expand=assignmentDFF,assignmentDFF.LVVO_PROGRBENEFASG,PersonTypeIdLOV,ActionReasonCodeLOV&onlyData=true';
          let url = baseURL+'emps?q=PersonId='+personId+'&expand=assignments,assignments.assignmentDFF,assignments.assignmentDFF.LVVO_PROGRBENEFASG,assignments.PersonTypeIdLOV,assignments.ActionReasonCodeLOV&totalResults=true&onlyData=true';
          //console.log(url);
          const response = await axios({ method: "GET", url: url, 
            auth: {username: auth.username, password: auth.password},
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json'
            }
          });
    
      //console.log(response.data.items || {}); 
      return response.data; 
    }
     catch(e){ console.log(e); return {}; }
}


const getPublicWorker = async(config, personId) => {
  const {baseURL, auth} = config;
  try{
        const restPublicWorkerAPI = baseURL + 'publicWorkers?q=PersonId='+ personId +'&expand=assignments&onlyData=true';
        //console.log('PublicWorker API: ', restPublicWorkerAPI);
        const response = await axios({ method: "GET", url: restPublicWorkerAPI, 
        auth: {username: auth.username, password: auth.password},
               headers: {
                 'Accept': 'application/json',
                 //'Content-Type': 'application/json'
               }
        });

    //console.log(response.data || {}); 
    return response.data; 
  } catch(e) { console.log(e); return {}; }
 //publicWorkers/{100000014883613}?expand=assignments
}


module.exports = {
    getEmployees: getEmployees,
    getAssignment: getAssignment,
    getPublicWorker: getPublicWorker
};