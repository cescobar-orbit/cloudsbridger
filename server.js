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
      const locations = await location.getLocations(cfg.hcmAPI, offset);
      console.log(locations);
      const conn = locationdb.setLocation(cfg.dbConfig, locations);
      Promise.resolve(conn).then(function(value) { value.close(); }); 
      console.log('Locations offset: ${offset}, pageNumber: ${pageNumber}');   
      pageNumber = pageNumber + 1;
    } while(hasMore)
});

app.get('/workstructures/organizations',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do{
      offset = (pageNumber * cfg.hcmAPI.pagesize); 
      const organizations = await organization.getOrganizations(cfg.hcmAPI, offset);
      //console.log(organizations);
      for(const organization of organizations)
       {
        const organizationDFF = organization.organizationDFF[0];
        const conn = organizationdb.setOrganization(cfg.dbConfig, organization);
        Promise.resolve(conn).then(value => { value.close(); });
        
        const connDFF = organizationdb.setOrganizationDFF(cfg.dbConfig, organizationDFF);
        Promise.resolve(connDFF).then(value => { value.close(); });
       }
       console.log('Organization offset: ${offset}, PageNumber: ${pageNumber}');
       pageNumber = pageNumber + 1;
    } while(hasMore);
});

app.get('/workstructures/jobFamilies', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do 
    {
      const jobFamilies = await job.getJobFamilies(cfg.hcmAPI, offset);
      //console.log(jobFamilies);
      jobdb.setJobFamily(cfg.dbConfig, jobFamilies);
      console.log('Jobfamilies offset: ${offset}, pageNumber: ${pageNumber}');
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
     const jobs = response.jobs;
     hasMore = response.hasMore;
     //console.log(jobs);
     const ctx1 = jobdb.setJob(cfg.dbConfig, jobs);
     Promise.resolve(ctx1).then(value => { value.close(); });

     const ctx2 = jobdb.setJob
     console.log('Jobs offset: ${offset}, pageNumber: ${pageNumber}');
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
      const grades = await grade.getGrades(cfg.hcmAPI, offset);
      //console.log(grades);
      for(const grade of grades)
      {
        const gradeConn = gradedb.setGrade(cfg.dbConfig, grade);
        Promise.resolve(gradeConn).then(value => { value.close(); });

        const stepConn = gradedb.setStep(cfg.dbConfig, data.GradeId, grade.steps[0]);
        Promise.resolve(stepConn).then(value => { value.close(); });
      }
      console.log('Grades offset: ${offset}, pageNumber: ${pageNumber}');
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
       const conn = gradedb.setRate(cfg.dbConfig, rateItem);
       Promise.resolve(conn).then(value => { value.close(); });
      
       const rateValueConn = gradedb.setRateValue(cfg.dbConfig, rateItem.rateValues[0]);
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
    do 
     {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await position.getPositions(cfg.hcmAPI, offset);
      const positions = response.items; 
      hasMore = response.hasMore;
  
      const posConn1 = positiondb.setPosition(cfg.dbConfig, positions);
      Promise.resolve(postConn1).then(value => { value.close(); });
      
      // const postConn2 = positiondb.setPositionCustomerFlex(positions);
      // Promise.resolve(postConn2).then(value => { value.close(); });
      
      console.log('Positions offset: ',offset, 'pageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
    } while(hasMore);
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
      //const conn1 = employeedb.setPerson(cfg.dbConfig, employees);
      //Promise.resolve(conn1).then(function(value) { value.close(); });

      //const conn2 = employeedb.setEmployee(cfg.dbConfig, employees);
      //Promise.resolve(conn2).then(function(value) { value.close(); });
      
      let assignmentsDFF = [];
      for(const emp of employees) { 
        const assignments = emp.assignments;
        if(assignments && assignments.length)
        { 
         //const ctx1 = employeedb.setAssignment(cfg.dbConfig, assignments);
         //Promise.resolve(ctx1).then(v => { v.close(); });
         for(const a of assignments)
            assignmentsDFF.push(a.assignmentDFF);
        }
        const publicWorker = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
        let workerNumber = publicWorker.assignments[0].WorkerNumber;
        console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
        const wrkConn = employeedb.setWorkerNumber(cfg.dbConfig, emp.PersonNumber, workerNumber);
        Promise.resolve(wrkConn).then(w =>{ w.close(); });
      }

      const ctx2 = employeedb.setAssignmentDFF(cfg.dbConfig, assignmentsDFF);
      Promise.resolve(ctx2).then(v => { v.close(); });

      console.log('Assignments offset: ', offset, 'PageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
    } while(hasMore);
    
    // let assignments = [];
    // let aflexFields = [];
    // let personTypes = [];

    // for(const data of employees) 
    //   { 
    //     if(data.assignments.length > 0) {
    //         for(const assignmentItem of data.assignments)
    //          {
    //             let assignmentItemAppended = Object .assign(assignmentItem[0], {PersonNumber: data.PersonNumber});
    //             assignments.push(assignmentItemAppended);
    //             //console.log(assignments);
    //             if(assignmentItem.assignmentDFF && assignmentItem.assignmentDFF.length > 0)
    //               {
    //                 aflexFields.push(assignmentItem.assignmentDDF[0]);  
    //               }
    //               if(assignmentItem.PersonTypeIdLOV && assignmentItem.PersonTypeIdLOV.length > 0) {
    //                  personTypes.push(assignmentItem.PersonTypeIdLOV[0]);
    //               }   
    //             }
    //          }
    //       }

//        const conn3 = employeedb.setAssignment(cfg.dbConfig, assignments);
//        Promise.resolve(conn3)
//               .then(value => { value.close(); });

//        const conn4 = employeedb.setAssignmentFlex(cfg.dbConfig, aflexFields);
//        Promise.resolve(conn4)
//               .then( value => { value.close(); });
    
//       const conn5 = employeedb.setPersonType(cfg.dbConfig, personTypes);
//       Promise.resolve(conn5)
//              .then( value => { value.close(); });
});

app.get('/workstructures/department-tree', (req, res) => {
   const FileXML = __dirname + "/public/COPA_DEPARTMENT_TREE.xml";
   fs.readFile(FileXML, 'utf8', (err, xml) => {
      if(!err) {
        Xml2JS.parseString(xml, {trim:true}, (error, json) => {
             // find all elements: returns xml2js JSON of the element
            const departmentNodes = xpath.find(json, "//DepartmentTreeNode");
            //console.log(departmentNodes);
            const conn = organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
            Promise.resolve(conn)
                   .then(function(value) { value.close(); });
            
           /*         
           for(item of matches) {
                console.log('ParentDepartmentId: ', item.ParentDepartmentId[0], ' DepartmentId: ', item.DepartmentId[0]);
            } */
    
        });
      } 
    });
});

app.listen(port, () => console.log('connecting to HCM End-points') );
