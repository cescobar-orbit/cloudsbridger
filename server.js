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
console.log(cfg.hcmAPI);
console.log(cfg.dbConfig.database);

app.get('/workstructures/locations', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    console.log('Locations');
    do 
    {
      console.log('Locations offset: ', offset, ' pageNumber: ', pageNumber);
      const response = await location.getLocations(cfg.hcmAPI, offset);
      const locations  = response.items;
      hasMore = response.hasMore;
      
      const connLoc = await locationdb.setLocation(cfg.dbConfig, locations);
      Promise.resolve(connLoc).then(cloc => { cloc.close(); });
      
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
           orgs.push(org);
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
    let jobFamilyItems = [];
    
    console.time('Job Families');
    do 
    {
      console.log('Jobfamilies offset: ', offset, ' pageNumber: ', pageNumber);
      const response = await job.getJobFamilies(cfg.hcmAPI, offset);
      hasMore = response.hasMore;
      let jobFamilies = response.items;

      jobFamilies.forEach( async(jobFamily) => 
      {
        jobFamilyItems.push(jobFamily);
      });

      const connJobFamily = await jobdb.setJobFamily(cfg.dbConfig, jobFamilyItems);
      Promise.resolve(connJobFamily).then( jf => { jf.close(); jobFamilyItems = []; }); 

      pageNumber = pageNumber + 1;
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      if(!hasMore) { console.timeEnd('Job Families'); break; }
    } while(hasMore); 
});

