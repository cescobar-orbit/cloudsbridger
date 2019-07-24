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
const assignmentdb = require('./azrtalentusdb/assignmentdb');

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
    let locationItems = [];
    do 
    {
      const response = await location.getLocations(cfg.hcmAPI, offset);
      const locations  = response.items;
      hasMore = response.hasMore;
      const connLoc = await locationdb.setLocation(cfg.dbConfig, locations);
      Promise.resolve(connLoc).then(cloc => {cloc.close()});
      console.log('Locations offset: ', offset, ' pageNumber: ', pageNumber);   
      pageNumber = pageNumber + 1;
      offset = (pageNumber * cfg.hcmAPI.pagesize);
    } while(hasMore)


});

app.get('/workstructures/organizations',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let organizations = [];
    let orgFlex = [];

    console.time('Organizations');

    do{
      offset = (pageNumber * cfg.hcmAPI.pagesize); 
      const response = await organization.getOrganizations(cfg.hcmAPI, offset);
      hasMore =  response.hasMore;

      for(const org of response.items)
          organizations.push(org);    
      
      let hrefDFF = '';
      for(const org of organizations)
       {
         let orgDFFLov = [];
         if(org.OrganizationDFF && org.OrganizationDFF.length > 0) {
           const orgDFF = org.OrganizationDFF[0];
           if(org.ClassificationCode == 'DEPARTMENT')
           {
             for(const link of orgDFF.links) {
               if(link.name == 'LVVO_AREA2') {
                 hrefDFF = link.href;
                 break;
               }
             }
  
             //console.log(hrefDFF);
             if(hrefDFF && hrefDFF.length > 0) {
                const orgDFFExtra = await organization.getOrganizationDFFLOV(cfg.hcmAPI, hrefDFF);
                //console.log(orgDFFExtra);
                orgDFFLov = orgDFFExtra.filter( i => { return i.Value == orgDFF.AREA2 });
                //console.log(orgDFFLov);
                if(orgDFFLov && orgDFFLov.length > 0)
                   Object.assign(orgDFF, {AreaDesc: orgDFFLov[0].Description, AreaValueId: orgDFFLov[0].ValueId});
                else 
                   Object.assign(orgDFF, {AreaDesc: '', AreaCode: '', AreaValueId: null});
                //console.log(orgDFF);
             }  
           }  
           else {
             //delete orgDFFLov[0].links;
             Object.assign(orgDFF, {AreaDesc: '', AreaCode: '', AreaValueId: null});
           }
           delete orgDFF.links;
           orgFlex.push(orgDFF);
         }
       }
      
       console.log('Organization offset: ', offset, ' PageNumber: ', pageNumber);
       pageNumber = pageNumber + 1;
    } while(hasMore);

    const orgConn = organizationdb.setOrganization(cfg.dbConfig, organizations);
    Promise.resolve(orgConn).then(o => { o.close(); });
    const orgDFFConn = organizationdb.setOrganizationDFF(cfg.dbConfig, orgFlex);
    Promise.resolve(orgDFFConn).then(dff => { dff.close(); });
    
    console.timeEnd('Organizations')
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
          //console.log(record);
          positionItems.push(record);
        }     
        console.log('Positions offset: ', offset, 'pageNumber: ', pageNumber);
        pageNumber = pageNumber + 1;
    } while(hasMore);

    positiondb.setPosition(cfg.dbConfig, positionItems);
    positiondb.setPositionCustomerFlex(cfg.dbConfig, positionItems);
});

