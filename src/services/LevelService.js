import axios from "axios";

const LEVEL_API_BASE_URL = 'http://localhost:8080/api/v2/levels';


class LevelService {

    getLevels() {
        return axios.get(LEVEL_API_BASE_URL);
    }

    createLevel(level){
        return axios.post(LEVEL_API_BASE_URL, level);
    }

    getLevelById(levelId){
        return axios.get(LEVEL_API_BASE_URL + '/'+ levelId);
    }

    updateLevel(level, levelId){
        return axios.put(LEVEL_API_BASE_URL + '/' + levelId, level);
    }

    deleteLevel(levelId){
        return axios.delete(LEVEL_API_BASE_URL + '/' + levelId);
    }
}

export default new LevelService()