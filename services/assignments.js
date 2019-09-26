'use strict'

const axios = require('axios');

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


const getPersonTypes = async(config, offset) => {
    const {baseURL,auth} = config;
    try{
          let url = baseURL+'personTypesLOV?offset='+offset+'&onlyData=true';
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


module.exports = {
    getAssignment: getAssignment,
    getPersonTypes: getPersonTypes
}