'use strict'
const mssql = require('mssql');
const connector = require('./connection.js');

 
const setPerson = async (ctx, employees) => {
    
    try
    {
     const pool = await connector.getConnection(ctx);
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

    } catch(e) { console.error(e); return Promise.reject(e); } 
}

const setEmployee = async (ctx, employees) => {
 
  try
  {
   const pool = await connector.getConnection(ctx);
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
  } catch(e) { console.error(e); return Promise.reject(e); } 
}

const setWorkerNumber = async (ctx, workerNumbers) => {

  try
  {
   const pool = await connector.getConnection(ctx);
   for(const wrk of workerNumbers)
    {
     const result = await pool.request()
                     .input('PersonNumber', mssql.VarChar(30), wrk.PersonNumber)
                     .input('WorkerNumber', mssql.VarChar(30), wrk.WorkerNumber)
                    
                     .query`usp_TALENTUS_UDP_WorkerNumber 
                            @PersonNumber, 
                            @WorkerNumber`;
    
    Promise.resolve(result).then(value => { console.log(value); });                           
    return pool;
   }
  } catch(e) { console.error(e); return Promise.reject(e); }  
}


const setPersonType = async(ctx, personTypes) =>{
  try
  {
   const pool = await connector.getConnection(ctx);
   for(const pt of personTypes)
   {
    const result = await pool.request()
                     .input('PersonTypeId', mssql.BigInt, pt.PersonTypeId)
                     .input('SystemPersonType', mssql.VarChar(80), pt.SystemPersonType)
                     .input('UserPersonType', mssql.VarChar(30), pt.UserPersonType)
                     .input('ActiveFlag', mssql.Char(5), pt.ActiveFlag)
                     .input('DefaultFlag', mssql.Char(5), pt.DefaultFlag)
                    
                     .query`usp_TALENTUS_INS_PersonType 
                               @PersonTypeId, 
                               @SystemPersonType, 
                               @UserPersonType,                            
                               @ActiveFlag,
                               @DefaultFlag`;
    
      Promise.resolve(result).then(value => { console.log(value); });                           
  }
  return pool;
 } catch(e) { console.error(e); return Promise.reject(e);} 
}

const setDirectReports = async (ctx, directReports) => {
  try
  {
   const pool = await connector.getConnection(ctx);
   for(const dr of directReports)
   {
    const result = await pool.request()
                     .input('PersonId', mssql.BigInt, dr.PersonId)
                     .input('FullName', mssql.VarChar(255), dr.FullName)
                     .input('ManagerId', mssql.BigInt, dr.ManagerId)
                     .input('EffectiveStartDate', mssql.Char(10), pt.EffectiveStartDate)
                      
                     .query`usp_TALENTUS_INS_DirectReport
                               @PersonId, 
                               @FullName, 
                               @ManagerId,                            
                               @EffectiveStartDate`;
    
      Promise.resolve(result).then(value => { console.log(value); });                           
  }
  return pool;
 } catch(e) { console.error(e); return Promise.reject(e);} 
}

const setPersonContact = async(ctx, contacts) => { 

  try
    { 
      const pool = await connector.getConnection(ctx);

      for(const contact of contacts)
       {
        const result = await pool.request()
                     .input('PersonId', mssql.BigInt, contact.PerID)
                     .input('ContactId', mssql.BigInt, contact.ConPerID)
                     .input('EffectiveStartDate', mssql.VarChar(10), contact.ConEffectiveStartDate)
                     .input('ContactType', mssql.VarChar(50), contact.ConContactType)
                     .input('ContactTypeName', mssql.VarChar(100), contact.ConContactTypeMeaning)
                     .input('FirstName', mssql.VarChar(150), contact.ConFirstName)
                     .input('MiddleName', mssql.VarChar(150), contact.ConMiddleName)
                     .input('LastName', mssql.VarChar(150), contact.ConLastName)
                     .input('DateOfBirth', mssql.VarChar(10), contact.ConDateOfBirth)
                     .input('CountryOfBirth', mssql.VarChar(10), contact.ConCountryOfBirth)
                     .input('RegionOfBirth', mssql.VarChar(10), contact.ConRegionOfBirth)
                     .input('Gender', mssql.Char(10), contact.ConGender)
                     .input('MaritalStatus', mssql.VarChar(30), contact.ConMaritalStatus)
                     .input('BeneficiaryIndicator', mssql.Char(5), contact.ConBeneficiaryIndicator)
                     .input('Prefix', mssql.Char(5), contact.ConPrefix)
                     .input('SequenceNumber', mssql.Int, contact.ConSequenceNumber)
                    
                     .query`usp_TALENTUS_INS_PersonContact 
                              @PersonId,
                              @ContactId,
                              @EffectiveStartDate,
                              @ContactType,
                              @ContactTypeName,
                              @FirstName,
                              @MiddleName,
                              @LastName,
                              @DateOfBirth,
                              @CountryOfBirth,
                              @RegionOfBirth,
                              @Gender,
                              @MaritalStatus,
                              @BeneficiaryIndicator,
                              @Prefix,
                              @SequenceNumber`;
    
          Promise.resolve(result).then(value => { console.log(value); });                           
      }
     return pool;
    } 
  catch(err){ console.error(err); return Promise.reject(err); }
}



module.exports = {
    setPerson: setPerson,
    setEmployee: setEmployee,
    setWorkerNumber: setWorkerNumber,
    setDirectReports: setDirectReports,
    setPersonType: setPersonType,
    setPersonContact: setPersonContact
}