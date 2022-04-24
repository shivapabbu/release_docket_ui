import { Account } from './account.model';
export interface Employee{
    sapId: string;
    fresherOrLateral: string;
    empName: string;
    projectName: string;
    band: string;
    releaseDate: Date;
    delimitationDateInRAS: Date;
    reasonforRelease: string;
    partOfRotation: string;
    performanceFeedback: string;
    noOfMonthsWorked: string;
    boardSkil: string;
    skillSet: string;
    expInYrs: string;
    contactNumber: string;
    currentLocation: string;
    leavePlan: string;
    releaseRequestor: string;
    status: string;
    uploadedDate: Date;
    createdDate: Date;
    modifiedDate: Date;
}