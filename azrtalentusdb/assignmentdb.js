'use strict'
const mssql = require('mssql');
const connector = require('./connection.js');
const fs = require('fs'); 

const setAssignment = async (ctx, assignments) => {
    try
     {
       //console.log(assignments);
       const pool = await connector.getConnection(ctx);

       for(let index=0; index < assignments.length; index++)
       {
          const asg = assignments[index];
          const result = await pool.request()
                        .input('AssignmentId', mssql.BigInt, asg.AssignmentId)
                        .input('AssignmentNumber', mssql.VarChar(30), asg.AssignmentNumber)
                        .input('AssignmentName', mssql.VarChar(80), asg.AssignmentName)
                        .input('AssignmentCategory', mssql.VarChar(30), asg.AssignmentCategory)
                        .input('AssignmentStatus', mssql.VarChar(30), asg.AssignmentStatus)
                        .input('PrimaryAssignmentFlag', mssql.VarChar(5), asg.PrimaryAssignmentFlag)
                        .input('AssignmentProjectedEndDate', mssql.VarChar(10), asg.AssignmentProjectedEndDate)
                        .input('PersonNumber', mssql.VarChar(50), asg.PersonNumber)
                        .input('PersonTypeId', mssql.BigInt, asg.PersonTypeId)
                        .input('ActionCode', mssql.VarChar(30), asg.ActionCode)
                        .input('ActionReasonCode', mssql.VarChar(30), asg.ActionReasonCode)
                        .input('ActionReason', mssql.VarChar(100), asg.ActionReason)
                        .input('DeparmentId', mssql.BigInt, asg.DepartmentId)
                        .input('BusinessUnitId', mssql.BigInt, asg.BusinessUnitId)
                        .input('ManagerId', mssql.BigInt, asg.ManagerId)
                        .input('ManagerType', mssql.VarChar(30), asg.ManagerType)
                        .input('ManagerAssignmentId', mssql.BigInt, asg.ManagerAssignmentId)
                        .input('JobId', mssql.BigInt, asg.JobId)
                        .input('LocationId', mssql.BigInt, asg.LocationId)
                        .input('GradeId', mssql.BigInt, asg.GradeId)
                        .input('PositionId', mssql.BigInt, asg.PositionId)
                        .input('WorkingAtHome', mssql.VarChar(30), asg.WorkingAtHome)
                        .input('WorkingAsManager', mssql.VarChar(30), asg.WorkingAsManager)
                        .input('WorkerCategory', mssql.VarChar(30), asg.WorkerCategory)
                        .input('WorkingHours', mssql.Numeric(8,2), asg.WorkingHours)
                        .input('WorkTaxAddressId', mssql.BigInt, asg.WorkTaxAddressId)
                        .input('Frecuency', mssql.VarChar(30), asg.Frecuency)
                        .input('FullPartTime', mssql.VarChar(30), asg.FullPartTime)
                        .input('StartTime', mssql.VarChar(7), asg.StartTime)
                        .input('EndTime', mssql.VarChar(7), asg.EndTime)
                        .input('SalaryAmount', mssql.VarChar(11), asg.SalaryAmount)
                        .input('SalaryBasisId', mssql.BigInt, asg.SalaryBasisId)
                        .input('SalaryCode', mssql.VarChar(30), asg.SalaryCode)
                        .input('OriginalHireDate', mssql.VarChar(10), asg.OriginalHireDate)
                        .input('EffectiveStartDate', mssql.VarChar(10), asg.EffectiveStartDate)
                        .input('EffectiveEndDate', mssql.VarChar(10), asg.EffectiveEndDate)
                        .input('TermsEffectiveStartDate', mssql.VarChar(10), asg.TermsEffectiveStartDate)
                        .input('PeriodOfServiceId', mssql.BigInt, asg.PeriodOfServiceId)
                        .input('ProbationPeriodLength', mssql.Int, asg.ProbationPeriodLength)
                        .input('ProbationPeriodUnitOfMeasure', mssql.VarChar(30), asg.ProbationPeriodUnitOfMeasure)
                        .input('ProjectedStartDate', mssql.VarChar(10), asg.ProjectStartDate)
                        .input('ProposedPersonTypeId', mssql.BigInt, asg.ProposedPersonTypeId)
                        .input('RegularTemporary', mssql.VarChar(30), asg.RegularTemporary)
                        .input('ActualTerminationDate', mssql.VarChar(10), asg.ActualTerminationDate)
                        .input('LegalEntityId', mssql.BigInt, asg.LegalEntityId)
                        .input('PrimaryWorkRelationFlag', mssql.Char(5), asg.PrimaryWorkRelationFlag)
                        .input('PrimaryWorkTermsFlag', mssql.Char(10), asg.PrimaryWorkTermsFlag)  
                        .input('CreationDate', mssql.VarChar(30), asg.CreationDate)
                        .input('LastUpdateDate', mssql.VarChar(30), asg.LastUpdateDate) 
   
                        .query`usp_TALENTUS_INS_Assignment 
                                 @AssignmentId,
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
                                 @ActionReason,
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

    } catch(e) { console.error(e); return Promise.reject(e); } 
}

const setAssignmentDFF = async (ctx, assignmentDFF) => {
    try
    {
     const pool = await connector.getConnection(ctx);
     for(let asgFlex of assignmentDFF)
      {
       //console.log(asgFlex);
       console.log('> AssignmentNumber: ', asgFlex.AssignmentNumber);
       //console.log(asgFlex.LVVO_PROGRBENEFASG);
       //console.log('BenefitPlanCode: ', asgFlex.PROGRBENEFASG, 'BenefitPlanName: ', benefitPlanName);
    
       let result = await pool.request()
                       .input('AssignmentNumber', mssql.VarChar(30), asgFlex.AssignmentNumber)
                       .input('AccessTicketAllowed', mssql.VarChar(80), asgFlex.ACCESOBOLETOS)
                       .input('BenefitPlanCode', mssql.VarChar(30), asgFlex.PROGRBENEFASG)
                       .input('BenefitPlanName', mssql.VarChar(30), asgFlex.BenefitPlanName)
                      
                       .query`usp_TALENTUS_UDP_AssignmentDFF 
                              @AssignmentNumber, 
                              @AccessTicketAllowed, 
                              @BenefitPlanCode,                            
                              @BenefitPlanName`;
      
            Promise.resolve(result).then(value => { console.log(value); });                           
        }
      return pool;
   } catch(e) { console.error(e); return Promise.reject(e);} 
}
  
const setAssignmentDetail = async (ctx, asgDet) => {
    try
    {
     const pool = await connector.getConnection(ctx); 
     
     return pool;
    } catch(e) { console.error(e); return Promise.reject(e); }
}


const setWorkRelationship = async (ctx, workRelations) => {
  try
  {
   const pool = await connector.getConnection(ctx);
   for(let wrkRel of workRelations)
    {
     let result = await pool.request()
                     .input('PersonNumber', mssql.VarChar(30), wrkRel.PerNumber)
                     .input('WorkerNumber', mssql.VarChar(30), wrkRel.WrkRelWorkerNumber)
                     .input('AssignmentNumber', mssql.VarChar(30), wrkRel.AsgNumber)
                     .input('KronosPaymentRule', mssql.VarChar(30), wrkRel.WrkRelFlexGBLReglapagoKronos)
                     .input('KronosCard', mssql.VarChar(30), wrkRel.WrkRelFlexGBLCarnetKronos)
                     .input('KronosCardExpirationDate', mssql.VarChar(30), wrkRel.WrkRelFlexGBLExpiracionCarnet)
                     .input('SenDataKronos', mssql.VarChar(30), wrkRel.WrkRelFlexGBLEnviarDatosKronos)

                     .query`usp_TALENTUS_UDP_WorkRelationship 
                            @PersonNumber, 
                            @WorkerNumber, 
                            @AssignmentNumber,                            
                            @KronosPaymentRule,
                            @KronosCard,
                            @KronosCardExpirationDate,
                            @SendDataKronos`;
    
          Promise.resolve(result).then(value => { console.log(value); });                           
      }
    return pool;
 } catch(e) { console.error(e); return Promise.reject(e);} 
}


const setSalaryDetail = async (ctx, salaryDetails) => {
    try
    {
        const pool = await connector.getConnection(ctx);
        for(let salaryDetail of salaryDetails)
        {
          let result = await pool.request()
                               .input('SalaryId', mssql.BigInt, salaryDetail.SalaryId)
                               .input('PersonNumber', mssql.VarChar(30), salaryDetail.PersonNumber)
                               .input('AssignmentNumber', mssql.VarChar(30), salaryDetail.AssignmentNumber)
                               .input('WrkRelPeriodOfServiceId', mssql.BigInt, salaryDetail.WrkRelPeriodOfServiceId)
                               .input('SalaryReasonActionName', mssql.VarChar(100), salaryDetail.SalaryReasonActionName)
                               .input('SalaryBaseAnnualFactor', mssql.Int , salaryDetail.SalaryBaseAnnualFactor)
                               .input('SalaryBaseCode', mssql.VarChar(50), salaryDetail.SalaryBaseCode)
                               .input('SalaryDateFrom', mssql.VarChar(10), salaryDetail.SalaryDateForm)
                               .input('SalaryDateTo', mssql.VarChar(10), salaryDetail.SalaryDateTo)
                               .input('SalaryBasisId', mssql.BigInt, salaryDetail.SalaryBasisId)
                               .input('SalaryBasisName', mssql.VarChar(50), salaryDetail.SalaryBasisName)
                               .input('SalaryBasisElementName', mssql.VarChar(100), salaryDetail.SalaryBasisElementName)
                               .input('SalaryBasisElementTypeId', mssql.BigInt, salaryDetail.SalaryBasisElementTypeId)
                               .input('SalaryBasisGradeId', mssql.BigInt, salaryDetail.SalaryBasisGradeId)
                               .input('SalaryNextReviewDate', mssql.VarChar(10), salaryDetail.SaaryNextReviewDate)
                               .input('SalaryCurrencyCode', mssql.Char(10), salaryDetail.SalaryCurrencyCode)
                               .input('SalaryAmount', mssql.Decimal(8,2), salaryDetail.SalaryAmount)
                               
                               .query`usp_TALENTUS_INS_SalaryDetails
                                         @SalaryId,
                                         @PersonNumber,
                                         @AssignmentNumber,
                                         @WrkRelPeriodOfServiceId,
                                         @SalaryReasonActionName,
                                         @SalaryBaseAnnualFactor,
                                         @SalaryBaseCode,
                                         @SalaryDateFrom,
                                         @SalaryDateTo,
                                         @SalaryBasisId,
                                         @SalaryBasisName
                                         @SalaryBasisElementName,
                                         @SalaryBasisElementTypeId,
                                         @SalaryBasisGradeId,
                                         @SalaryNextReviewDate',
                                         @SalaryCurrencyCode,
                                         @SalaryAmount`

          Promise.resolve(result).then( r => {console.log(r);});  
        } 
        return pool;

    } catch(e) { console.error(e); return Promise.reject(e); }
}

const setSalaryComponent = async (ctx, salaryComponents) => {
   try 
   {
     const pool = await connector.getConnection(ctx);
     for(let salaryComp of salaryComponents)
     {
      let result = await pool.request()
                               .input('ComponentCode', mssql.VarChar(30), salaryComp.ComponentCode)
                               .input('ComponentName', mssql.VarChar(50), salaryComp.SalaryName)
                               .input('PersonNumber', mssql.VarChar(30), salaryComp.PersonNumber)
                               .input('SalaryId', mssql.BigInt, salaryComp.SalaryId)
                               .input('ChangePercentage', mssql.Int, salaryComp.ChangePercentage)
                               .input('ChangeAmount', mssql.Decimal(18,2), salaryComp.ChangeAmount)
                               .input('AssignmentNumber', mssql.VarChar(100), salaryComp.AssignmentNumber)

                               .query`usp_TALENTUS_INS_SalaryComponent 
                                          @ComponentCode,
                                          @ComponentName,
                                          @PersonNumber,
                                          @SalaryId,
                                          @ChangePercentage,
                                          @ChangeAmount,
                                          @AssignmentNumber`

      Promise.resolve(result).then(r => { console.log(r); });
     }
     return pool;      
   } catch(e) { console.error(e); return Promise.reject(e); }
}

module.exports = {
    setAssignment: setAssignment,
    setAssignmentDFF: setAssignmentDFF,
    setAssignmentDetail: setAssignmentDetail,
    setWorkRelationship: setWorkRelationship,
    setSalaryDetail: setSalaryDetail,
    setSalaryComponent: setSalaryComponent
}