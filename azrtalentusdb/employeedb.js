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
                         .input('PersonNumber', mssql.VarChar(150), person.PersonNumber)
                         .input('FirstName', mssql.VarChar(120), person.FirstName)
                         .input('MiddleName', mssql.VarChar(120), person.MiddleName)
                         .input('LastName', mssql.VarChar(60), person.LastName)
                         .input('PreviousLastName', mssql.VarChar(255), person.PreviousLastName)
                         .input('NameSuffix', mssql.VarChar(100), person.NameSuffix)
                         .input('Salutation', mssql.VarChar(100), person.Salutation)
                         .input('DisplayName', mssql.VarChar(80), person.DisplayName)
                         .input('PreferredName', mssql.VarChar(10), person.PreferredName)
                         .input('Honors', mssql.VarChar(10), person.Honors)
                         .input('CorrespondenceLanguage', mssql.VarChar(10), person.CorrespondenceLanguage)
                         .input('HomePhoneCountryCode', mssql.VarChar(100), person.HomePhoneCountryCode)
                         .input('HomePhoneAreaCode', mssql.VarChar(), person.HomePhoneAreaCode)
                         .input('HomePhoneNumber', mssql.VarChar(), person.HomePhoneNumber)
                         .input('HomePhoneExtension', mssql.VarChar(), person.HomePhoneExtension)
                         .input('HomePhoneLegislationCode', mssql.VarChar(), person.HomePhoneLegislationCode)
                         .input('HomeFaxCountryCode', mssql.VarChar(), person.HomeFaxCountryCode)
                         .input('HomeFaxAreaCode', mssql.VarChar(), person.HomeFaxAreaCode)
                         .input('HomeFaxNumber', mssql.VarChar(), person.HomeFaxNumber)
                         .input('HomeFaxExtension', mssql.VarChar(), person.HomeFaxExtension)
                         .input('AddressLine1', mssql.VarChar(), person.AddressLine1)
                         .input('AddressLine2', mssql.VarChar(), person.AddressLine2)
                         .input('AddressLine3', mssql.VarChar(), person.AddressLine3)
                         .input('City', mssql.VarChar(), person.City)
                         .input('Region', mssql.VarChar(), person.Region)
                         .input('Region2', mssql.VarChar(), person.Region2)
                         .input('Country', mssql.VarChar(), person.Country)
                         .input('PostalCode', mssql.VarChar(), person.PostalCode)
                         .input('DateOfBirth', mssql.VarChar(), person.DateOfBirth)
                         .input('Ethnicity', mssql.VarChar(), person.Ethnicity)
                         .input('Gender', mssql.VarChar(), person.Gender)
                         .input('MaritalStatus', mssql.VarChar(), person.MaritalStatus)
                         .input('NationalIdType', mssql.BigInt, person.NationalIdType)
                         .input('NationalIdExpirationDate', mssql.VarChar(10), person.NationalIdExpirationDate)
                         .input('CitizenshipId', mssql.BigInt, person.CitizenshipId)
                         .input('CitizenshipStatus', mssql.VarChar() , person.CitizenshipStatus)
                         .input('CitizenshipLegislationCode', mssql.VarChar(), person.CitizenshipLegislationCode)
                         .input('CitizenshipToDate', mssql.VarChar(10), person.CitizenshipToDate)
                         //.input('Religion', mssql.VarChar(), person.Religion)
                         //.input('ReligionId', mssql.BigInt, person.ReligionId)
                         .input('PassportIssueDate', mssql.VarChar(10), person.PassportIssueDate)
                         .input('PassportNumber', mssql.VarChar(), person.PassportNumber)
                         .input('PassportIssuingCountry', mssql.VarChar(), person.PassportIssuingCountry)
                         .input('PassportId', mssql.BigInt, person.PassportId)
                         .input('PassportExpirationDate', mssql.VarChar(10), person.PassportExpirationDate)
                         .input('LicenseNumber', mssql.VarChar(), person.LicenseNumber)
                         .input('DriversLicenseExpirationDate', mssql.VarChar(10), person.DriversLicenseExpirationDate)
                         .input('DriversLicenseIssuingCountry', mssql.VarChar(), person.DriversLicenseIssuingCountry)
                         //.input('DriversLicenseId', mssql.BigInt, person.DriversLicenseId)
                         .input('MilitaryVetStatus', mssql.VarChar(), person.MilitaryVetStatus)
                         .input('CreationDate', mssql.VarChar(30), organization.CreationDate)
                         .input('LastUpdateDate', mssql.VarChar(30), organization.LastUpdateDate)

                         .query`usp_TALENTUS_INS_Person
                                    @PersonId,
                                    @PersonNumber, 
                                    @FirstName,
                                    @MiddleName,
                                    @LastName,
                                    @NameSuffix,
                                    @Salutation,
                                    @DisplayName,
                                    @PreferredName,
                                    @DateOfBirth,
                                    @Ethnicity,
                                    @Gender,
                                    @MaritalStatus,
                                    @NationalIdType,
                                    @NationalIdExpirationDate,
                                    @PassportIssueDate,
                                    @PassportNumber,
                                    @PassportIssuingCountry,
                                    @PassportId,
                                    @CitizenshipId,
                                    @CitizenshipStatus,
                                    @CitizenshipLegislationCode,
                                    @CitizenshipToDate,
                                    @CorrespondenceLanguage,
                                    @HomePhoneCountryCode
                                    @HomePhoneAreaCode,
                                    @HomePhoneNumber,
                                    @HomePhoneExtension,
                                    @HomePhoneLegislationCode,
                                    @HomeFaxCountryCode,
                                    @HomeFaxAreaCode,
                                    @HomeFaxNumber,
                                    @HomeFaxExtension,
                                    @AddressLine1,
                                    @AddressLine2,
                                    @AddressLine3,
                                    @City,
                                    @Region,
                                    @Region2,
                                    @Country,
                                    @PostalCode,
                                    @LicenceNumber,
                                    @DriversLicenseExpirationDate,
                                    @DriversLicenseIssuingCountry,
                                    @MilitaryStatus,
                                    @CreationDate,
                                    @LastUpdateDate`;
        
        const promiseResult = Promise.resolve(result);
              promiseResult.then(function(value) {
                            console.log(value);
              });                           
      }
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
                       .input('PersonNumber', mssql.VarChar(), emp.PersonNumber)
                       .input('UserName', mssql.VarChar(120), emp.UserName)
                       .input('WorkEmail', mssql.VarChar(), emp.WorkEmail)
                       .input('WorkerType', mssql.VarChar(), emp.WorkerType)
                       .input('HireDate', mssql.VarChar(10), emp.HireDate)
                       .input('TerminationDate', mssql.VarChar(10), emp.TerminationDate)
                       .input('ProjectedTerminationDate', mssql.VarChar(10), emp.ProjectedTerminationDate)
                       .input('LegalEntityId', mssql.BigInt, emp.LegalEntityId)
                       .input('WorkPhoneCountryCode', mssql.BigInt, emp.WorkPhoneCountryCode)
                       .input('WorkPhoneAreaCode', mssql.VarChar(80), emp.WorkPhoneAreaCode)
                       .input('WorkPhoneNumber', mssql.VarChar(10), emp.WorkPhoneNumber)
                       .input('WorkPhoneExtension', mssql.VarChar(10), emp.WorkPhoneExtension)
                       .input('WorkPhoneLegislationCode', mssql.VarChar(), emp.WorkPhoneLegislationCode)
                       .input('WorkFaxCountryCode', mssql.VarChar(), emp.WorkFaxCountryCode)
                       .input('WorkFaxAreaCode', mssql.VarChar(), emp.WorkFaxAreaCode)
                       .input('WorkFaxNumber', mssql.VarChar(), emp.WorkFaxNumber)
                       .input('WorkFaxExtension', mssql.VarChar(), emp.WorkFaxExtension)
                       .input('WorkFaxLegislationCode', mssql.VarChar(), emp.WorkFaxLegislationCode)
                       .input('WorkMobilePhoneCountryCode', mssql.VarChar(), emp.WorkMobilePhoneCountryCode)
                       .input('WorkMobilePhoneAreaCode', mssql.VarChar(), emp.WorkMobilePhoneAreaCode)
                       .input('WorkMobilePhoneNumber', mssql.VarChar(), emp.WorkMobilePhoneNumber)
                       .input('WorkMobilePhoneExtension', mssql.VarChar(), emp.WorkMobilePhoneExtension)
                       .input('WorkMobilePhoneLegislationCode', mssql.VarChar(), emp.WorkMobilePhoneLegislationCode)
                       .input('CreationDate', mssql.VarChar(30), emp.CreationDate)
                       .input('LastUpdateDate', mssql.VarChar(30), emp.LastUpdateDate)
                       .query`usp_TALENTUS_INS_Employee 
                                  @OrganizationId,
                                  @OrganizationCode, 
                                  @OrganizationName,
                                  @ClassificationCode,
                                  @Status,
                                  @LocationId,
                                  @LegalEntityId,
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
  } catch(e) { console.error(e); } 
}

const setAssignment = async (ctx, assignment) => {
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
                     .input('AssignmentId', mssql.BigInt, assignment.AssignmentId)
                     .input('AssignmentNumber', mssql.VarChar(240), assignment.AssignmentNumber)
                     .input('AssignmentName', mssql.VarChar(240), assignment.AssignmentName)
                     .input('AssignmentStatusTypeId', mssql.BigInt, assignment.AssignmentStatusTypeId)
                     .input('PersonTypeId', mssql.BigInt, assignment.PersonTypeId)
                     .input('ProposedPersonTypeId', mssql.BigInt, assignment.ProposedPersonTypeId)
                     .input('ProjectedStartDate', mssql.VarChar(30), assignment.ProjectedStartDate)
                     .input('BusinessUnitId', mssql.BigInt, assignment.BusinessUnitId)
                     .input('LocationId', mssql.BigInt, assignment.LocationId)
                     .input('JobId', mssql.BigInt, assignment.JobId)
                     .input('GradeId', mssql.BigInt, assignment.GradeId)
                     .input('DepartmentId', mssql.BigInt, assignment.DepartmentId)
                     .input('WorkerCategory', mssql.VarChar(10), assignment.WorkerCategory)
                     .input('AssignmentCategory', mssql.VarChar(10), assignment.AssignmentCategory)
                     .input('WorkingAtHome', mssql.VarChar(), assignment.WorkingAtHome)
                     .input('WorkingAsManager', mssql.VarChar(), assignment.WorkingAsManager)
                     .input('SalaryCode', mssql.VarChar(), assignment.SalaryCode)
                     .input('WorkingHours', mssql.VarChar(), assignment.WorkingHours)
                     .input('Frequency', mssql.VarChar(), assignment.Frequency)
                     .input('StartTime', mssql.VarChar(), assignment.StartTime)
                     .input('EndTime', mssql.VarChar(), assignment.EndTime)
                     .input('SalaryAmount', mssql.VarChar(), assignment.SalaryAmount)
                     .input('SalaryBasisId', mssql.BigInt, assignment.SalaryBasisId)
                     .input('ActionCode', mssql.VarChar(50), assignment.ActionCode)
                     .input('ActionReasonCode', mssql.VarChar(), assignment.ActionReasonCode)
                     .input('AssignmentStatus', mssql.VarChar(), assignment.AssignmentStatus)
                     .input('WorkTaxAddressId', mssql.BigInt, assignment.WorkTaxAddressId)
                     .input('EffectiveStartDate', mssql.VarChar(30), assignment.EffectiveStartDate)
                     .input('EffectiveEndDate', mssql.VarChar(30), assignment.EffectiveEndDate)
                     .input('PositionId', mssql.BigInt, assignment.PositionId)
                     .input('TermsEffectiveStartDate', mssql.VarChar(30), assignment.TermsEffectiveStartDate)
                     .input('ManagerId', mssql.BigInt, assignment.ManagerId)
                     .input('ManagerAssignmentId', mssql.BigInt, assignment.ManagerAssignmentId)
                     .input('ManagerType', mssql.VarChar(150), assignment.ManagerType)
                     .input('OriginalHireDate', mssql.VarChar(30), assignment.OriginalHireDate)
                     .input('PrimaryAssignmentFlag', mssql.VarChar(), assignment.PrimaryAssignmentFlag)
                     .input('ProbationPeriodEndDate', mssql.VarChar(30), assignment.ProbationPeriodEndDate)
                     .input('ProbationPeriodLength', mssql.Int, assignment.ProbationPeriodLength)
                     .input('ProbationPeriodUnitOfMeasure', mssql.VarChar(50), assignment.ProbationPeriodUnitOfMeasure)
                     .input('AssignmentProjectedEndDate', mssql.VarChar(30), assignment.AssignmentProjectedEndDate)
                     .input('ActualTerminationDate', mssql.VarChar(30), assignment.ActualTerminationDate)
                     .input('LegalEntityId', mssql.BigInt, assignment.LegalEntityId)
                     .input('PrimaryWorkRelationFlag', mssql.VarChar(10), assignment.PrimaryWorkRelationFlag)
                     .input('PrimaryWorkTermsFlag', mssql.VarChar(10), assignment.PrimaryWorkTermsFlag)
                     .input('CreationDate', mssql.VarChar(30), assignment.CreationDate)
                     .input('LastUpdateDate', mssql.VarChar(30), assignment.LastUpdateDate)
                     .query`usp_TALENTUS_INS_Employee 
                                @AssignmentId,
                                @AssignmentNumber,
                                @AssignmentName,
                                @AssignmentStatusTypeId, 
                                @PersonTypeId,
                                @ProposedPersonTypeId, 
                                @ProjectedStartDate,
                                @BusinessUnitId', 
                                @LocationId,
                                @JobId,
                                @GradeId,
                                @DepartmentId,
                                @WorkerCategory,
                                @AssignmentCategory', 
                                @WorkingAtHome,
                                @WorkingAsManager,
                                @SalaryCode,
                                @WorkingHours,
                                @Frequency,
                                @StartTime,
                                @EndTime,
                                @SalaryAmount,
                                @SalaryBasisId,
                                @ActionCode,
                                @ActionReasonCode,
                                @AssignmentStatus,
                                @WorkTaxAddressId,
                                @EffectiveStartDate, 
                                @EffectiveEndDate,
                                @PositionId,
                                @TermsEffectiveStartDate,
                                @ManagerId,
                                @ManagerAssignmentId,
                                @ManagerType,
                                @OriginalHireDate,
                                @PrimaryAssignmentFlag,
                                @ProbationPeriodEndDate,
                                @ProbationPeriodLength,           
                                @ProbationPeriodUnitOfMeasure,           
                                @AssignmentProjectedEndDate,                 
                                @ActualTerminationDate,                   
                                @LegalEntityId,
                                @PrimaryWorkRelationFlag,
                                @PrimaryWorkTermsFlag,
                                @CreationDate,
                                @LastUpdateDate`;
    
    const promiseResult = Promise.resolve(result);
          promiseResult.then(function(value) {
                        console.log(value);
          });                           
   
 } catch(e) { console.error(e); } 
}

const setWorkerNumber = async (ctx, link) => {
  const config = {};
  config.server = ctx.host;
  config.user = ctx.username;
  config.password = ctx.password;
  config.database = ctx.database;
  config.options = ctx.options;
  config.pool = ctx.pool;

  
}

const updateFlexfields = async (ctx, data) => {
  const config = {};
  config.server = ctx.host;
  config.user = ctx.username;
  config.password = ctx.password;
  config.database = ctx.database;
  config.options = ctx.options;
  config.pool = ctx.pool;

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


const setCandidate = async (ctx, candidates) => {
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
     for(const candidate of candidates)
     {
       const result = await pool.request()
                         .input('PersonId', mssql.BigInt, candidate.PersonId)
                         .input('CandidateNumber', mssql.VarChar(240), candidate.CandidateNumber)
                         .input('FirstName', mssql.VarChar(150), candidate.FirstName)
                         .input('MiddleName', mssql.VarChar(80), candidate.MiddleName)
                         .input('LastName', mssql.VarChar(150), candidate.LastName)
                         .input('PreviousLastName', mssql.VarChar(255), candidate.PreviousLastName)
                         .input('FullName', mssql.VarChar(300), candidate.FullName)
                         .input('DisplayName', mssql.VarChar(240), candidate.DisplayName)
                         .input('MilitaryRank', mssql.VarChar(255), candidate.MilitaryRank)
                         .input('PreNameAdjunct', mssql.VarChar(255), candidate.PreNameAdjunct)
                         .input('Title', mssql.VarChar(30), candidate.Title)
                         .input('Suffix', mssql.VarChar(80), candidate.Suffix)
                         .input('KnownAs', mssql.VarChar(255), candidate.KnownAs)
                         .input('Honors', mssql.VarChar(255), candidate.Honors)
                         .input('Email', mssql.VarChar(240), candidate.Email)
                         .input('CandidateType', mssql.VarChar(100), candidate.CandidateType)
                         .input('CreatedBy', mssql.VarChar(30), candidate.CreatedBy)
                         .input('LastUpdatedBy', mssql.VarChar(30), candidate.LastUpdatedBy)
                         .input('CreationDate', mssql.VarChar(30), candidate.CreationDate)
                         .input('LastUpdateDate', mssql.VarChar(30), candidate.LastUpdateDate)
                         .query`usp_TALENTUS_INS_Candidate 
                                    @PersonId,
                                    @CandidateNumber, 
                                    @FirstName,
                                    @MiddleName,
                                    @LastName,
                                    @PreviousLastName,
                                    @FullName,
                                    @DisplayName,
                                    @MilitaryRank,
                                    @PreNameAdjunct,
                                    @Title,
                                    @Suffix,
                                    @KnownAs,
                                    @Honors,
                                    @Email,
                                    @CandidateType,
                                    @CreatedBy,
                                    @LastUpdatedBy,
                                    @CreationDate,
                                    @LastUpdateDate`;
        
        const promiseResult = Promise.resolve(result);
              promiseResult.then(function(value) {
                            console.log(value);
              });                           
      }
    } catch(e) { console.error(e); } 
}

module.exports = {
    setPerson: setPerson,
    setEmployee: setEmployee,
    setWorkerNumber: setWorkerNumber,
    setDirectReports: setDirectReports,
    updateFlexfields: () => {},
    setCandidate: setCandidate
}