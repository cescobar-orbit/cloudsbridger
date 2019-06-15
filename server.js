const express = require('express');
const app = express();
const fs = require('fs');
const Xml2JS = require('xml2js');
const xpath = require("xml2js-xpath");
const location = require('./services/locations');
const organization = require('./services/organizations');
const job = require('./services/jobs');
const grade = require('./services/grades');
const organizationdb = require('./azrtalentusdb/organizationdb');
const locationdb = require('./azrtalentusdb/locationdb');
const jobdb = require('./azrtalentusdb/jobdb');
const gradedb = require('./azrtalentusdb/gradedb');
const position = require('./services/positions');
const positiondb = require('./azrtalentusdb/positiondb');
const employee = require('./services/employees');
const employeedb = require('./azrtalentusdb/employeedb');

const port = 5000;

let cfg;
const env = process.env.NODE_ENV;
if(env.trim() === "development") {
    cfg = require('./config/development');
   //console.log(cfg);
}
else if(env == 'staging') {
    cfg = JSON.parse(fs.readFileSync('./config/staging.json', 'utf8'));
}
else if(env == 'production') {
    cfg = JSON.parse(fs.readFileSync('./config/production.json', 'utf8'));
}

//console.log(cfg.hcmAPI);

app.get('/workstructures/locations', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do 
    {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await location.getLocations(cfg.hcmAPI, offset);
      const locations  = response.locations;
            hasMore = response.hasMore;
      console.log(locations);
      const conn = locationdb.setLocation(cfg.dbConfig, locations);
      Promise.resolve(conn).then(function(value) { value.close(); }); 
      console.log('Locations offset: ', offset, ' pageNumber: ', pageNumber);   
      pageNumber = pageNumber + 1;
    } while(hasMore)
});

app.get('/workstructures/organizations',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do{
      offset = (pageNumber * cfg.hcmAPI.pagesize); 
      const response = await organization.getOrganizations(cfg.hcmAPI, offset);
      const organizations = response.items;
            hasMore =  response.hasMore;

      const conn = organizationdb.setOrganization(cfg.dbConfig, organizations);
      Promise.resolve(conn).then(value => { if(value) value.close(); });
      
      let orgFlex = [];
      for(const organization of organizations)
       {
         if(organization.OrganizationDFF && organization.OrganizationDFF.length > 0) {
           orgFlex.push(organization.OrganizationDFF[0]);
         }
       }
       
      const connDFF = organizationdb.setOrganizationDFF(cfg.dbConfig, orgFlex);
      Promise.resolve(connDFF).then(value => { value.close(); });
        
       console.log('Organization offset: ', offset, ' PageNumber: ', pageNumber);
       pageNumber = pageNumber + 1;
    } while(hasMore);
});

app.get('/workstructures/jobFamilies', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do 
    {
      const response = await job.getJobFamilies(cfg.hcmAPI, offset);
      const jobFamilies = response.items;
            hasMore = response.hasMore;

      //console.log(jobFamilies);
      jobdb.setJobFamily(cfg.dbConfig, jobFamilies);
      console.log('Jobfamilies offset: ', offset, ' pageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
    } while(hasMore); 
});

app.get('/workstructures/jobs',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do 
    { 
     offset = (pageNumber * cfg.hcmAPI.pagesize);
     const response = await job.getJobs(cfg.hcmAPI, offset);
     const jobs = response.items;
     hasMore = response.hasMore;
     //console.log(jobs);
     const ctx1 = await jobdb.setJob(cfg.dbConfig, jobs);
     Promise.resolve(ctx1).then(value => { value.close(); });

    
     console.log('Jobs offset: ', offset, ' pageNumber: ', pageNumber);
     pageNumber = pageNumber + 1;
    } while(hasMore);
});

app.get('/workstructures/grades',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do
     { 
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await grade.getGrades(cfg.hcmAPI, offset);
      const grades = response.items;
      hasMore = response.hasMore;

      //console.log(grades);
      for(const grade of grades)
      {
        const gradeConn = await gradedb.setGrade(cfg.dbConfig, grade);
        Promise.resolve(gradeConn).then(value => { value.close(); });

        const stepConn = await gradedb.setStep(cfg.dbConfig, data.GradeId, grade.steps[0]);
        Promise.resolve(stepConn).then(value => { value.close(); });
      }
      console.log('Grades offset: ', offset, ' pageNumber: ', pageNumber);
      pageNumber =  pageNumber + 1;
    } while(hasMore);
});

 app.get('/workstructures/gradeRates',  async (req, res) => { 
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do
    {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const rates = await grade.getRates(cfg.hcmAPI, offset);
      //console.log(rates);
      for(const rateItem of rates)
      {
       const conn = await gradedb.setRate(cfg.dbConfig, rateItem);
       Promise.resolve(conn).then(value => { value.close(); });
      
       const rateValueConn = await gradedb.setRateValue(cfg.dbConfig, rateItem.rateValues[0]);
       Promise.resolve(rateValueConn).then(value => { value.close(); });
      }  
      console.log('Rates offset: ${offset}, pageNumber: ${pageNumber}');
      pageNumber = pageNumber + 1;
    } while(hasMore);
});

