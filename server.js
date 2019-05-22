const express = require('express');
const app = express();
const fs = require('fs');
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
    const locations = await location.getLocations(cfg.hcmAPI);
    //console.log(locations);
    locationdb.setLocation(cfg.dbConfig, locations);
});

app.get('/workstructures/organizations',  async (req, res) => { 
      const organizations = await organization.getOrganizations(cfg.hcmAPI);
      //console.log(organizations);
      organizationdb.setOrganization(cfg.dbConfig, organizations);
      for(const data of organizations) 
      { 
        const hrefs = data.links
                       .filter(i =>{ return i.name === 'OrganizationDFF'; })
                       .map(urls => { return urls.href; });

        for(const link of hrefs) { 
            //console.log(link); 
            const flexFields = await organization.getFlexfields(cfg.hcmAPI, link);
            console.log(flexFields);
            organizationdb.updateFlexfield(cfg.dbConfig, flexFields);
        }
      }
});

app.get('/workstructures/jobFamilies', async (req, res) => {
    const jobFamilies = await job.getJobFamilies(cfg.hcmAPI);
    //console.log(jobFamilies);
    jobdb.setJobFamily(cfg.dbConfig, jobFamilies); 
});

app.get('/workstructures/jobs',  async (req, res) => { 
    const jobs = await job.getJobs(cfg.hcmAPI);
    //console.log(jobs);
    jobdb.setJob(cfg.dbConfig, jobs);
});

app.get('/workstructures/grades',  async (req, res) => { 
    const grades = await grade.getGrades(cfg.hcmAPI);
    //console.log(grades);
    gradedb.setGrade(cfg.dbConfig, grades);
    for(const data of grades) 
    { 
      const o = data.links.filter(i =>{ return i.name === 'steps'; })
                          .map(urls => { return urls.href; });
      for(const link of o) { 
          //console.log(link); 
          const steps = await grade.getSteps(cfg.hcmAPI, link);
          gradedb.setStep(cfg.dbConfig, data.GradeId, steps);
      }
    }
});

 app.get('/workstructures/gradeRates',  async (req, res) => { 
    const rates = await grade.getRates(cfg.hcmAPI);
    //console.log(rates);
    gradedb.setRate(cfg.dbConfig, rates);
    for(const data of rates) 
    { 
      const rvLinks = data.links.filter(i => { return i.name === 'rateValues'; })
                          .map(urls => { return urls.href; });
      for(const link of rvLinks) { 
          console.log(link); 
          const values = await grade.getRateValues(cfg.hcmAPI, link);
          //console.log(values);
          gradedb.setRateValue(cfg.dbConfig, values);
      }
    } 
});

app.get('/workstructures/positions', async (req, res) => {
    const positions = await position.getPositions(cfg.hcmAPI);
    //console.log(positions);
    positiondb.setPosition(cfg.dbConfig, positions);
    for(const data of positions) 
    { 
      const hrefs = data.links
                     .filter(i =>{ return i.name === 'PositionCustomerFlex'; })
                     .map(urls => { return urls.href; });

      for(const link of hrefs) { 
          //console.log(link); 
          const flexFields = await position.getFlexfields(cfg.hcmAPI, link);
          console.log(flexFields);
          positiondb.updateFlexfield(cfg.dbConfig, flexFields);
      }
    }
});

app.get('/employees', async (req, res) => {
    const employees = await employee.getEmployees(cfg.hcmAPI);
    console.log(employees);
    //employeedb.setPerson(cfg.dbConfig, employees);
    //employeedb.setEmployee(cfg.dbConfig, employees);
    for(const data of employees) 
    { 
      const hrefs = data.links
                     .filter(i =>{ return i.name === 'assignments'; })
                     .map(urls => { return urls.href; });

      for(const link of hrefs) { 
          console.log(link); 
          //const empAssignment = await employee.getAssignment(cfg.hcmAPI, link);
          //console.log(empAssignment);
          //employeedb.setAssignment(cfg.dbConfig, empAssignment);
      }
    }
});

app.get('/recuiting/candidates', async(req, res) => {

    const candidates = await employee.getCandidates(cfg.hcmAPI);
    //console.log(candidates); 
    employeedb.setCandidate(cfg.dbConfig, candidates);
});

app.listen(port, () => console.log('connecting to HCM End-points') );
