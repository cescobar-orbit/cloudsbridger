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
    
    try
    {
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
        
        const promiseResult = Promise.resolve(result);
              promiseResult.then(function(value) {
                            console.log(value);
              });                           
      }
     return pool;
    } catch(e) { console.error(e); } 
}

const updateFlexfield = async (ctx, orgFlexfields) => {
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
   for(const flexField of orgFlexfields)
   {
     const result = await pool.request()
                       .input('OrganizationId', mssql.BigInt, flexField.OrganizationId)
                       .input('CostCenter', mssql.VarChar(50), flexField.CENTROCOSTOS2)
                       .input('Area', mssql.VarChar(50), flexField.AREA2)
                       .query`usp_TALENTUS_UDP_OrgFlexFields 
                                  @OrganizationId,
                                  @CostCenter, 
                                  @Area`;
      
      const promiseResult = Promise.resolve(result);
            promiseResult.then(function(value) {
                          console.log(value);
            });                           
    }
    return pool;
  } catch(e) { console.error(e); } 
}


const setDepartmentTree = async (ctx, departmentNodes) => {
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

   for(const department of departmentNodes)
   {
     const result = await pool.request()
                       .input('DepartmentId', mssql.BigInt, department.DepartmentId[0])
                       .input('DepartmentName', mssql.VarChar(150), department.DepartmentName[0])
                       .input('ParentDepartmentId', mssql.BigInt, department.ParentDepartmentId[0])
                       .input('ParentDepartmentName', mssql.VarChar(150), department.ParentDepartmentName[0]) 
                       .query`usp_TALENTUS_INS_DepartmentTree
                                  @DepartmentId,
                                  @DepartmentName,
                                  @ParentDepartmentId,
                                  @ParentDepartmentName`;
      
      const promiseResult = Promise.resolve(result);
            promiseResult.then(function(value) {
                          console.log(value);
            });                           
    }
    return pool;
  } catch(e) { console.error(e); } 
}

module.exports = {
    setOrganization: setOrganization,
    updateFlexfield: updateFlexfield,
    setDepartmentTree: setDepartmentTree
}