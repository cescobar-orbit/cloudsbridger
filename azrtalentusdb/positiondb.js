'use strict'
const mssql = require('mssql');
const connector = require('./connection');
 
const setPosition = async (ctx, pos) => {
    
    try
    {   
        const pool = await connector.getConnection(ctx);
        //for(const pos of positions)
          //{
             console.log(pos);
             const request = await pool.request()
                    .input('PositionId', mssql.BigInt, pos.PositionId)
                    .input('PositionCode', mssql.VarChar(30), pos.PositionCode)
                    .input('PositionName', mssql.VarChar(240), pos.Name)
                    .input('PositionType', mssql.VarChar(30), pos.PositionType)
                    .input('EffectiveStartDate', mssql.VarChar(10), pos.EffectiveStartDate)
                    .input('EffectiveEndDate', mssql.VarChar(10), pos.EffectiveEndDate)
                    .input('BusinessUnitId', mssql.BigInt, pos.BusinessUnitId)
                    .input('DepartmentId', mssql.BigInt, pos.DepartmentId)
                    .input('LocationId', mssql.BigInt, pos.LocationId)
                    .input('JobId', mssql.BigInt, pos.JobId)
                    .input('EntryGradeId', mssql.BigInt, pos.EntryGradeId)
                    .input('EntryStepId', mssql.BigInt, pos.EntryStepId)
                    .input('HeadCount', mssql.Int, pos.HeadCount)
                    .input('RegularTemporary', mssql.VarChar(30), pos.RegularTemporary)
                    .input('FTE', mssql.Int, pos.FTE)
                    .input('HiringStatus', mssql.VarChar(30), pos.Hiring)
                    .input('FullPartTime', mssql.VarChar(30), pos.FullPartTime)
                    .input('OverlapAllowedFlag', mssql.VarChar(5), pos.OverlapAllowedFlag)
                    .input('SeasonalFlag', mssql.VarChar(5), pos.SeasonalFlag)
                    .input('SeasonalStartDate', mssql.VarChar(30), pos.SeasonalStartDate)
                    .input('SeasonalEndDate', mssql.VarChar(30), pos.SeasonalEndDate)
                    .input('ProbationPeriod', mssql.VarChar(30), pos.ProbationPeriod)
                    .input('SecurityClearance', mssql.VarChar(30), pos.CreationDate)
                    .input('CreationDate', mssql.VarChar(30), pos.CreationDate)
                    .input('LastUpdateDate', mssql.VarChar(30), pos.LastUpdateDate)
    
             const result = await request.query`usp_TALENTUS_INS_Position 
                        @PositionId,
                        @PositionCode, 
                        @PositionName,
                        @PositionType,
                        @EffectiveStartDate,
                        @EffectiveEndDate,
                        @BusinessUnitId,
                        @DepartmentId,
                        @LocationId,
                        @JobId,
                        @EntryGradeId,
                        @EntryStepId,
                        @HeadCount,
                        @RegularTemporary,
                        @FTE,
                        @HiringStatus,
                        @FullPartTime,
                        @OverlapAllowedFlag,
                        @SeasonalFlag,
                        @SeasonalStartDate,
                        @SeasonalEndDate,
                        @ProbationPeriod,
                        @SecurityClearance,
                        @CreationDate,
                        @LastUpdateDate`;
                
             Promise.resolve(result).then(value => { console.log(value); });
            //}
      return pool;
    } catch(err) {
       console.error(err);
    }    
}

const setPositionCustomerFlex = async (ctx, position) => {    
    try
    {
        const pool = await connector.getConnection(ctx); 
        
        //for(const position of positions)
         //{
          const positionDFF = position.PositionCustomerFlex[0];
          let benefitPlanName = positionDFF.LVVO_PROGBENEFPOS.filter( i => { return i.Value == positionDFF.PROGBENEFPOS});
          if(benefitPlanName.length = 0){
            benefitPlanName = [];
            benefitPlanName.push({Description: ''});
          }
            
          const result = await pool.request()
                .input('PositionId', mssql.BigInt, positionDFF.PositionId)
                .input('Station', mssql.VarChar(150), positionDFF.ESTACION)
                .input('BenefitPlanCode', mssql.VarChar(50), positionDFF.PROGBENEFPOS)
                .input('BenefitPlanName', mssql.VarChar(100), benefitPlanName.Description)
                .input('ClassificationCode', mssql.VarChar(200), positionDFF.TIPOPOSICION)
                .input('RiskLevel', mssql.VarChar(100), positionDFF.CLASIFRIESGO)
                .query`usp_TALENTUS_UDP_PositionCustomerFlex
                        @PositionId,
                        @Station, 
                        @BenefitPlanCode,
                        @BenefitPlanName,
                        @ClassificationCode,
                        @RiskLevel`;
            
            Promise.resolve(result).then(value => { console.log(value) });
        //}
      return pool;
    } catch(err) {
       console.error(err);
       //return Promise.reject(err);
    }    
}

module.exports = {
    setPosition: setPosition,
    setPositionCustomerFlex: setPositionCustomerFlex
}