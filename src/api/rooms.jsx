import { axiosInstance } from "../config/axiosInstance";
import { ENV } from '../utils/constants';

const {API_ROUTES } = ENV;


    // /institutions/{institution}/zones/{zone}/rooms
    
    const RoomsController ={



        async getRooms(id_institution, id_zone) {
            const url = `/institutions/${id_institution}/${API_ROUTES.ZONES}/${id_zone}/${API_ROUTES.ROOMS}`;
            /* console.log('url get getRooms ', url); */
        
        try {
            const response = await axiosInstance.get(url)
            
/*             console.log("respuesta despues del getRooms", response.data); */
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // /institutions/{institution}/zones/{zone}/rooms
    async createRooms( id_institution, id_zone, data) {
        const url = `/institutions/${id_institution}/${API_ROUTES.ZONES}/${id_zone}/${API_ROUTES.ROOMS}`;
      /*   console.log('url post createRooms ', url);
        console.log('data en createRooms', data); */
        
        try {
            const response = await axiosInstance.post(url, data);
            
/*             console.log("respuesta despues del post createRooms", response.data); */
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}
export default RoomsController;