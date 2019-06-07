'use strict'
const mssql = require('mssql');


const setLocation = async (ctx, location) => {
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
                .input('LocationId', mssql.BigInt, location.LocationId)
                .input('LocationCode', mssql.VarChar(120), location.LocationCode)
                .input('LocationName', mssql.VarChar(60), location.LocationName)
                .input('Description', mssql.VarChar(255), location.Description)
                .input('EffectiveStartDate', mssql.VarChar(10), location.EffectiveStartDate)
                .input('EffectiveEndDate', mssql.VarChar(10), location.EffectiveDate)
                .input('SetId', mssql.BigInt, location.SetId)
                .input('TelephoneNumber1', mssql.VarChar(50), location.TelephoneNumber1)
                .input('TelephoneNumber2', mssql.VarChar(50), location.TelephoneNumber2)
                .input('TelephoneNumber3', mssql.VarChar(50), location.TelephoneNumber3)
                .input('EmailAddress', mssql.VarChar(50), location.EmailAddress)
                .input('ShipToSiteFlag', mssql.VarChar(5), location.ShipToSiteFlag)
                .input('ReceivingSiteFlag', mssql.VarChar(5), location.ReceivingSiteFlag)
                .input('BillToSiteFlag', mssql.VarChar(5), location.BillToSiteFlag)
                .input('OfficeSiteFlag', mssql.VarChar(5), location.OfficeSiteFlag)
                .input('MainAddressId', mssql.BigInt, location.MainAddressId)
                .input('AddressLine1', mssql.VarChar(255), location.AddressLine1)
                .input('AddressLine2', mssql.VarChar(255), location.AddressLine2)
                .input('AddressLine3', mssql.VarChar(255), location.AddressLine3)
                .input('AddressLine4', mssql.VarChar(255), location.AddressLine4)
                .input('Country', mssql.VarChar(60), location.Country)
                .input('PostalCode', mssql.VarChar(30), location.PostalCode)
                .input('Region1', mssql.VarChar(50), location.Region1)
                .input('Region2', mssql.VarChar(50), location.Region2)
                .input('Region3', mssql.VarChar(50), location.Region3)
                .input('TownOrCity', mssql.VarChar(30), location.TownOrCity)
                .input('CreationDate', mssql.VarChar(30), location.CreationDate)
                .input('LastUpdateDate', mssql.VarChar(30), location.LastUpdateDate)
                .query`usp_TALENTUS_INS_Location 
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

            Promise.resolve(result).then(function(value) {
                console.log(value);
            });
    
       return pool;
    } catch(e) { console.error(e); }
}

module.exports = {
    setLocation: setLocation
}