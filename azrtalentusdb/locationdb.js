'use strict'
const mssql = require('mssql');
const connector = require('./connection');

const setLocation = async (ctx, locations) => {
  
    try
    {
        const pool = await connector.getConnection(ctx);
        for(const loc of locations)
        {  
            const result = await pool.request()
                .input('LocationId', mssql.BigInt, loc.LocationId)
                .input('LocationCode', mssql.VarChar(120), loc.LocationCode)
                .input('LocationName', mssql.VarChar(60), loc.LocationName)
                .input('Description', mssql.VarChar(255), loc.Description)
                .input('EffectiveStartDate', mssql.VarChar(10), loc.EffectiveStartDate)
                .input('EffectiveEndDate', mssql.VarChar(10), loc.EffectiveDate)
                .input('SetId', mssql.BigInt, loc.SetId)
                .input('TelephoneNumber1', mssql.VarChar(50), loc.TelephoneNumber1)
                .input('TelephoneNumber2', mssql.VarChar(50), loc.TelephoneNumber2)
                .input('TelephoneNumber3', mssql.VarChar(50), loc.TelephoneNumber3)
                .input('EmailAddress', mssql.VarChar(50), loc.EmailAddress)
                .input('ShipToSiteFlag', mssql.VarChar(5), loc.ShipToSiteFlag)
                .input('ReceivingSiteFlag', mssql.VarChar(5), loc.ReceivingSiteFlag)
                .input('BillToSiteFlag', mssql.VarChar(5), loc.BillToSiteFlag)
                .input('OfficeSiteFlag', mssql.VarChar(5), loc.OfficeSiteFlag)
                .input('MainAddressId', mssql.BigInt, loc.MainAddressId)
                .input('AddressLine1', mssql.VarChar(255), loc.AddressLine1)
                .input('AddressLine2', mssql.VarChar(255), loc.AddressLine2)
                .input('AddressLine3', mssql.VarChar(255), loc.AddressLine3)
                .input('AddressLine4', mssql.VarChar(255), loc.AddressLine4)
                .input('Country', mssql.VarChar(60), loc.Country)
                .input('PostalCode', mssql.VarChar(30), loc.PostalCode)
                .input('Region1', mssql.VarChar(50), loc.Region1)
                .input('Region2', mssql.VarChar(50), loc.Region2)
                .input('Region3', mssql.VarChar(50), loc.Region3)
                .input('TownOrCity', mssql.VarChar(30), loc.TownOrCity)
                .input('CreationDate', mssql.VarChar(30), loc.CreationDate)
                .input('LastUpdateDate', mssql.VarChar(30), loc.LastUpdateDate)
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

            Promise.resolve(result).then(value => {console.log(value); });
        }      
       return pool;
    } catch(e) { console.error(e); }
}

module.exports = {
    setLocation: setLocation
}