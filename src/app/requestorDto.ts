
export class RequestorDto {

    id;

    ticketID;

    formID;

    vaResident;

    firstName;

    lastName;

    phone;

    email;

    preferredContact;

    organizationName;

    requestorType;

    address1;

    address2;

    city;

    state;

    zipcode;

    fax;

    status;

    previousStatus;

    reasonID;

    reason: ReasonCodeDto;

    media: MediaDto;

    electedOfficial: ElectedOfficialDto;

    general: GeneralDto;

    reportProblem: ReportProblemDto;

    comment;

    comments;

    createdTime;

    updatedBy;

    updatedTime;
}

export class ElectedOfficialDto {

    officialFirstname;

    officialLastname;

    staffFirstname;

    staffLastname;

    constituentMM;

    constituent;

    constFirstname;

    constLastname;

    constPhone;

    constEmail;

    constDOB;

    constMedID;

    constSSN;

    constAddr1;
	
	constAddr2;
	
	constCity;
	
	constState;
	
	constZipcode;

    description;

    updatedBy;
}

export class ReasonCodeDto {

    id;

    reasonCode;

    statusType;

    description;

    formID;

    createdBy;

    updatedBy;
}

export class MediaDto {
    deadline;

    lessThan24;

    description;

    updatedBy;
}
export class GeneralDto {

    requestType;

    description;

    updatedBy;
}
export class ReportProblemDto {

    category;

    categoryOther;

    relationship;

    relationshipOther;

    memFirstname;

    memLastname;

    memPhone;

    memEmail;

    memDOB;

    memMedID;

    memSSN;

    description;

    updatedBy;
}

export class CommentDto {

    id;
	
    notes;
    
    reasonID;
	
	reason: ReasonCodeDto;
	
	createdBy;
	
	createdTime;
}
export class DocumentDto{
    id;	
	requestorID;
	ticketID;
	documentName;
    fileName;
    fileLocation;
	createdBy;	
    updatedBy;
}

export class AssignmentDto{
    division:any;
	username:any;
	email:any;
	startDate:any;
    expectedEndDate:any;
    status;
    active;
    assigncomment;
    createdBy;
    updatedBy;
    assignmentId;
    requestorId;
    
    

}
export class AssignmentRequestDto{
    requestorID;
    comment;
    createdBy;
    updateBy;
    status;
    assignments:Array<AssignmentDto>;
    
}
export class EmployeeDto{
    username;
    lastName;
    sAMAccountName;
    emailId;
    firstName;
    }
export class ChangeFormDto{
    requestorID;
    formID;
}