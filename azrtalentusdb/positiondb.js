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
        for(const pos of positions)
            {
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
                
             Promise.resolve(result).then(value => { console.log(value); });
            }
      return pool;
    } catch(err) {
       console.error(err);
    }    
}

const setPositionCustomerFlex = async (ctx, positions) => {
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
         const positionDFF = position.PositionCustomerFlex[0];
         const result = pool.request()
                .input('PositionId', mssql.BigInt, positionDFF.PositionId)
                .input('Station', mssql.VarChar(150), positionDFF.ESTACION)
                .input('BenefitProgram', mssql.VarChar(50), positionDFF.PROGBENEFPOS)
                .input('ClassificationCode', mssql.VarChar(200), positionDFF.TIPOPOSICION)
                .query`usp_TALENTUS_UDP_PositionCustomerFlex
                        @PositionId,
                        @Station, 
                        @BenefitProgram,
                        @ClassificationCode`;
            
            Promise.resolve(result).then(function(value) { console.log(value); });
        }
      return pool;
    } catch(err) {
       console.error(err);
    }    
}

module.exports = {
    setPosition: setPosition,
    setPositionDFF: setPositionCustomerFlex
}