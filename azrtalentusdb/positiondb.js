'use strict'
const mssql = require('mssql');

 
const setPosition = async (ctx, positions) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;
    
    try
    {
        const pool = await new mssql.ConnectionPool(config).connect();
        for(const position of positions)
            {
                const request = await pool.request()
                    .input('PositionId', mssql.BigInt, position.PositionId)
                    .input('PositionCode', mssql.VarChar(30), position.PositionCode)
                    .input('PositionName', mssql.VarChar(240), position.Name)
                    .input('PositionType', mssql.VarChar(30), position.PositionType)
                    .input('EffectiveStartDate', mssql.VarChar(10), position.EffectiveStartDate)
                    .input('EffectiveEndDate', mssql.VarChar(10), position.EffectiveEndDate)
                    .input('BusinessUnitId', mssql.BigInt, position.BusinessUnitId)
                    .input('DepartmentId', mssql.BigInt, position.DepartmentId)
                    .input('LocationId', mssql.BigInt, position.LocationId)
                    .input('JobId', mssql.BigInt, position.JobId)
                    .input('EntryGradeId', mssql.BigInt, position.EntryGradeId)
                    .input('EntryStepId', mssql.BigInt, position.EntryStepId)
                    .input('HeadCount', mssql.Int, position.HeadCount)
                    .input('RegularTemporary', mssql.VarChar(30), position.RegularTemporary)
                    .input('FTE', mssql.Int, position.FTE)
                    .input('HiringStatus', mssql.VarChar(30), position.Hiring)
                    .input('FullPartTime', mssql.VarChar(30), position.FullPartTime)
                    .input('OverlapAllowedFlag', mssql.VarChar(5), position.OverlapAllowedFlag)
                    .input('SeasonalFlag', mssql.VarChar(5), position.SeasonalFlag)
                    .input('SeasonalStartDate', mssql.VarChar(30), position.SeasonalStartDate)
                    .input('SeasonalEndDate', mssql.VarChar(30), position.SeasonalEndDate)
                    .input('ProbationPeriod', mssql.VarChar(30), position.ProbationPeriod)
                    .input('SecurityClearance', mssql.VarChar(30), position.CreationDate)
                    .input('CreationDate', mssql.VarChar(30), position.CreationDate)
                    .input('LastUpdateDate', mssql.VarChar(30), position.LastUpdateDate)
    
                const result = request.query`usp_TALENTUS_INS_Position 
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
                
                const promiseResult = Promise.resolve(result);
                promiseResult.then(function(value) {
                    console.log(value);
                }).catch(e => console.log(e));
            }

     return pool;
    } catch(err) {
       console.error(err);
    }    
}

const setPositionDFF = async (ctx,positionDFF) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;
    
    try
    {
        const pool = await new mssql.ConnectionPool(config).connect();
    
            const result = pool.request()
                .input('PositionId', mssql.BigInt, positionDFF.PositionId)
                .input('Station', mssql.VarChar(150), positionDFF.ESTACION)
                .input('BenefitProgram', mssql.VarChar(50), positionDFF.PROGBENEFPOS)
                .input('ClassificationCode', mssql.VarChar(200), positionDFF.TIPOPOSICION)
                .query`usp_TALENTUS_UDP_PositionFlexFields
                        @PositionId,
                        @Station, 
                        @BenefitProgram,
                        @ClassificationCode`;
            
            const promiseResult = Promise.resolve(result);
            promiseResult.then(function(value) {
                console.log(value);
            });
      return pool;

    } catch(err) {
       console.error(err);
    }    
}

module.exports = {
    setPosition: setPosition,
    setPositionDFF: setPositionDFF
}