'use strict'
const mssql = require('mssql');
const connector = require('./connection');

const setJob = async (ctx, jobs) => {
    try
    {
     const pool = await connector.getConnection(ctx);
     for(const job of jobs)
     {
        const result = await pool.request()
              .input('JobId', mssql.BigInt, job.JobId)
              .input('JobName', mssql.VarChar(240), job.Name)
              .input('JobCode', mssql.VarChar(30), job.JobCode)
              .input('JobFamilyId', mssql.BigInt, job.JobFamilyId)
              .input('EffectiveDate', mssql.VarChar(10), null)
              .input('EffectiveStartDate', mssql.VarChar(30), job.EffectiveStartDate)
              .input('EffectiveEndDate', mssql.VarChar(30), job.EffectiveEndDate)
              .input('ActiveStatus', mssql.VarChar(30), job.ActiveStatus)
              .input('SetId', mssql.BigInt, job.SetId)
              .input('ManagerLevel', mssql.VarChar(30), job.ManagerLevel)
              .input('ApprovalAuthority', mssql.Int, job.ApprovalAuthority)
              .input('RegularTemporary', mssql.VarChar(30), job.RegularTemporary)
              .input('MedicalCheckupRequired', mssql.VarChar(30), job.MedicalCheckupRequired)
              .input('JobFunctionCode', mssql.VarChar(30), job.JobFunctionCode)
              .input('FullPartTime', mssql.VarChar(30), job.FullPartTime)
              .input('CreationDate', mssql.VarChar(30), job.CreationDate)
              .input('LastUpdateDate', mssql.VarChar(30), job.LastUpdateDate)
              .query`usp_TALENTUS_INS_Job 
                        @JobId,
                        @JobName, 
                        @JobCode,
                        @JobFamilyId,                        
                        @EffectiveStartDate,
                        @EffectiveEndDate,
                        @EffectiveDate,
                        @ActiveStatus,
                        @SetId,
                        @ManagerLevel,
                        @ApprovalAuthority,
                        @RegularTemporary,
                        @MedicalCheckupRequired,
                        @JobFunctionCode,
                        @FullPartTime,
                        @CreationDate,
                        @LastUpdateDate`;

            Promise.resolve(result).then(value => { console.log(value); });                
     }
     return pool;
    } catch(e) { console.error(e); return Promise.reject(e); }  
}

const setJobFamily = async (ctx, JobFamilies) => {
    try
    {
      const pool = await connector.getConnection(ctx);
      for(const jobFamily of JobFamilies)
      {  
        const result = await pool.request()
                    .input('JobFamilyId', mssql.BigInt, jobFamily.JobFamilyId)
                    .input('JobFamilyName', mssql.VarChar(240), jobFamily.JobFamilyName)
                    .input('JobFamilyCode', mssql.VarChar(), jobFamily.JobFamilyCode)
                    .input('ActionReasonId', mssql.BigInt, jobFamily.ActionReasonId)
                    .input('ActiveStatus', mssql.VarChar(5), jobFamily.ActiveStatus)
                    .input('EffectiveStartDate', mssql.VarChar(30), jobFamily.EffectiveStartDate)
                    .input('EffectiveEndDate', mssql.VarChar(30), jobFamily.EffectiveEndDate)
                    .input('CreationDate', mssql.VarChar(30), jobFamily.CreationDate)
                    .input('LastUpdateDate', mssql.VarChar(30), jobFamily.LastUpdateDate)
                    .query`usp_TALENTUS_INS_JobFamily 
                            @JobFamilyId,
                            @JobFamilyName, 
                            @ActionReasonId,
                            @ActiveStatus,
                            @EffectiveStartDate,
                            @EffectiveEndDate,
                            @CreationDate,
                            @LastUpdateDate`;

            Promise.resolve(result).then(value => { console.log(value); });
      }
      return pool;
    }catch(e) { console.error(e); }
}
 
    module.exports = {
     setJob: setJob,
     setJobFamily: setJobFamily
 }