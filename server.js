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
      locationdb.setLocation(cfg.dbConfig, locations);
      console.log('Locations offset: ', offset, ' pageNumber: ', pageNumber);   
      pageNumber = pageNumber + 1;
    } while(hasMore)
});

app.get('/workstructures/organizations',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let organizations = [];
    let orgFlex = [];

    do{
      offset = (pageNumber * cfg.hcmAPI.pagesize); 
      const response = await organization.getOrganizations(cfg.hcmAPI, offset);
      hasMore =  response.hasMore;

      for(const org of response.items)
          organizations.push(org);    

      for(const organization of organizations)
       {
         if(organization.OrganizationDFF && organization.OrganizationDFF.length > 0) {
           orgFlex.push(organization.OrganizationDFF[0]);
         }
       }
      
       console.log('Organization offset: ', offset, ' PageNumber: ', pageNumber);
       pageNumber = pageNumber + 1;
    } while(hasMore);

    organizationdb.setOrganization(cfg.dbConfig, organizations);
    organizationdb.setOrganizationDFF(cfg.dbConfig, orgFlex);
});

app.get('/workstructures/jobFamilies', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let jobFamilies = [];

    do 
    {
      const response = await job.getJobFamilies(cfg.hcmAPI, offset);
      hasMore = response.hasMore;
      for(const jobFamily of response.items)
          jobFamilies.push(jobFamily);

      //console.log(jobFamilies);
      console.log('Jobfamilies offset: ', offset, ' pageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
    } while(hasMore); 

    jobdb.setJobFamily(cfg.dbConfig, jobFamilies);
});

app.get('/workstructures/jobs',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let jobs = [];
    do 
    { 
     offset = (pageNumber * cfg.hcmAPI.pagesize);
     const response = await job.getJobs(cfg.hcmAPI, offset);
     const jobItems = response.items;
     hasMore = response.hasMore;
     //console.log(jobs);
     for(const job of jobItems)
         jobs.push(job);

     console.log('Jobs offset: ', offset, ' pageNumber: ', pageNumber);
     pageNumber = pageNumber + 1;
    } while(hasMore);

    jobdb.setJob(cfg.dbConfig, jobs);
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
        gradedb.setGrade(cfg.dbConfig, grade);
        gradedb.setStep(cfg.dbConfig, data.GradeId, grade.steps[0]);
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
       gradedb.setRate(cfg.dbConfig, rateItem);
       gradedb.setRateValue(cfg.dbConfig, rateItem.rateValues[0]);
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
        }     
        console.log('Positions offset: ', offset, 'pageNumber: ', pageNumber);
        pageNumber = pageNumber + 1;
    } while(hasMore);

    positiondb.setPosition(cfg.dbConfig, positionItems);
    positiondb.setPositionCustomerFlex(cfg.dbConfig, positionItems);
});

app.get('/employees', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    
    let employees = [];
    let assignmentItems = []; 
    const assignmentsDFF = [];
    let personTypesIdLOV = [];
    let publicWorkers = [];

    do 
    {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await employee.getEmployees(cfg.hcmAPI, offset);
      const emps = response.items;
      hasMore = response.hasMore;
     
      for(const emp of emps)
      {
        const assignments = emp.assignments;
        employees.push(emp);

        if(assignments && assignments.length > 0)
        { 
          //if(assignments.assingmentDFF && assignments.assignmentDFF.length > 0)
             assignmentsDFF.push(assignments[0].assignmentDFF);
         
          if(assignments.PersonTypeIdLOV && assignments.PersonTypeIdLOV.length > 0)
             personTypesIdLOV.push(assignments.PersonTypeIdLOV[0]);

          assignmentItems.push(Object.assign(assignments, {PersonNumber: emp.PersonNumber}));            
        }        
      }
      
        /*
        const publicWorker = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
        if(publicWorker && publicWorker.assignments.length > 0)
          {
            const workerNumber = publicWorker.assignments[0].WorkerNumber;
            console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
            publicWorkers.push({PersonNumber: emp.PersonNumber, WorkerNumber: workerNumber});  
          }
          */
     
      console.log('Employee-Assignments offset: ', offset, 'PageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
      //console.log(personTypesIdLOV);
      //console.log(assignmentsDFF);
    } while(hasMore);

    //employeedb.setPerson(cfg.dbConfig, employees);
    //employeedb.setEmployee(cfg.dbConfig, employees);
    //employeedb.setAssignment(cfg.dbConfig, assignmentItems);
    employeedb.setAssignmentDFF(cfg.dbConfig, assignmentsDFF);
    //employeedb.setWorkerNumber(cfg.dbConfig, publicWorkers);
    //employeedb.setPersonType(cfg.dbConfig, personTypesIdLOV);
});

 app.get('/workstructures/department-tree', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_DEPARTMENT_TREE.xml";
    fs.readFileAsync(FileXML, 'utf8', async(err, xml) => {
       if(!err) {
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
              // find all elements: returns xml2js JSON of the element
             const departmentNodes = xpath.find(json, "//DepartmentTreeNode");
             //console.log(departmentNodes);
             organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
         });
       }
      }); 
  });

app.get('/person-contacts', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_WORKER_20190607092638.xml";
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
       if(!err) 
       {
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
           // find all elements: returns xml2js JSON of the element
           const personContacts = xpath.find(json, "//Person_Contact/Person_Contact_Details/Person_Contact_Detail");
           console.log(personContacts);
           employeedb.setPersonContact(cfg.dbConfig, personContacts);
             
         });
       } 
     });
 });

app.listen(port, () => console.log('connecting to HCM End-points') );