app.get('/workstructures/jobs',  async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;
    let jobRows = [];

    console.time('Jobs');
    
    do 
    { 
     console.log('Jobs offset: ', offset, ' pageNumber: ', pageNumber); 
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
  let hasMore = true;

  console.time('Positions');
  do 
   {
      console.log('Positions offset: ', offset, 'pageNumber: ', pageNumber);
      const response = await position.getPositions(cfg.hcmAPI, offset);
      let positions = response.items; 
      hasMore = response.hasMore;
      let positionRows = [];
      let positionFlex = [];

      if(positions && positions.length > 0)
      {
        for(let positionRaw of positions) {
          positionRows.push(positionRaw);
          let flex = positionRaw.PositionCustomerFlex[0];
          console.log(flex);
          let benefitPlan = flex.LVVO_PROGBENEFPOS.filter( i => { return i.Value == flex.PROGBENEFPOS});
         
          if(benefitPlan && benefitPlan.length == 0) 
          {
            benefitPlan = [];
            benefitPlan.push({Description: ''});
          }
          let benefitPlanName = benefitPlan[0].Description;
          console.log('BenefitPlanName: ', benefitPlanName);
          let positionFlexItem = {PositionId: flex.PositionId,
                                  Station: flex.Station, 
                                  BenefitPlanCode: flex.BenefitPlanCode,
                                  BenefitPlanName: benefitPlanName,
                                  ClassificationCode: flex.ClassificationCode,
                                  RiskLevel: flex.RiskLevel};
          positionFlex.push(positionFlexItem);
        }
      }

      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber = pageNumber + 1;
      
      if(!hasMore) {
        console.log('Positions: ', positionRows.length);  
        const connPos = await positiondb.setPosition(cfg.dbConfig, positionRows);
        Promise.resolve(connPos).then( po => { po.close(); });
        
        const connPosFlex = await positiondb.setPositionCustomerFlex(cfg.dbConfig, positionRows);  
        Promise.resolve(connPosFlex).then(poFlex => {poFlex.close(); });
        console.timeEnd('Positions'); 
        break; 
      }      
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
      let gradeRows = [];
      let gradeSteps = [];

      if(grades)
      {
        grades.forEach( async(grade) => {
          const gradeStep = grade.steps[0];
          Object.assign(gradeStep, {GradeId: grade.GradeId});
          gradeRows.push(grade);
          gradeSteps.push(gradeStep);
        });
      }
      const connGrade = await gradedb.setGrade(cfg.dbConfig, gradeRows);
      Promise.resolve(connGrade).then( g => { g.close(); });
          
      const connGradeStep = await gradedb.setStep(cfg.dbConfig, gradeSteps);
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
    let rateItems = [];
    let rateValueItems = [];

    console.time('Grade Rates');
    do
    {
      console.log('Rates offset: ', offset, ' pageNumber: ', pageNumber);
      const response = await grade.getRates(cfg.hcmAPI, offset);
      hasMore = response.hasMore;
      const rates = response.items;

      if(rates) {
        rates.forEach( async(rateItem) => {
          rateItems.push(rateItem);
          rateValueItems.push(rateItem.rateValues[0]);
        });
      }

      const connRate = await gradedb.setRate(cfg.dbConfig, rateItems);
      Promise.resolve(connRate).then( r => { r.close(); });
          
      const connRateVal = await gradedb.setRateValue(cfg.dbConfig, rateValueItems);
      Promise.resolve(connRateVal).then( rv => { rv.close(); });
       
      offset = (pageNumber * cfg.hcmAPI.pagesize);
      pageNumber = pageNumber + 1;
      if(!hasMore) { console.timeEnd('Grade Rates'); break; }
    } while(hasMore);
});

// Employee end-point
app.get('/employees', async (req, res) => {
    let offset = 0;
    let pageNumber = 1;
    let hasMore = true;    
    let personTypes = [];
    let emps = [];
    let workers = [];  
    
    console.time('Employees'); 
  
    do 
    {
      console.log('Employees offset: ', offset, 'PageNumber: ', pageNumber);
      const response = await employee.getEmployees(cfg.hcmAPI, offset);
      const employees = response.items;
      hasMore = response.hasMore;

      if(employees && employees.length > 0) 
      {
        //console.log(employees);
        for(let emp of employees) 
        {
          const maritalStatusLov = emp.MaritalStatusLOV.filter( ms => { return ms.LookupCode == emp.MaritalStatus; });
          Object.assign(emp, {MaritalStatusDesc: maritalStatusLov[0].Meaning});
          try{
             let publicWorkerItems = await employee.getPublicWorker(cfg.hcmAPI, emp.PersonId);
             let publicWorkerAsg = publicWorkerItems.items[0].assignments[0];
             let workerNumber = publicWorkerAsg.WorkerNumber;
             console.log('PersonId: ', emp.PersonId, 'WorkerNumber: ', workerNumber);
             if(workerNumber) {
               let wrk = {PesonId: emp.PersonId, PersonNumber: emp.PersonNumber, WorkerNumber: workerNumber};
               workers.push(wrk);
             }
             Object.assign(emp, {WorkerNumber: workerNumber}); 
             emps.push(emp);
            } catch(e){ console.error(e); }  
        }
      }
      pageNumber = pageNumber + 1;
      offset = (pageNumber * cfg.hcmAPI.pagesize);
 
      if(!hasMore) { 
        const connEmp = await employeedb.setEmployee(cfg.dbConfig, emps);
        Promise.resolve(connEmp).then( ce => { ce.close(); });
        console.timeEnd('Employees');

        if(workers && workers.length > 0) {
          const connWorkers = await employeedb.setWorkerNumber(cfg.dbConfig, workers);
          Promise.resolve(connWorkers).then( cwrk => { cwrk.close(); });
        }
        console.log('Employees: ', emps.length, ' Workers: ', workers.length);
        break; 
      }
    } while(hasMore);
});


// Employee's Assignments end-point
app.get('/empassignments', async (req, res) => {
  let offset = 0;
  let pageNumber = 1;
  let hasMore = true;    
  let assignments = [];
  let assignmentsDFF = [];

  console.time('Employees Assignments'); 
  do 
  {
    console.log('Employees Assignment offset: ', offset, 'PageNumber: ', pageNumber);
    let response = await employee.getEmployees(cfg.hcmAPI, offset);
    let employees = response.items;
    hasMore = response.hasMore;
  
    if(employees && employees.length > 0) 
    {
      for(let emp of employees)
      {
        //let hrefObj = emp.links.filter(o => { return o.name == 'assignments' });
        let asgResponse = await employee.getAssignment(cfg.hcmAPI, emp.PersonId);
        let totalResults = asgResponse.totalResults;
        let items = asgResponse.items;
        let data = items[0].assignments;
        
        //console.log(data);
        for(let asg of data)
        {
          for(let indexPt=0; indexPt < asg.PersonTypeIdLOV.length; indexPt++)
          {
           let pt = asg.PersonTypeIdLOV[indexPt];
           personTypes.push(pt);
          }

         console.log("> Assignment.ActionReasonCode: ", asg.ActionReasonCode, ' pagenumber#: ', pageNumber, ' offset: ', offset, ' TotalResult: ', totalResults, ' count: ', assignments.length);
         
         if(asg.ActionReasonCode)
         {             
          let actionReasonCodeLov = asg.ActionReasonCodeLOV.filter( ac => { return ac.ActionReasonCode == asg.ActionReasonCode; });
          //console.log(actionReasonCodeLov);
          Object.assign(asg, {ActionReason: actionReasonCodeLov.ActionReason, PersonNumber: emp.PersonNumber});
         }
         else
         {        
           Object.assign(asg, {ActionReason: null, PersonNumber: emp.PersonNumber});
         }
         //delete asg.links;
         assignments.push(asg);
         //console.log(asg);
         let asgDff = asg.assignmentDFF[0];         
         let benefitPlan = asgDff.LVVO_PROGRBENEFASG.filter(i => { return i.Value == asgDff.PROGRBENEFASG });
           
         if(benefitPlan.length == 0)
         {
           benefitPlan = [];
           benefitPlan[0] = {BenefitPlanName: ''};
         }
         Object.assign(asgDff, {AssignmentNumber: asg.AssignmentNumber, BenefitPlan: benefitPlan[0].Description});
         assignmentsDFF.push(asgDff);
        } 
       }
    }
    pageNumber = pageNumber + 1;
    offset = (pageNumber * cfg.hcmAPI.pagesize);
    setTimeout(()=> { console.log('Taking a nap 10s ')}, 120000);
    if(!hasMore) {
        try{
           const connAsg = await assignmentdb.setAssignment(cfg.dbConfig, assignments);
           Promise.resolve(connAsg).then( asgc => { asgc.close(); });
        } catch(err) { console.error(err); }

        try{
              const connAsgDff = await assignmentdb.setAssignmentDFF(cfg.dbConfig, assignmentsDFF);
              Promise.resolve(connAsgDff).then( asgd => { asgd.close();  });
         } catch(e) { console.error(e); }

         console.timeEnd('Employees Assignments'); 
         setTimeout(()=> {console.log('> Assignments total: ', assignments.length); }, 50000); 
         break; 
    }
  } while(hasMore);
         
});

 app.get('/workstructures/department-tree', async (req, res) => {
    const FileXML = __dirname + "/public/COPA_DEPARTMENT_TREE_20190830073931.xml";
    console.time('DepartmentTree');
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
       if(!err) {
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
              if(error) console.log(error);

             const treeCode = xpath.find(json, "//DepartmentTreeVersion/TreeCode");
              // find all elements: returns xml2js JSON of the element
             const departmentNodes = xpath.find(json, "//DepartmentTreeNode");
             Object.assign(departmentNodes, {TreeCode: treeCode[0]});
             console.log(departmentNodes);
             const connOrg = await organizationdb.setDepartmentTree(cfg.dbConfig, departmentNodes);
             Promise.resolve(connOrg).then( oc => { oc.close(); console.timeEnd('DepartmentTree'); console.log('TreeCode: ', treeCode); });
         });
         
       }
      }); 
  });

