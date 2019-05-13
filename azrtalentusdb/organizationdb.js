'use strict'
const mssql = require('mssql');

 
const setOrganization = async (ctx, organizations) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;
    
    const pool = await new mssql.ConnectionPool(config).connect();
    for(const organization of organizations)
    {
       const result = await pool.request()
                         .input('OrganizationId', mssql.BigInt, organization.OrganizationId)
                         .input('OrganizationCode', mssql.VarChar(120), organization.OrgCode)
                         .input('Status', mssql.VarChar(120), organization.Status)
                         .input('OrganizationName', mssql.VarChar(60), organization.Name)
                         .input('ClassificationCode', mssql.VarChar(255), organization.ClassificationCode)
                         .input('LocationId', mssql.BigInt, organization.LocationId)
                         .input('InternalAddressLine', mssql.VarChar(80), organization.IntetnalAddressLine)
                         .input('EffectiveStartDate', mssql.VarChar(10), organization.EffectiveStartDate)
                         .input('EffectiveEndDate', mssql.VarChar(10), organization.EffectiveEndDate)
                         .input('CreationDate', mssql.VarChar(30), organization.CreationDate)
                         .input('LastUpdateDate', mssql.VarChar(30), organization.LastUpdateDate)
                         .query`usp_TALENTUS_INS_Organization 
                                    @OrganizationId,
                                    @OrganizationCode, 
                                    @OrganizationName,
                                    @ClassificationCode,
                                    @Status,
                                    @LocationId,
                                    @InternalAddressLine,
                                    @EffectiveStartDate,
                                    @EffectiveEndDate,
                                    @CreationDate,
                                    @LastUpdateDate`;
        console.dir(Promise.resolve(result));                            
    }
}

module.exports = {
    setOrganization: setOrganization
}