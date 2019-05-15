'use strict'
const mssql = require('mssql');


const setGrade = async (ctx, grades) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    try{
      const pool =  await new mssql.ConnectionPool(config).connect();
      for(const grade of grades)
      {
        const result = pool.request()
              .input('GradeId', mssql.BigInt, grade.GradeId)
              .input('GradeCode', mssql.VarChar(120), grade.GradeCode)
              .input('GradeName', mssql.VarChar(240), grade.GradeName)
              .input('SetId', mssql.BigInt, grade.SetId)
              .input('ActiveStatus', mssql.VarChar(30), grade.ActiveStatus)
              .input('CategoryCode', mssql.VarChar(80), grade.CategoryCode)
              .input('EffectiveStartDate', mssql.VarChar(10), grade.EffectiveStartDate)
              .input('EffectiveEndDate', mssql.VarChar(10), grade.EffectiveEndDate)
              .input('CreationDate', mssql.VarChar(30), grade.CreationDate)
              .input('LastUpdateDate', mssql.VarChar(30), grade.LastUpdateDate)
              .query`usp_TALENTUS_INS_Grade 
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
            
            const promiseResult = Promise.resolve(result);
                  promiseResult.then(function(value) {
                    console.log(value);
                  });
        }
    } catch(e) { console.error(e); }
}

const setStep = async (ctx, gradeId, steps) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    try 
    {
     const pool =  await new mssql.ConnectionPool(config).connect();        
     for(const step of steps)
     {
      const result = pool.request()
         .input('GradeStepId', mssql.BigInt, step.GradeStepId)
         .input('EffectiveStartDate', mssql.VarChar(10), step.EffectiveStartDate)
         .input('EffectiveEndDate', mssql.VarChar(10), step.EffectiveEndDate)
         .input('GradeStepName', mssql.VarChar(240), step.GradeStepName)
         .input('GradeStepSequence', mssql.Int, step.GradeStepSequence)
         .input('CeilingStepFlag', mssql.VarChar(5), step.CeilingStepFlag)
         .input('GradeId', mssql.BigInt, gradeId)
         .query`usp_TALENTUS_INS_GradeStep
                @GradeStepId, 
                @GradeStepName,
                @GradeId,
                @CeilingStepFlag,
                @GradeStepSequence,
                @EffectiveStartDate,
                @EffectiveEndDate`;
         console.dir(Promise.resolve(result));
     }
     const promiseResult = Promise.resolve(result);
     promiseResult.then(function(value) {
         console.log(value);
     });
   } catch(e) { console.error(e); } 
}

module.exports = {
    setGrade: setGrade,
    setStep: setStep
}

