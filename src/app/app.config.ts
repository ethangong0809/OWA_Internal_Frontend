// const baseUrl = 'https://www.dmasdev.dmas.virginia.gov:5440/owainternal/';
const baseUrl = 'http://localhost:9080/owainternal/';
export const APP_CONFIG = {

    getAllRequestsCount: baseUrl + 'getAllRequestsCount',
    getRequestsCount: baseUrl + 'getRequestsCount/',
    getPendingRequestsTable: baseUrl + 'getPendingRequestsTable/',
    getClosedRequestsTable: baseUrl + 'getClosedRequestsTable/',
    getTotalRequestsTable: baseUrl + 'getTotalRequestsTable/',
    getAllPendingRequestsTable: baseUrl + 'getAllPendingRequestsTable/',
    getAllClosedRequestsTable: baseUrl + 'getAllClosedRequestsTable/',
    getAllTotalRequestsTable: baseUrl + 'getAllTotalRequestsTable/',
    getRequest: baseUrl + 'getRequest/',
    updateRequest : baseUrl + 'updateRequest',
    getReasonCodes : baseUrl + 'getReasonCodes/',
    getDocuments: baseUrl+'getDocuments/',
    deleteDocument: baseUrl+'deleteDocument',
    saveDocuments:baseUrl+'saveDocuments',
    documents:baseUrl+'documents/',
    setAssignments:baseUrl+'setAssignments',
    getAssignmentsRequestsCount:baseUrl+'getAssignmentsRequestsCount/',
    getAssignments:baseUrl+'getAssignments/',
    getEmployeesFromLDAP:baseUrl+'getEmployeesFromLDAP/',
    deleteAssignment:baseUrl+'deleteAssignment',
    updateAssigment:baseUrl+'updateAssigment',
    changeForm:baseUrl+'changeForm',
    getAssignmentsRequests:baseUrl+'getAssignmentsRequests/',
    getAllFromLDAP:baseUrl+'getAllFromLDAP',
}