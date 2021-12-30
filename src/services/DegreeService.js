import axios from "axios";

const DEGREE_API_BASE_URL = 'http://localhost:8080/api/v2/degrees';


class DegreeService {

    getDegrees() {
        return axios.get(DEGREE_API_BASE_URL);
    }

    createDegree(degree){
        return axios.post(DEGREE_API_BASE_URL, degree);
    }

    getDegreeById(degreeId){
        return axios.get(DEGREE_API_BASE_URL + '/'+ degreeId);
    }

    updateDegree(degree, degreeId){
        return axios.put(DEGREE_API_BASE_URL + '/' + degreeId, degree);
    }

    deleteDegree(degreeId){
        return axios.delete(DEGREE_API_BASE_URL + '/' + degreeId);
    }
}

export default new DegreeService()