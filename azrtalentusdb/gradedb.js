'use strict'
const mssql = require('mssql');


const setGrade = async (ctx, grade) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    try{
      const pool =  await new mssql.ConnectionPool(config).connect();
      
        const result = await pool.request()
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
            
            Promise.resolve(result).then(function(value) { console.log(value); });
        
    return pool;
    } catch(e) { console.error(e); return Promise.reject(e); }
}

const setStep = async (ctx, gradeId, step) => {
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
console.log(gradeId);     
      const result = await pool.request()
         .input('GradeId', mssql.BigInt, gradeId)
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
      
        Promise.resolve(result).then(function(value) { console.log(value); });
  
        return pool;
   } catch(e) { console.error(e); return Promise.reject(e); } 
}


const setRate = async (ctx, rate) => {
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
   
    const result = await pool.request()
       .input('RateId', mssql.BigInt, rate.RateId)
       .input('EffectiveStartDate', mssql.VarChar(10), rate.EffectiveStartDate)
       .input('EffectiveEndDate', mssql.VarChar(10), rate.EffectiveEndDate)
       .input('LegislativeDataGroupId', mssql.BigInt, rate.LegislativeDataGroupId)
       .input('RateType', mssql.VarChar(20), rate.RateType)
       .input('GradeRateName', mssql.VarChar(240), rate.GradeRateName)
       .input('CurrencyCode', mssql.VarChar(15), rate.CurrencyCode)
       .input('ActionReasonCode', mssql.VarChar(255),rate.ActionReasonCode)
       .input('ActiveStatus', mssql.VarChar(30), rate.ActiveStatus)
       .input('AnnualizationFactor', mssql.Int, rate.AnnualizationFactor)
       .input('RateFrequency', mssql.VarChar(30), rate.RateFrequency)
       .query`usp_TALENTUS_INS_GradeRate
              @RateId,
              @RateType,
              @RateFrequency,
              @GradeRateName,
              @ActiveStatus,
              @ActionReasonCode,
              @AnnualizationFactor,
              @CurrencyCode,
              @EffectiveStartDate,
              @EffectiveEndDate,
              @LegislativeDataGroupId`;
              
      Promise.resolve(result).then(function(value) { console.log(value); });   
   
  return pool;
 } catch(e) { console.error(e); return Promise.reject(e); } 

}


const setRateValue = async (ctx, rateValues) => {
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
   for(const rateValue of rateValues)
   {
    const result = await pool.request()
       .input('RateValueId', mssql.BigInt, rateValue.RateValueId)
       .input('EffectiveStartDate', mssql.VarChar(10), rateValue.EffectiveStartDate)
       .input('EffectiveEndDate', mssql.VarChar(10), rateValue.EffectiveEndDate)
       .input('GradeId', mssql.BigInt, rateValue.GradeId)
       .input('MinimumAmount', mssql.Decimal(18,2), rateValue.MinimumAmount)
       .input('MaximumAmount', mssql.Decimal(18,2), rateValue.MaximumAmout)
       .input('MidValueAmount', mssql.Decimal(18,2), rateValue.MidValueAmount)
       .input('ValueAmount', mssql.Decimal(18,2), rateValue.ValueAmount)
       .query`usp_TALENTUS_INS_RateValue
              @RateValueId,
              @GradeId,
              @ValueAmount,
              @MinimumAmount,
              @MaximumAmount,
              @MidValueAmount,
              @EffectiveStartDate,
              @EffectiveEndDate`;
              
      Promise.resolve(result).then(function(value) { console.log(value); });   
   }
   return pool;
 } catch(e) { console.error(e); Promise.reject(e); } 

}

module.exports = {
    setGrade: setGrade,
    setStep: setStep,
    setRate: setRate,
    setRateValue: setRateValue
}

