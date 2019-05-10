'use strict'
const mssql = require('mssql');

 

const setLocation = (ctx, location) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

    new mssql.ConnectionPool(config).connect().then(pool => {
        const request = pool.request();
        request.input('LocationId', mssql.BigInt, location.LocationId);
        request.input('LocationCode', mssql.VarChar(120), location.LocationCode);
        request.input('LocationName', mssql.VarChar(60), location.LocationName);
        request.input('Description', mssql.VarChar(255), location.Description);
        request.input('EffectiveStartDate', mssql.Date, location.EffectiveStartDate);
        request.input('EffectiveEndDate', mssql.Date, location.EffectiveDate);
        request.input('SetId', mssql.BigInt, location.SetId);
        request.input('TelephoneNumber1', mssql.VarChar(50), location.TelephoneNumber1);
        request.input('TelephoneNumber2', mssql.VarChar(50), location.TelephoneNumber2);
        request.input('TelephoneNumber3', mssql.VarChar(50), location.TelephoneNumber3);
        request.input('EmailAddress', mssql.VarChar(50), location.EmailAddress);
        request.input('ShipToSiteFlag', mssql.VarChar(5), location.ShipToSiteFlag);
        request.input('ReceivingSiteFlag', mssql.VarChar(5), location.ReceivingSiteFlag);
        request.input('BillToSiteFlag', mssql.VarChar(5), location.BillToSiteFlag);
        request.input('OfficeSiteFlag', mssql.VarChar(5), location.OfficeSiteFlag);
        request.input('MainAddressId', mssql.BigInt, location.MainAddressId);
        request.input('AddressLine1', mssql.VarChar(255), location.AddressLine1);
        request.input('AddressLine2', mssql.VarChar(255), location.AddressLine2);
        request.input('AddressLine3', mssql.VarChar(255), location.AddressLine3);
        request.input('AddressLine4', mssql.VarChar(255), location.AddressLine4);
        request.input('Country', mssql.VarChar(60), location.Country);
        request.input('PostalCode', mssql.VarChar(30), location.PostalCode);
        request.input('Region1', mssql.VarChar(50), location.Region1);
        request.input('Region2', mssql.VarChar(50), location.Region2);
        request.input('Region3', mssql.VarChar(50), location.Region3);
        request.input('TownOrCity', mssql.VarChar(30), location.TownOrCity);
        request.input('CreationDate', mssql.VarChar(30), location.CreationDate);
        request.input('LastUpdateDate', mssql.VarChar(30), location.LastUpdateDate);

        return request.query`usp_TALENTUS_INS_Location 
         @LocationId, 
         @LocationName,
         @LocationCode,
         @Description,
         @EffectiveStartDate,
         @EffectiveEndDate,
         @SetId,
         @TelephoneNumber1,
         @TelephoneNumber2,
         @TelephoneNumber3,
         @EmailAddress,
         @ShipToSiteFlag,
         @ReceivingSiteFlag,
         @BillToSiteFlag,
         @OfficeSiteFlag,
         @MainAddressId,
         @AddressLine1,
         @AddressLine2,
         @AddressLine3,
         @AddressLine4,
         @Country,
         @PostalCode,
         @Region1,
         @Region2,
         @Region3,
         @TownOrCity,
         @CreationDate,
         @LastUpdateDate`;
    }).then(result => {
        console.dir(result)
    }).catch(err => {
         console.error(err);
    });
}


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

module.exports = {
    setLocation: setLocation,
    setOrganization: setOrganization,
    setJob: setJob
}