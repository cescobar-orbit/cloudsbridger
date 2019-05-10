'use strict'
const mssql = require('mssql');

const setJob = (ctx, job) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('JobId', mssql.BigInt, job.JobId);
        request.input('JobName', mssql.VarChar(240), job.Name);
        request.input('JobCode', mssql.VarChar(30), job.JobCode);
        request.input('JobFamilyId', mssql.BigInt, job.JobFamilyId);
        request.input('EffectiveStartDate', mssql.VarChar(30), job.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.VarChar(30), job.EffectiveEndDate);
        request.input('ActiveStatus', mssql.VarChar(30), job.ActiveStatus);
        request.input('SetId', mssql.BigInt, job.SetId);
        request.input('ManagerLevel', mssql.VarChar(30), job.ManagerLevel);
        request.input('ApprovalAuthority', mssql.Int, job.ApprovalAuthority);
        request.input('RegularTemporary', mssql.VarChar(30), job.RegularTemporary);
        request.input('MedicalCheckupRequired', mssql.VarChar(30), job.MedicalCheckupRequired);
        request.input('JobFunctionCode', mssql.VarChar(30), job.JobFunctionCode);
        request.input('FullPartTime', mssql.VarChar(30), job.FullPartTime);
        request.input('CreationDate', mssql.VarChar(30), job.CreationDate);
        request.input('LastUpdateDate', mssql.VarChar(30), job.LastUpdateDate);

        return request.query`usp_TALENTUS_INS_Job 
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

    }).then(result => {
        console.dir(result)
    }).catch(err => {
         console.error(err);
    });
}

const setJobFamily = (ctx, jobFamily) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('JobFamilyId', mssql.BigInt, jobFamily.JobFamilyId);
        request.input('JobFamilyName', mssql.VarChar(240), jobFamily.JobFamilyName);
        request.input('JobFamilyCode', mssql.VarChar(), jobFamily.JobFamilyCode);
        request.input('ActionReasonId', mssql.BigInt, jobFamily.ActionReasonId);
        request.input('ActiveStatus', mssql.VarChar(5), jobFamily.ActiveStatus);
        request.input('EffectiveStartDate', mssql.VarChar(30), jobFamily.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.VarChar(30), jobFamily.EffectiveEndDate);
        request.input('CreationDate', mssql.VarChar(30), jobFamily.CreationDate);
        request.input('LastUpdateDate', mssql.VarChar(30), jobFamily.LastUpdateDate);

        return request.query`usp_TALENTUS_INS_JobFamily 
                @JobFamilyId,
                @JobFamilyName, 
                @ActionReasonId,
                @ActiveStatus,
                @EffectiveStartDate,
                @EffectiveEndDate,
                @CreationDate,
                @LastUpdateDate`;

    }).then(result => {
        console.dir(result)
    }).catch(err => {
         console.error(err);
    });
}
 module.exports = {
     setJob: setJob,
     setJobFamily: setJobFamily
 }