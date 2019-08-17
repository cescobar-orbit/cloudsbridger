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
console.log(env);
if(env.trim() === "dev") {
    cfg = require('./config/development');
   //console.log(cfg);
}
else if(env.trim() === 'staging') {
    cfg = require('./config/staging');
}
else if(env.trim() === 'prod') {
    cfg = require('./config/production');
}
//console.log(cfg.hcmAPI);

app.get('/workstructures/locations', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    console.log('Locations');
    do 
    {
      const response = await location.getLocations(cfg.hcmAPI, offset);
      const locations  = response.items;
      hasMore = response.hasMore;
      
      const connLoc = await locationdb.setLocation(cfg.dbConfig, locations);
      Promise.resolve(connLoc).then(cloc => { cloc.close(); });
      console.log('Locations offset: ', offset, ' pageNumber: ', pageNumber);   
      
      pageNumber = pageNumber + 1;
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      if(!hasMore) { console.timeEnd('Locations'); break; }
    } while(hasMore)
});

app.get('/workstructures/organizations',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = false;
    let orgs = [];
    console.time('Organizations');
    
    do
    {
      console.log('Organization offset: ', offset, ' PageNumber: ', pageNumber);
      const response = await organization.getOrganizations(cfg.hcmAPI, offset);
      const organizations = response.items;
      hasMore =  response.hasMore;
            
      organizations.forEach( async(org) => {
        if(org && org.ClassificationCode != 'DEPARTMENT') 
           departments.push(org);
      });
       const connOrg = await organizationdb.setOrganization(cfg.dbConfig, orgs);
       Promise.resolve(connOrg).then( o => { o.close(); });
       
       offset = (pageNumber * cfg.hcmAPI.pagesize);
       pageNumber = pageNumber + 1;
       
       if(!hasMore) { console.timeEnd('Organizations'); break; }

    } while(hasMore);
 });

 app.get('/workstructures/organizations/departments',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = false;
    let departments = [];
    const orgDFFRows = [];

    do
    {
      console.log('Organization offset: ', offset, ' PageNumber: ', pageNumber);
      const response = await organization.getOrganizations(cfg.hcmAPI, offset);
      const organizations = response.items;
      hasMore =  response.hasMore;

      organizations.forEach( async(org) => {
        console.time('Organizations/Departments');
        //console.log(org);
        if(org && org.ClassificationCode == 'DEPARTMENT') 
        {
          const orgDFF = org.OrganizationDFF[0];
          if(orgDFF)
          {
              //console.log(orgDFF);
              let lvvoArea2Link = orgDFF.links.filter( l => { return l.name == 'LVVO_AREA2'} );
              //console.log('lvvoArea2Link', lvvoArea2Link[0].href);
              let href = lvvoArea2Link[0].href;
              const lvvoArea2 = await organization.getOrganizationDFFLOV(cfg.hcmAPI, href);
              //console.log(lvvoArea2);
              const orgDFFLov = lvvoArea2.filter( i => { return i.Value == orgDFF.AREA2 });
              console.log('orgDFFLov: ', orgDFFLov);
              
              Object.assign(orgDFF, {AreaDesc: orgDFFLov[0].Description, AreaValueId: orgDFFLov[0].ValueId});
            
              delete orgDFF.links;
              orgDFFRows.push(orgDFF);
            }
            delete org.links;
            departments.push(org);
          }
      });   
     const conOrg = await organizationdb.setOrganization(cfg.dbConfig, departments);
     Promise.resolve(conOrg).then( oc => { oc.close(); });
      //console.log('orgDFFRows: ', orgDFFRows);
      const connOrgDFF = await organizationdb.setOrganizationDFF(cfg.dbConfig, orgDFFRows);
      Promise.resolve(connOrgDFF).then( odff => { odff.close(); });
      
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber = pageNumber + 1;
       
       if(!hasMore) { console.timeEnd('Organizations/Departments'); break; }

    } while(hasMore);
    
 });


app.get('/workstructures/jobFamilies', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;

    do 
    {
      const response = await job.getJobFamilies(cfg.hcmAPI, offset);
      hasMore = response.hasMore;
      let jobFamilies = response.items;
      jobFamilies.forEach( async(jobFamily) => 
      {
        const connJobFamily = await jobdb.setJobFamily(cfg.dbConfig, jobFamily);
        Promise.resolve(connJobFamily).then( jf => { jf.close(); }); 
      });
      console.log('Jobfamilies offset: ', offset, ' pageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
      offset = (pagenumber * cfg.hcmAPI.pagesize);
      if(!hasMore) break;
    } while(hasMore); 
});

