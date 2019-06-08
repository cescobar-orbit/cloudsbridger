'use strict'
const mssql = require('mssql');

 
const setPerson = async (ctx, employees) => {
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
     for(const person of employees)
     {
       const result = await pool.request()
                         .input('PersonId', mssql.BigInt, person.PersonId)
                         .input('PersonNumber', mssql.VarChar(30), person.PersonNumber)
                         .input('FirstName', mssql.VarChar(150), person.FirstName)
                         .input('MiddleName', mssql.VarChar(80), person.MiddleName)
                         .input('LastName', mssql.VarChar(150), person.LastName)
                         .input('PreviousLastName', mssql.VarChar(150), person.PreviousLastName)
                         .input('NameSuffix', mssql.VarChar(80), person.NameSuffix)
                         .input('Salutation', mssql.VarChar(30), person.Salutation)
                         .input('DisplayName', mssql.VarChar(240), person.DisplayName)
                         .input('PreferredName', mssql.VarChar(80), person.PreferredName)
                         .input('City', mssql.VarChar(30), person.City)
                         .input('Region', mssql.VarChar(120), person.Region)
                         .input('Region2', mssql.VarChar(120), person.Region2)
                         .input('Country', mssql.VarChar(60), person.Country)
                         .input('PostalCode', mssql.VarChar(30), person.PostalCode)
                         .input('DateOfBirth', mssql.VarChar(10), person.DateOfBirth)
                         .input('Ethnicity', mssql.VarChar(30), person.Ethnicity)
                         .input('Gender', mssql.VarChar(30), person.Gender)
                         .input('MaritalStatus', mssql.VarChar(30), person.MaritalStatus)
                         .input('NationalId', mssql.BigInt, person.NationalId)
                         .input('NationalIdCountry', mssql.VarChar(30), person.NationalIdCountry)
                         .input('NationalIdType', mssql.BigInt, person.NationalIdType)
                         .input('NationalIdExpirationDate', mssql.VarChar(10), person.NationalIdExpirationDate)
                         .input('AddressLine1', mssql.VarChar(240), person.AddressLine1)
                         .input('AddressLine2', mssql.VarChar(240), person.AddressLine2)
                         .input('AddressLine3', mssql.VarChar(240), person.AddressLine3)
                         .input('CitizenshipId', mssql.BigInt, person.CitizenshipId)
                         .input('CitizenshipStatus', mssql.VarChar(30) , person.CitizenshipStatus)
                         .input('CitizenshipLegislationCode', mssql.VarChar(30), person.CitizenshipLegislationCode)
                         .input('CitizenshipToDate', mssql.VarChar(10), person.CitizenshipToDate)
                         .input('PassportIssueDate', mssql.VarChar(10), person.PassportIssueDate)
                         .input('PassportNumber', mssql.VarChar(50), person.PassportNumber)
                         .input('PassportIssuingCountry', mssql.VarChar(30), person.PassportIssuingCountry)
                         .input('PassportId', mssql.BigInt, person.PassportId)
                         .input('PassportExpirationDate', mssql.VarChar(10), person.PassportExpirationDate)
                         .input('LicenceNumber', mssql.VarChar(150), person.LicenseNumber)
                         .input('DirversLicenseIssuingCountry', mssql.VarChar(30), person.DriversLicenseIssuingCountry)
                         .input('DriversLicenseExpirationDate', mssql.VarChar(10), person.DriversLicenseExpirationDate)
                         .input('DriversLicenseIssuingCountry', mssql.VarChar(30), person.DriversLicenseIssuingCountry)
                         .input('DriversLicenseId', mssql.BigInt, person.DriversLicenseId)
                         .input('MilitaryVetStatus', mssql.VarChar(30), person.MilitaryVetStatus)
                         .input('HomePhoneCountryCode', mssql.VarChar(100), person.HomePhoneCountryCode)
                         .input('HomePhoneAreaCode', mssql.VarChar(30), person.HomePhoneAreaCode)
                         .input('HomePhoneNumber', mssql.VarChar(60), person.HomePhoneNumber)
                         .input('HomePhoneExtension', mssql.VarChar(30), person.HomePhoneExtension)
                         .input('HomePhoneLegislationCode', mssql.VarChar(4), person.HomePhoneLegislationCode)                         
                         .input('CreationDate', mssql.VarChar(30), person.CreationDate)
                         .input('LastUpdateDate', mssql.VarChar(30), person.LastUpdateDate)

                         .query`usp_TALENTUS_INS_Person
                                    @PersonNumber,
                                    @PersonId,
                                    @NameSuffix,
                                    @Salutation, 
                                    @FirstName,
                                    @MiddleName,
                                    @LastName,
                                    @PreviousLastName,
                                    @DisplayName,
                                    @PreferredName,
                                    @City,
                                    @Region,
                                    @Region2,
                                    @Country,
                                    @PostalCode,
                                    @DateOfBirth,
                                    @Ethnicity,
                                    @Gender,
                                    @MaritalStatus,
                                    @NationalId,
                                    @NationalIdType,
                                    @NationalIdCountry,
                                    @NationalIdExpirationDate,
                                    @AddressLine1,
                                    @AddressLine2,
                                    @AddressLine3,
                                    @CitizenshipId,
                                    @CitizenshipStatus,
                                    @CitizenshipLegislationCode,
                                    @CitizenshipToDate,
                                    @PassportIssueDate,
                                    @PassportNumber,
                                    @PassportId,
                                    @PassportExpirationDate,
                                    @LicenceNumber,
                                    @DirversLicenseIssuingCountry,
                                    @DriversLicenseId,
                                    @MilitaryVetStatus,
                                    @HomePhoneCountryCode,
                                    @HomePhoneAreaCode,
                                    @HomePhoneNumber,
                                    @HomePhoneExtension,
                                    @HomePhoneLegislationCode,
                                    @CreationDate,
                                    @LastUpdateDate`;
        
        Promise.resolve(result).then(value => { console.log(value); });                           
      }
     return pool;

    } catch(e) { console.error(e); } 
}

