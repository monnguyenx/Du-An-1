import axios from "axios";

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v2/employees';


class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    createEmployeeJoinDepartment(employeeId, departmentId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/departments/' + departmentId);
    }

    createEmployeeJoinPosition(employeeId, positionId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/positions/' + positionId);
    }

    createEmployeeJoinLevel(employeeId, levelId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/levels/' + levelId);
    }

    createEmployeeJoinDegree(employeeId, degreeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/degrees/' + degreeId);
    }


    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()