app.get('/workstructures/jobs',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let jobRows = [];

    console.time('Jobs');
    console.log('Jobs offset: ', offset, ' pageNumber: ', pageNumber);
    do 
    { 
     const response = await job.getJobs(cfg.hcmAPI, offset);
     hasMore = response.hasMore;
     const jobs = response.items;
     
     jobs.forEach( async(job) => {
       jobRows.push(job); 
     });

     const connJob = await jobdb.setJob(cfg.dbConfig, jobRows);
     Promise.resolve(connJob).then( j => { j.close(); });

     offset = (pageNumber * cfg.hcmAPI.pagesize);
     pageNumber = pageNumber + 1;
     if(!hasMore) { console.endTime('Jobs'); break; }
    } while(hasMore);

});

app.get('/workstructures/positions', async (req, res) => {
  let offset = 0;
  let pageNumber = 1;
  let hasMore = false;

  console.time('Positions');
  do 
   {
      console.log('Positions offset: ', offset, 'pageNumber: ', pageNumber);
      const response = await position.getPositions(cfg.hcmAPI, offset);
      let positions = response.items; 
      hasMore = response.hasMore;
      let positionRows = [];
      let positionFlex = [];

      if(positions)
      {
        positions.forEach( async(positionRaw) => {
          positionRows.push(positionRaw);
          positionFlex.push(positionRaw);
        });
      }

      const connPos = await positiondb.setPosition(cfg.dbConfig, positionRows);
      Promise.resolve(connPos).then( po => { po.close(); });
        
      const connPosFlex = await positiondb.setPositionCustomerFlex(cfg.dbConfig, positionRows);  
      Promise.resolve(connPosFlex).then(poFlex => {poFlex.close(); });

      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber = pageNumber + 1;
      
      if(!hasMore) {  console.timeEnd('Positions'); break; }
      
  } while(hasMore);
  
});


app.get('/workstructures/grades',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    console.time('Grades');
    do
     {
      console.log('Grades offset: ', offset, ' pageNumber: ', pageNumber);  
      const response = await grade.getGrades(cfg.hcmAPI, offset);
      const grades = response.items;
      hasMore = response.hasMore;
      let gradesRows = [];
      let gradeSteps = [];

      if(grades)
      {
        grades.forEach( async(grade) => {
          gradesRows.push(grade);
          gradeSteps.push(grade);
        });
      }
      const connGrade = await gradedb.setGrade(cfg.dbConfig, grade);
      Promise.resolve(connGrade).then( g => { g.close(); });
          
      const connGradeStep = await gradedb.setStep(cfg.dbConfig, grade);
      Promise.resolve(connGradeStep).then( gs => { gs.close(); });      
      
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber =  pageNumber + 1;
      if(!hasMore) { console.timeEnd('Grades');  break; }
    } while(hasMore);
});

 app.get('/workstructures/gradeRates',  async (req, res) => { 
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    do
    {
      const rates = await grade.getRates(cfg.hcmAPI, offset);
      //console.log(rates);
      if(rates) {
        rates.forEach( async(rateItem) => {
          const connRate = await gradedb.setRate(cfg.dbConfig, rateItem);
          Promise.resolve(connRate).then( r => { r.close(); });
          const connRateVal = await gradedb.setRateValue(cfg.dbConfig, rateItem.rateValues[0]);
          Promise.resolve(connRateVal).then( rv => { rv.close(); });
        });
      }
       
      console.log('Rates offset: ${offset}, pageNumber: ${pageNumber}');
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber = pageNumber + 1;
      if(!hasMore) break;
    } while(hasMore);
});