const setEmployee = async (ctx, employees) => {
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
   for(const emp of employees)
   {
     const result = await pool.request()
                       .input('EventId', mssql.VarChar(10), 'UNKNOWN')
                       .input('PersonNumber', mssql.VarChar(30), emp.PersonNumber)
                       .input('EffectiveStartDate', mssql.VarChar(10), emp.EffectiveStartDate)
                       .input('EffectiveEndDate', mssql.VarChar(10), emp.EffectiveEndDate)
                       .input('WorkerType', mssql.VarChar(30), emp.WorkerType)
                       .input('PeriodType', mssql.VarChar(10), emp.PeriodType)
                       .input('UserName', mssql.VarChar(100), emp.UserName)
                       .input('WorkEmail', mssql.VarChar(240), emp.WorkEmail)
                       .input('HireDate', mssql.VarChar(10), emp.HireDate)
                       .input('TerminationDate', mssql.VarChar(10), emp.TerminationDate)
                       .input('Honors', mssql.VarChar(80), emp.Honors)
                       .input('LegalEntityId', mssql.BigInt, emp.LegalEntityId)
                       .input('CorrespondenceLanguage', mssql.VarChar(50), emp.CorrespondenceLanguage)
                       .input('PrimaryPhoneNumber', mssql.VarChar(60), emp.PrimaryPhoneNumber)
                       .input('WorkPhoneLegislationCode', mssql.VarChar(4), emp.WorkPhoneLegislationCode)
                       .input('WorkPhoneCountryCode', mssql.VarChar(30), emp.WorkPhoneCountryCode)
                       .input('WorkPhoneAreaCode', mssql.VarChar(30), emp.WorkPhoneAreaCode)
                       .input('WorkPhoneNumber', mssql.VarChar(60), emp.WorkPhoneNumber)
                       .input('WorkPhoneExtension', mssql.VarChar(60), emp.WorkPhoneExtension)
                       .input('WorkMobilePhoneCountryCode', mssql.VarChar(30), emp.WorkMobilePhoneCountryCode)
                       .input('WorkMobilePhoneAreaCode', mssql.VarChar(30), emp.WorkMobilePhoneAreaCode)
                       .input('WorkMobilePhoneNumber', mssql.VarChar(60), emp.WorkMobilePhoneNumber)
                       .input('WorkMobilePhoneExtension', mssql.VarChar(60), emp.WorkMobilePhoneExtension)
                       .input('CreationDate', mssql.VarChar(30), emp.CreationDate)
                       .input('LastUpdateDate', mssql.VarChar(30), emp.LastUpdateDate)
                       .query`usp_TALENTUS_INS_Employee 
                                  @EventId,
                                  @PersonNumber,
                                  @EffectiveStartDate, 
                                  @EffectiveEndDate,
                                  @WorkerType,
                                  @PeriodType,
                                  @UserName,
                                  @WorkEmail,
                                  @HireDate,
                                  @TerminationDate,
                                  @Honors,
                                  @LegalEntityId,
                                  @CorrespondenceLanguage,
                                  @PrimaryPhoneNumber,
                                  @WorkPhoneLegislationCode,
                                  @WorkPhoneCountryCode,
                                  @WorkPhoneAreaCode,
                                  @WorkPhoneNumber,
                                  @WorkPhoneExtension,
                                  @WorkMobilePhoneCountryCode,
                                  @WorkMobilePhoneAreaCode,
                                  @WorkMobilePhoneNumber,
                                  @WorkMobilePhoneExtension,
                                  @CreationDate,
                                  @LastUpdateDate`;
      
      Promise.resolve(result).then( value => { console.log(value); });                           
    }
   return pool;
  } catch(e) { console.error(e); } 
}

