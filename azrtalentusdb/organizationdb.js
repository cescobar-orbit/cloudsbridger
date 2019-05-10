'use strict'
const mssql = require('mssql');

 
const setOrganization = (ctx, organization) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;
    

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('OrganizationId', mssql.BigInt, organization.OrganizationId);
        request.input('OrganizationCode', mssql.VarChar(120), organization.OrgCode);
        request.input('Status', mssql.VarChar(120), organization.Status);
        request.input('OrganizationName', mssql.VarChar(60), organization.Name);
        request.input('ClassificationCode', mssql.VarChar(255), organization.ClassificationCode);
        request.input('LocationId', mssql.BigInt, organization.LocationId);
        request.input('InternalAddressLine', mssql.VarChar(80), organization.IntetnalAddressLine);
        request.input('EffectiveStartDate', mssql.VarChar(10), organization.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.VarChar(10), organization.EffectiveEndDate);
        request.input('CreationDate', mssql.VarChar(30), organization.CreationDate);
        request.input('LastUpdateDate', mssql.VarChar(30), organization.LastUpdateDate);
      
        return request.query`usp_TALENTUS_INS_Organization 
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

    }).then(result => {
        console.dir(result)
    }).catch(err => {
         console.error(err);
    });
}

module.exports = {
    setOrganization: setOrganization
}