// Employee end-point
app.get('/employees', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;    
    
    do 
    {
      const response = await employee.getEmployees(cfg.hcmAPI, offset);
      const emps = response.items;
      hasMore = response.hasMore;
     
      if(emps) 
      {
        emps.forEach( async(emp) => 
        {
          const assignments = emp.assignments;
          const maritalStatusLov = emp.MaritalStatusLOV.filter( ms => { return ms.LookupCode == emp.MaritalStatus; });
          console.log(maritalStatusLov);
          Object.assign(emp, {MaritalStatusDesc: maritalStatusLov[0].Meaning});

          if(assignments)
          { 
            assignments.forEach( async(a) => 
            {
              const actionReasonCodeLov = a.ActionReasonCodeLOV.filter( ac => { return ac.ActionReasonCode == emp.ActionReasonCode; });
              console.log(actionReasonCodeLov);
              Object.assign(a, {ActionReason: actionReasonCodeLov[0].ActionReason, PersonNumber: emp.PersonNumber});

              const connAsg = await assignmentdb.setAssignment(cfg.dbConfig, a);
              Promise.resolve(connAsg).then( ca => {ca.close(); });
              
              a.assignmentDFF.forEach( async(adff) => {
                Object.assign(adff, {AssignmentNumber: a.AssignmentNumber});
                const connAsgDFF = await assignmentdb.setAssignmentDFF(cfg.dbConfig, adff);
                Promise.resolve(connAsgDFF).then( asgdff => { asgdff.close(); });
              });

              a.PersonTypeIdLOV.forEach(async(pt) => {
                const connPersonType = await employeedb.setPersonType(cfg.dbConfig, pt);
                Promise.resolve(connPersonType).then( cpt =>{ cpt.close(); });               
              });

            });
            const connPer = await employeedb.setPerson(cfg.dbConfig, emp);
            Promise.resolve(connPer).then(cper => { cper.close(); });
            
            const connEmp = await employeedb.setEmployee(cfg.dbConfig, emp);
            Promise.resolve(connEmp).then( ce => { ce.close(); });
          }

          const publicWorker = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
          if(publicWorker)
          {
            const workerNumber = publicWorker.assignments[0].WorkerNumber;
            console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
            const wrk = {PersonNumber: emp.PersonNumber, WorkerNumber: workerNumber};
            const connWrker = await employeedb.setWorkerNumber(cfg.dbConfig, wrk);
            Promise.resolve(connWrker).then( cwrk => { cwrk.close(); });
          }
          
        });
      }     
      console.log('Employee-Assignments offset: ', offset, 'PageNumber: ', pageNumber);
      pageNumber = pageNumber + 1;
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      if(!hasMore) break;
    } while(hasMore);

});

 app.get('/workstructures/department-tree', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_DEPARTMENT_TREE.xml";
    fs.readFileAsync(FileXML, 'utf8', async(err, xml) => {
       if(!err) {
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
              // find all elements: returns xml2js JSON of the element
             const departmentNodes = xpath.find(json, "//DepartmentTreeNode");
             //console.log(departmentNodes);
             const connOrg = await organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
             Promise.resolve(connOrg).then( oc => { oc.close(); });
         });
       }
      }); 
  });

app.get('/person-contacts', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_WORKER_20190723081017.xml";
  
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
       if(!err) 
       {
         let personContacts;
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
           if(error) { console.error(error); }
           // find all elements: returns xml2js JSON of the element
           personContacts = xpath.find(json, "//Person_Contact/Person_Contact_Details/Person_Contact_Detail");
        });
        console.dir(personContacts);
        const connPersonContact = await employeedb.setPersonContact(cfg.dbConfig, personContacts);
        Promise.resolve(connPersonContact).then( pc => { pc.close(); });           

       } 
     });
 
 });

 app.get('/worker-info', async (req, res) => {
   try
   {
    const FileXML = __dirname + "/public/COPA_WORKER_20190723081017.xml";
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
                 const connWorker1 = await employeedb.setWorkerNumber(cfg.dbConfig, workers);
                 Promise.resolve(connWorker1).then(cwrk1 => { cwrk1.close(); });
                 workers = [];
             }
             else 
             {
              const worker = {PersonNumber: wrk.PerNumber, WorkerNumber: wrk.PerWorkerNumber};
              workers.push(worker);
             }

           }
           const personDetail = xpath.find(json, "//Person/Person_Detail");
           //console.log(personDetail);
           const connPD = await employeedb.setPersonDetail(cfg.dbConfig, personDetail);
           Promise.resolve(connPD).then(pd => { pd.close(); });

           const assignmentDetail = xpath.find(json, "//Assignment_Details/Assignment_Detail");
           console.log(assignmentDetail);
           const connAsgDet = await assignmentdb.setAssignmentDetail(cfg.dbConfig, assignmentDetail);  
           Promise.resolve(connAsgDet).then( asgd => asgd.close() );                
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
         const asgSalDet = await assignmentdb.setSalaryDetail(cfg.dbConfig, salaryDetails);
         Promise.resolve(asgSalDet).then(asd => asd.close());
         const salaryComponents = xpath.find(json, "//Salary_Component_Details/Salary_Component_Detail");
         console.log(salaryComponents);
         const asgSalComp = await assignmentdb.setSalaryComponent(cfg.dbConfig, salaryComponents);  
         Promise.resolve(asgSalComp).then(ascmp = ascmp.close()); 
       });
     } 
   });
});

app.listen(port, () => console.log('connecting to HCM End-points') );
