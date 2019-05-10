const express = require('express');
const app = express();
const fs = require('fs');
const location = require('./services/locations');
const organization = require('./services/organizations');
const job = require('./services/jobs');
const grade = require('./services/grades');
//const azrtalentusdb = require('./azrtalentusdb');
const organizationdb = require('./azrtalentusdb/organizationdb');
const locationdb = require('./azrtalentusdb/locationdb');
const jobdb = require('./azrtalentusdb/jobdb');
const gradedb = require('./azrtalentusdb/gradedb');
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
    for(const data of locations) { locationdb.setLocation(cfg.dbConfig, data);  }
});

app.get('/workstructures/organizations',  async (req, res) => { 
      const organizations = await organization.getOrganizations(cfg.hcmAPI);
      //console.log(organizations);
      for(const data of organizations) { organizationdb.setOrganization(cfg.dbConfig, data);  }      
});

app.get('/workstructures/jobFamilies', async (req, res) => {
    const jobFamilies = await job.getJobFamilies(cfg.hcmAPI);
    //console.log(jobFamilies);
    for(const data of jobFamilies) { jobdb.setJobFamily(cfg.dbConfig, data); }
});

app.get('/workstructures/jobs',  async (req, res) => { 
    const jobs = await job.getJobs(cfg.hcmAPI);
    //console.log(jobs);
    for(const data of jobs) { jobdb.setJob(cfg.dbConfig, data);  }
});

app.get('/workstructures/grades',  async (req, res) => { 
    const grades = await grade.getGrades(cfg.hcmAPI);
    //console.log(jobs);
    for(const data of grades) 
    { 
      gradedb.setGrade(cfg.dbConfig, data);
      const o = data.links.filter(i =>{ return i.name === 'steps'; })
                          .map(urls => { return urls.href; });
      for(const link of o) { 
          //console.log(link); 
          const steps = await grade.getSteps(cfg.hcmAPI, link);
          for(const stepItem of steps) { gradedb.setStep(cfg.dbConfig, data.GradeId, stepItem); }
      }
  }
});

app.listen(port, () => console.log('connecting to HCM End-points') );
