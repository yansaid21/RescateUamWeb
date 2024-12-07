import { axiosInstance } from "../config/axiosInstance";
import { ENV } from '../utils/constants';

const {API_ROUTES } = ENV;


    // /institutions/{institution}/zones/{zone}/rooms
    
const LevelsController ={

    async getLevels(id_institution) {
            const url = `/institutions/${id_institution}/${API_ROUTES.LEVELS}`;
            /* console.log('url get getLevels ', url); */
        
        try {
            const response = await axiosInstance.get(url)
            
/*             console.log("respuesta despues del getLevels", response.data); */
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // /institutions/{institution}/zones/{zone}/rooms
    async createLevels( id_institution, data) {
        const url = `/institutions/${id_institution}/${API_ROUTES.LEVELS}`;
    /*   console.log('url post createLevels ', url);
        console.log('data en createLevels', data); */
        
        try {
            const response = await axiosInstance.post(url, data);
            
/*             console.log("respuesta despues del post createLevels", response.data); */
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}

export default LevelsController;
