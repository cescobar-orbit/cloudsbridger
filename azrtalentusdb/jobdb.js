'use strict'
const mssql = require('mssql');

const setJob = async (ctx, jobs) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;


    const pool = await new mssql.ConnectionPool(config).connect();
    for(const job of jobs)
    {   
        const result = pool.request()
              .input('JobId', mssql.BigInt, job.JobId)
              .input('JobName', mssql.VarChar(240), job.Name)
              .input('JobCode', mssql.VarChar(30), job.JobCode)
              .input('JobFamilyId', mssql.BigInt, job.JobFamilyId)
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

        console.dir(Promise.resolve(result));                
    }
}

const setJobFamily = async (ctx, JobFamilies) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    const pool = await new mssql.ConnectionPool(config).connect();
    for(const jobFamily of jobFamilies)
    {
        const request = pool.request()
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

        console.dir(Promise.resolve(result.recordset));
    }
}
 module.exports = {
     setJob: setJob,
     setJobFamily: setJobFamily
 }