app.get('/person-contacts', async (req, res) => {
    const FileXML = __dirname + "/public/PersonContact.xml";
    console.time('Person Contacts');  
    fs.readFile(FileXML, 'utf8', async(err, xml) => {
       if(!err) 
       {
         let personContacts;
         Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
           if(error) { console.error(error); }
           // find all elements: returns xml2js JSON of the element
           personContacts = xpath.find(json, "//Person_Contact_Details/Person_Contact_Detail");
        });
        console.dir(personContacts);
        const connPersonContact = await employeedb.setPersonContact(cfg.dbConfig, personContacts);
        Promise.resolve(connPersonContact).then( pc => { pc.close(); });           
        console.timeEnd('Person Contacts');
       } 
     }); 
 });

 
 app.get('/worker-info', async (req, res) => {
   try
   {
    const FileXML = __dirname + "/public/COPA_WORKER_20190830012846.xml";
    console.time('Worker');
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
           const personDetail = xpath.find(json, "//Person_Contact_Details/Person_Contact_Detail");
           //console.log(personDetail);
           const connPD = await employeedb.setPersonDetail(cfg.dbConfig, personDetail);
           Promise.resolve(connPD).then(pd => { pd.close(); });

           const assignmentDetail = xpath.find(json, "//Assignment_Details/Assignment_Detail");
           console.log(assignmentDetail);
           const connAsgDet = await assignmentdb.setAssignmentDetail(cfg.dbConfig, assignmentDetail);  
           Promise.resolve(connAsgDet).then( asgd => asgd.close() );                
        });
       console.timeEnd('Worker'); 
     } 
   });
  } catch(e) { console.error(e); }
});

app.get('/salary', async (req, res) => {
  const FileXML = __dirname + "/public/COPA_SALARY_20190523.xml";
  console.time('Salary');
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
       console.timeEnd('Salary'); 
     } 
   });
});

app.get('/personBankAcct', async (req, res) => {
  const FileXML = __dirname + "/public/COPA_WORKER_200190830012846.xml";
  console.time('PersonBankAccount');
  fs.readFile(FileXML, 'utf8', async(err, xml) => {
     if(!err) 
     {
       Xml2JS.parseString(xml, {trim:true}, async(error, json) => {
         if(error) { console.error(error); }
         // find all elements: returns xml2js JSON of the element
         const personBankAccts = xpath.find(json, "//Person_BankAccount/Person_BankAccount_Details/Person_BankAccount_Detail");
         console.log(personBankAccts);
         const perBankAcctCon = await employeedb.setPersonBankAcct(cfg.dbConfig, personBankAccts);
         Promise.resolve(perBankAcctCon).then(perBankAct => perBankAct.close());
       });
       console.timeEnd('PersonBankAccount'); 
     } 
   });
});

app.listen(port, () => console.log('connecting to HCM End-points') );
