'use strict'
const mssql = require('mssql');
const connector = require('./connection');
 
const setOrganization = async (ctx, org) => {
      
    try
    {
     const pool = await connector.getConnection(ctx);
     //for(const organization of organizations)
     //{
       const result = await pool.request()
                         .input('OrganizationId', mssql.BigInt, org.OrganizationId)
                         .input('OrganizationCode', mssql.VarChar(120), org.OrgCode)
                         .input('Status', mssql.VarChar(120), org.Status)
                         .input('OrganizationName', mssql.VarChar(60), org.Name)
                         .input('ClassificationCode', mssql.VarChar(255), org.ClassificationCode)
                         .input('LocationId', mssql.BigInt, org.LocationId)
                         .input('InternalAddressLine', mssql.VarChar(80), org.IntetnalAddressLine)
                         .input('EffectiveStartDate', mssql.VarChar(10), org.EffectiveStartDate)
                         .input('EffectiveEndDate', mssql.VarChar(10), org.EffectiveEndDate)
                         .input('CreationDate', mssql.VarChar(30), org.CreationDate)
                         .input('LastUpdateDate', mssql.VarChar(30), org.LastUpdateDate)
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
        
        Promise.resolve(result).then(value => { console.log(value); });                           
     //}
     return pool;
    } catch(e) { console.error(e); return Promise.reject(err);} 
}

const setOrganizationDFF = async (ctx, orgFlex) => {
  try
  {
   const pool = await connector.getConnection(ctx);
   //for(const field of orgFlex)
   //{
     const result = await pool.request()
                       .input('OrganizationId', mssql.BigInt, orgFlex.OrganizationId)
                       .input('CostCenter', mssql.VarChar(50), orgFlex.CENTROCOSTOS2)
                       .input('AreaCode', mssql.VarChar(50), orgFlex.AREA2)
                       .input('AreaDesc', mssql.VarChar(100), orgFlex.AreaDesc)
                       .input('AreaValueId', mssql.BigInt, orgFlex.AreaValueId)

                       .query`usp_TALENTUS_UDP_OrganizationDFF 
                                  @OrganizationId,
                                  @CostCenter, 
                                  @AreaCode,
                                  @AreaDesc,
                                  @AreaValueId`;
      
      Promise.resolve(result).then( value => { console.log(value); });                           
   //} 
    return pool;
  } catch(e) { console.error(e); return Promise.reject(e);} 
}


const setDepartmentTree = async (ctx, departmentNodes) => {
  try
  {
   const pool = await connector.getConnection();

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
      
      Promise.resolve(result).then(function(value) { console.log(value); });                           
    }
    pool.close();
  } catch(e) { console.error(e); return Promise.reject(err);} 
}

module.exports = {
    setOrganization: setOrganization,
    setOrganizationDFF: setOrganizationDFF,
    setDepartmentTree: setDepartmentTree
}