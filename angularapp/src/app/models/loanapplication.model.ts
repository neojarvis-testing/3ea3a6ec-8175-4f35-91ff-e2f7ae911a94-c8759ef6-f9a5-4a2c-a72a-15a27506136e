export interface LoanApplication
{
    LoanApplicationId? : number;
    UserId: number;
    LoadId: number;
    SubmissionDate: string;
    LoanStatus: number;
    FarmLocation: string;
    FarmerAddress: string;
    FarmSizeInAcres: number;
    FarmPurpose: string;
    File : string;
}