const setAssignment = async (ctx, assignments) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;

 try
  {
    //console.log(assignments);
    const pool = await new mssql.ConnectionPool(config).connect();
    for(const assignment of assignments)
    {
     const result = await pool.request()
                     .input('AssignmentNumber', mssql.VarChar(30), assignment.AssignmentNumber)
                     .input('AssignmentName', mssql.VarChar(80), assignment.AssignmentName)
                     .input('AssignmentCategory', mssql.VarChar(30), assignment.AssignmentCategory)
                     .input('AssignmentStatus', mssql.VarChar(30), assignment.AssignmentStatus)
                     .input('PrimaryAssignmentFlag', mssql.VarChar(5), assignment.PrimaryAssignmentFlag)
                     .input('AssignmentProjectedEndDate', mssql.VarChar(10), assignment.AssignmentProjectedEndDate)
                     .input('PersonNumber', mssql.VarChar(50), assignment.PersonNumber)
                     .input('PersonTypeId', mssql.BigInt, assignment.PersonTypeId)
                     .input('ActionCode', mssql.VarChar(30), assignment.ActionCode)
                     .input('ActionReasonCode', mssql.VarChar(30), assignment.ActionReasonCode)
                     .input('DeparmentId', mssql.BigInt, assignment.DepartmentId)
                     .input('BusinessUnitId', mssql.BigInt, assignment.BusinessUnitId)
                     .input('ManagerId', mssql.BigInt, assignment.ManagerId)
                     .input('ManagerType', mssql.VarChar(30), assignment.ManagerType)
                     .input('ManagerAssignmentId', mssql.BigInt, assignment.ManagerAssignmentId)
                     .input('JobId', mssql.BigInt, assignment.JobId)
                     .input('LocationId', mssql.BigInt, assignment.LocationId)
                     .input('GradeId', mssql.BigInt, assignment.GradeId)
                     .input('PositionId', mssql.BigInt, assignment.PositionId)
                     .input('WorkingAtHome', mssql.VarChar(30), assignment.WorkingAtHome)
                     .input('WorkingAsManager', mssql.VarChar(30), assignment.WorkingAsManager)
                     .input('WorkerCategory', mssql.VarChar(30), assignment.WorkerCategory)
                     .input('WorkingHours', mssql.Numeric(8,2), assignment.WorkingHours)
                     .input('WorkTaxAddressId', mssql.BigInt, assignment.WorkTaxAddressId)
                     .input('Frecuency', mssql.VarChar(30), assignment.Frecuency)
                     .input('FullPartTime', mssql.VarChar(30), assignment.FullPartTime)
                     .input('StartTime', mssql.VarChar(7), assignment.StartTime)
                     .input('EndTime', mssql.VarChar(7), assignment.EndTime)
                     .input('SalaryAmount', mssql.Numeric(8,2), assignment.SalaryAmount)
                     .input('SalaryBasisId', mssql.BigInt, assignment.SalaryBasisId)
                     .input('SalaryCode', mssql.VarChar(30), assignment.SalaryCode)
                     .input('OriginalHireDate', mssql.VarChar(10), assignment.OriginalHireDate)
                     .input('EffectiveStartDate', mssql.VarChar(10), assignment.EffectiveStartDate)
                     .input('EffectiveEndDate', mssql.VarChar(10), assignment.EffectiveEndDate)
                     .input('TermsEffectiveStartDate', mssql.VarChar(10), assignment.TermsEffectiveStartDate)
                     .input('PeriodOfServiceId', mssql.BigInt, assignment.PeriodOfServiceId)
                     .input('ProbationPeriodLength', mssql.Int, assignment.ProbationPeriodLength)
                     .input('ProbationPeriodUnitOfMeasure', mssql.VarChar(30), assignment.ProbationPeriodUnitOfMeasure)
                     .input('ProjectedStartDate', mssql.VarChar(10), assignment.ProjectStartDate)
                     .input('ProposedPersonTypeId', mssql.BigInt, assignment.ProposedPersonTypeId)
                     .input('RegularTemporary', mssql.VarChar(30), assignment.RegularTemporary)
                     .input('ActualTerminationDate', mssql.VarChar(10), assignment.ActualTerminationDate)
                     .input('LegalEntityId', mssql.BigInt, assignment.LegalEntityId)
                     .input('PrimaryWorkRelationFlag', mssql.Char(5), assignment.PrimaryWorkRelationFlag)
                     .input('PrimaryWorkTermsFlag', mssql.Char(10), assignment.PrimaryWorkTermsFlag)  
                     .input('CreationDate', mssql.VarChar(30), assignment.CreationDate)
                     .input('LastUpdateDate', mssql.VarChar(30), assignment.LastUpdateDate) 

                     .query`usp_TALENTUS_INS_Assignment 
                              @AssignmentNumber, 
                              @AssignmentName, 
                              @AssignmentCategory,                            
                              @AssignmentStatus, 
                              @PrimaryAssignmentFlag, 
                              @AssignmentProjectedEndDate,
                              @PersonNumber,
                              @PersonTypeId,
                              @ActionCode,
                              @ActionReasonCode,
                              @DeparmentId,
                              @BusinessUnitId,
                              @ManagerId,
                              @ManagerType,
                              @ManagerAssignmentId,
                              @JobId,
                              @LocationId,
                              @GradeId,
                              @PositionId,
                              @WorkingAtHome,
                              @WorkingAsManager,
                              @WorkerCategory,
                              @WorkingHours,
                              @WorkTaxAddressId,
                              @Frecuency,
                              @FullPartTime,
                              @StartTime,
                              @EndTime,
                              @SalaryAmount,
                              @SalaryBasisId,
                              @SalaryCode,
                              @OriginalHireDate,
                              @EffectiveStartDate,
                              @EffectiveEndDate,
                              @TermsEffectiveStartDate,
                              @PeriodOfServiceId,
                              @ProbationPeriodLength,
                              @ProbationPeriodUnitOfMeasure, 
                              @ProjectedStartDate,
                              @ProposedPersonTypeId,
                              @RegularTemporary,
                              @ActualTerminationDate,
                              @LegalEntityId,
                              @PrimaryWorkRelationFlag,
                              @PrimaryWorkTermsFlag,
                              @CreationDate,
                              @LastUpdateDate`;
    
          Promise.resolve(result).then(function(value) { console.log(value); });                           
    }
    return pool;
 } catch(e) { console.error(e); } 
}