app.get('/workstructures/positions', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let positionItems = [];
    let positionItemsDFF = [];
    do 
     {
        offset = (pageNumber * cfg.hcmAPI.pagesize);
        const response = await position.getPositions(cfg.hcmAPI, offset);
        const positions = response.items; 
        hasMore = response.hasMore;
        
        for(record of positions)
        {
          console.log(record);
          positionItems.push(record);
          //positionItemsDFF.push(record.PositionCustomerDFF[0]);
        }     
        console.log('Positions offset: ', offset, 'pageNumber: ', pageNumber);
        pageNumber = pageNumber + 1;
    } while(hasMore);

    const posConn1 = await positiondb.setPosition(cfg.dbConfig, positionItems);
    Promise.resolve(posConn1).then(value1 => { if(value1) value1.close(); });

   //const posConn2 = await positiondb.setPositionCustomerFlex(cfg.dbConfig, positionItemsDFF);
   //Promise.resolve(posConn2).then(value2 => { value2.close(); });
});

app.get('/employees', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do 
    {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await employee.getEmployees(cfg.hcmAPI, offset);
      const employees = response.items;
      hasMore = response.hasMore;

      const conn1 = await employeedb.setPerson(cfg.dbConfig, employees);
      Promise.resolve(conn1).then(function(value) { value.close(); });

      const conn2 = await employeedb.setEmployee(cfg.dbConfig, employees);
      Promise.resolve(conn2).then(function(value) { value.close(); });
      
      let assignmentItems = []; 
      let assignmentsDFF = [];
      let personTypesIdLOV = [];
      
      for(const emp of employees) 
      { 
        const assignments = emp.assignments;
        if(assignments && assignments.length > 0)
        { 
          assignmentItems.push(assignments[0]);
                  
          for(const a of emp.assignments)
           {
            if(a.assingmentDFF && a.assignmentDFF.length > 0)
               assignmentsDFF.push(a.assignmentDFF[0]);
            
            if(a.PersonTypeIdLOV && a.PersonTypeIdLOV.length > 0)
               personTypesIdLOV.push(a.PersonTypeIdLOV[0]);
          }
        }
       /* const publicWorker = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
        if(publicWorker.assignments && publicWorker.assignments.length > 0)
          {
           let workerNumber = publicWorker.assignments[0].WorkerNumber;
           console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
           const wrkConn = await employeedb.setWorkerNumber(cfg.dbConfig, emp.PersonNumber, workerNumber);
           Promise.resolve(wrkConn).then(w =>{ w.close(); });
         } */
      }
      //const ctx1 = await employeedb.setAssignment(cfg.dbConfig, assignmentItems);
      //Promise.resolve(ctx1).then(v => { v.close(); }).catch(err => { console.error(err); });


      //console.log(assignmentsDFF);
      //console.log(personTypesIdLOV);
      if(assignmentsDFF && assignmentsDFF.length > 0)
      {
        const ctx2 = await employeedb.setAssignmentDFF(cfg.dbConfig, assignmentsDFF);
        Promise.resolve(ctx2).then(v => { v.close(); });
      }
      if(personTypesIdLOV && personTypesIdLOV.length > 0)
      {
        const ctx3 = await employeedb.setPersonType(cfg.dbConfig, personTypesIdLOV);
        Promise.resolve(ctx3).then(pt => { pt.close(); });
      }
      console.log('Employee-Assignments offset: ', offset, 'PageNumber: ', pageNumber);

      pageNumber = pageNumber + 1;

    } while(hasMore);
    
});

// app.get('/workstructures/department-tree', async (req, res) => {
//    const FileXML = __dirname + "/public/COPA_DEPARTMENT_TREE.xml";
//    fs.readFileAsync(FileXML, 'utf8', async(err, xml) => {
//       if(!err) {
//         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
//              // find all elements: returns xml2js JSON of the element
//             const departmentNodes = xpath.find(json, "//DepartmentTreeNode");
//             //console.log(departmentNodes);
//             const conn = await organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
//             Promise.resolve(conn).then(value => { value.close(); });   
//         });
//       } 
//     });

app.get('/person-contacts', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_WORKER_20190607092638.xml";
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
       if(!err) 
       {
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
           // find all elements: returns xml2js JSON of the element
           const personContacts = xpath.find(json, "//Person_Contact/Person_Contact_Details/Person_Contact_Detail");
           console.log(personContacts);
           //const conn = await organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
           //Promise.resolve(conn).then(value => { value.close(); });   
         });
       } 
     });
  });

app.listen(port, () => console.log('connecting to HCM End-points') );
