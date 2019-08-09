'use strict'
const mssql = require('mssql');
const connector = require('./connection.js');

const setAssignment = async (ctx, assignment) => {
    try
     {
       //console.log(assignments);
       const pool = await connector.getConnection(ctx);

       //for(const assignment of assignments)
        //{
          const result = await pool.request()
                        .input('AssignmentId', mssql.BigInt, assignment.AssignmentId)
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
                        .input('ActionReason', mssql.VarChar(100), assignment.ActionReason)
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
                        .input('SalaryAmount', mssql.VarChar(11), assignment.SalaryAmount)
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
       //}
       return pool;

    } catch(e) { console.error(e); return Promise.reject(e); } 
}

const setAssignmentDFF = async (ctx, assignmentDFF) => {
    try
    {
     const pool = await connector.getConnection(ctx);
     //for(const assignmentDFF of assignmentsDFF)
      //{
       console.log('AssignmentNumber: ', assignmentDFF.AssignmentNumber);
       //console.log(assignmentDFF.LVVO_PROGRBENEFASG);
       let benefitPlanName = assignmentDFF.LVVO_PROGRBENEFASG.filter(i => { return i.Value == assignmentDFF.PROGRBENEFASG });
       if(benefitPlanName.length == 0){
         benefitPlanName = [];
         benefitPlanName.push({Description: ''});
       }
  
       //console.log('BenefitPlanCode: ', assignmentDFF.PROGRBENEFASG, 'BenefitPlanName: ', benefitPlanName);
    
       const result = await pool.request()
                       .input('AssignmentNumber', mssql.VarChar(30), assignmentDFF.AssignmentNumber)
                       .input('AccessTicketAllowed', mssql.VarChar(80), assignmentDFF.ACCESOBOLETOS)
                       .input('BenefitPlanCode', mssql.VarChar(30), assignmentDFF.PROGRBENEFASG)
                       .input('BenefitPlanName', mssql.VarChar(30), benefitPlanName[0].Description)
                      
                       .query`usp_TALENTUS_UDP_AssignmentDFF 
                              @AssignmentNumber, 
                              @AccessTicketAllowed, 
                              @BenefitPlanCode,                            
                              @BenefitPlanName`;
      
            Promise.resolve(result).then(value => { console.log(value); });                           
        //}
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
   for(const wrkRel of workRelations)
    {
     const result = await pool.request()
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
        for(const salaryDetail of salaryDetails)
        {
          const result = await pool.request()
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
     for(const salaryComp of salaryComponents)
     {
      const result = await pool.request()
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