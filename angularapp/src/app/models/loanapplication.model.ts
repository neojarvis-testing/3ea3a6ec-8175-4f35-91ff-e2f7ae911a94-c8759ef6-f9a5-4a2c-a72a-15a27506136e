import { Loan } from "./loan.model";
import { User } from "./user.model";
export interface LoanApplication
{
    LoanApplicationId? : number;
    UserId?: number;
    LoanId?: number;
    SubmissionDate: string;
    LoanStatus: number;
    FarmLocation: string;
    FarmerAddress: string;
    FarmSizeInAcres: number;
    FarmPurpose: string;
    File : string;
    Loan?:Loan;
    User?:User
}