const setWorkerNumber = async (ctx, personNumber, workerNumber) => {
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
   
   const result = await pool.request()
                     .input('PersonNumber', mssql.VarChar(30), personNumber)
                     .input('WorkerNumber', mssql.VarChar(30), workerNumber)
                    
                     .query`usp_TALENTUS_UDP_WorkerNumber 
                            @PersonNumber, 
                            @WorkerNumber`;
    
    Promise.resolve(result).then(value => { console.log(value); });                           
    return pool;
 } catch(e) { console.error(e); }  
}

const setAssignmentDFF = async (ctx, assignmentsDFF) => {
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
   for(const item of assignmentsDFF)
   {
    console.log(item[0]);
    const assignmentDFF = item[0];
    const result = await pool.request()
                     .input('AssignmentNumber', mssql.VarChar(30), assignmentDFF.AssignmentNumber)
                     .input('AccessTicketAllowed', mssql.VarChar(80), assignmentDFF.ACCESOBOLETOS)
                     .input('BenefitPlanCode', mssql.VarChar(30), assignmentDFF.PROGRBENEFASG)
                     .input('BenefitPlanName', mssql.VarChar(30), assignmentDFF.LVVO_ACCESOBOLETOS[0].Description)
                    
                     .query`usp_TALENTUS_UDP_AssignmentDFF 
                            @AssignmentNumber, 
                            @AccessTicketAllowed, 
                            @BenefitPlanCode,                            
                            @BenefitPlanName`;
    
          Promise.resolve(result).then(value => { console.log(value); });                           
      }
    return pool;
 } catch(e) { console.error(e); } 
}

const setDirectReports = async (ctx, data) => {
    const config = {};
    config.server = ctx.host;
    config.user = ctx.username;
    config.password = ctx.password;
    config.database = ctx.database;
    config.options = ctx.options;
    config.pool = ctx.pool;
}


module.exports = {
    setPerson: setPerson,
    setEmployee: setEmployee,
    setAssignment: setAssignment,
    setWorkerNumber: setWorkerNumber,
    setDirectReports: setDirectReports,
    setAssignmentDFF: setAssignmentDFF
}