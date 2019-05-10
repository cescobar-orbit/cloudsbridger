'use strict'
const mssql = require('mssql');


const setGrade = (ctx, grade) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('GradeId', mssql.BigInt, grade.GradeId);
        request.input('GradeCode', mssql.VarChar(120), grade.GradeCode);
        request.input('GradeName', mssql.VarChar(240), grade.GradeName);
        request.input('SetId', mssql.BigInt, grade.SetId);
        request.input('ActiveStatus', mssql.VarChar(30), grade.ActiveStatus);
        request.input('CategoryCode', mssql.VarChar(80), grade.CategoryCode);
        request.input('EffectiveStartDate', mssql.VarChar(10), grade.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.VarChar(10), grade.EffectiveEndDate);
        request.input('CreationDate', mssql.VarChar(30), grade.CreationDate);
        request.input('LastUpdateDate', mssql.VarChar(30), grade.LastUpdateDate);

        return request.query`usp_TALENTUS_INS_Grade 
                @GradeId, 
                @GradeCode,
                @GradeName,
                @SetId,
                @CategoryCode,
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

const setStep = (ctx, gradeId, step) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('GradeStepId', mssql.BigInt, step.GradeStepId);
        request.input('EffectiveStartDate', mssql.VarChar(10), step.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.VarChar(10), step.EffectiveEndDate);
        request.input('GradeStepName', mssql.VarChar(240), step.GradeStepName);
        request.input('GradeStepSequence', mssql.Int, step.GradeStepSequence);
        request.input('CeilingStepFlag', mssql.VarChar(5), step.CeilingStepFlag);
        request.input('GradeId', mssql.BigInt, gradeId);

        return request.query`usp_TALENTUS_INS_GradeStep
                @GradeStepId, 
                @GradeStepName,
                @GradeId,
                @CeilingStepFlag,
                @GradeStepSequence,
                @EffectiveStartDate,
                @EffectiveEndDate`;

    }).then(result => {
        console.dir(result)
    }).catch(err => {
         console.error(err);
    });
}
module.exports = {
    setGrade: setGrade,
    setStep: setStep
}