// Employee end-point
app.get('/employees', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    
    let employees = [];
    let assignments = [];
    let assignmentsDFF = [];
    let personTypesIdLOV = [];
    let publicWorkers = [];
    
    do 
    {
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      const response = await employee.getEmployees(cfg.hcmAPI, offset);
      const emps = response.items;
      hasMore = response.hasMore;
     
      if(emps && emps.length > 0) {
        employees = [];
        assignmentItems = [];
        assignmentsDFF = [];

        emps.forEach( emp => {
          const assignments = emp.assignments;
          employees.push(emp);

          if(assignments && assignments.length > 0)
          {     
/*
            a.assignmentDFF.forEach( adff => {
              Object.assign(adff, {AssignmentNumber: a.AssignmentNumber});
              assignmentsDFF.push(adff);
            });
    

            a.PersonTypeIdLOV.forEach(pt => {
                personTypesIdLOV.push(pt);
            });
*/
            Object.assign(assignments[0], {PersonNumber: emp.PersonNumber});
            assignmentItems.push(assignments[0]);
        }
        /*
        const publicWorker = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
        if(publicWorker && publicWorker.assignments.length > 0)
          {
            const workerNumber = publicWorker.assignments[0].WorkerNumber;
            console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
            const wrk = {PersonNumber: emp.PersonNumber, WorkerNumber: workerNumber};
            const connWrker = employeedb.setWorkerNumber(cfg.dbConfig, wrk);
            Promise.resolve(connWrker).then( cwrk => { cwrk.close(); });
            publicWorkers.push(wrk);  
          }
        */        
      });
      const connPer = employeedb.setPerson(cfg.dbConfig, emps);
      Promise.resolve(connPer).then(p => { c.close(); });
      
      const connEmp = employeedb.setEmployee(cfg.dbConfig, emp);
      Promise.resolve(connEmp).then(e => { e.close(); });
      /*
      const connAsg = assignmentdb.setAssignment(cfg.dbConfig, assignmentItems);
      Promise.resolve(connAsg).then(c => { c.close(); });
      
      connAsgDFF = assignmentdb.setAssignmentDFF(cfg.dbConfig, assignmentDFF);
      Promise.resolve(connAsgDFF).then( dff => { dff.close(); });
      
      connPerType = employee.setPersonType(cfg.dbConfig, personTypeIdLOV);
      Promise.resolve(connPerType).then( pt => { pt.close(); });
      */
    }    
      
      console.log('Employee-Assignments offset: ', offset, 'PageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
      //console.log(personTypesIdLOV);
      //console.log(assignmentsDFF);
    } while(hasMore);

      //assignmentdb.setAssignmentDFF(cfg.dbConfig, assignmentsDFF);
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
             const connOrg = organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
             Promise.resolve(connOrg).then( oc => { oc.close(); });
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
           if(error) { console.error(error); }
           // find all elements: returns xml2js JSON of the element
           const personContacts = xpath.find(json, "//Person_Contact/Person_Contact_Details/Person_Contact_Detail");
           console.log(personContacts);
           connPersonContact = employeedb.setPersonContact(cfg.dbConfig, personContacts);
           Promise.resolve(connPersonContact).then( pc => { pc.close(); });  
         });
       } 
     });
 });

 app.get('/worker-info', async (req, res) => {
   try
   {
    const FileXML = __dirname + "/public/COPA_WORKER_20190607092638.xml";
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
      if(!err) 
      {
        Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
          if(error) { console.error(error); }
           // find all elements: returns xml2js JSON of the element
           const workRelation = xpath.find(json, "//Work_Relationship/Work_Relationship_Details/Work_Relationship_Detail");
           //console.log(workRelation);
           let workers = [];
           let wrk = {};

           for(let index=0; index < workRelation.length; index++)
           {
             wrk = workRelation[index];
             if(index == 200)
             {
                 const connWorker1 = employeedb.setWorkerNumber(cfg.dbConfig, workers);
                 Promise.resolve(connWorker1).then(cwrk1 => { cwrk1.close(); });
                 workers = [];
  
             }
             else 
             {
              const worker = {PersonNumber: wrk.PerNumber, WorkerNumber: wrk.PerWorkerNumber};
              workers.push(worker);
             }

           }
           //const personDetail = xpath.find(json, "//Person/Person_Detail");
           //console.log(personDetail);
           //const connPD = employeedb.setPersonDetail(cfg.dbConfig, personDetail);
           //Promise.resolve(connPD).then(pd => { pd.close(); });

           //const assignmentDetail = xpath.find(json, "//Assignment_Details/Assignment_Detail");
           //console.log(assignmentDetail);
           //const connAsgDet = assignmentdb.setAssignmentDetail(cfg.dbConfig, assignmentDetail);  
           //Promise.resolve(connAsgDet).then( asgd => asgd.close() );                
        });
     } 
   });
  } catch(e) { console.error(e); }
});

app.get('/salary', async (req, res) => {
  const FileXML = __dirname + "/public/COPA_SALARY_20190523.xml";
  fs.readFile(FileXML, 'utf8', async(err, xml) => {
     if(!err) 
     {
       Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
         if(error) { console.error(error); }
         // find all elements: returns xml2js JSON of the element
         const salaryDetails = xpath.find(json, "//Assignment_Salary/Salary_Details/Salary_Detail");
         console.log(salaryDetails);
         //const asgSalDet = assignmentdb.setSalaryDetail(cfg.dbConfig, salaryDetails);
         //Promise.resolve(asgSalDet).then(asd => asd.close());
         const salaryComponents = xpath.find(json, "//Salary_Component_Details/Salary_Component_Detail");
         console.log(salaryComponents);
         //const asgSalComp = assignmentdb.setSalaryComponent(cfg.dbConfig, salaryComponents);  
         //Promise.resolve(asgSalComp).then(ascmp = ascmp.close()); 
       });
     } 
   });
});

app.listen(port, () => console.log('connecting to HCM End-points') );
