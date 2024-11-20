import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class Rooms {
    // /institutions/{institution}/zones/{zone}/rooms
    async getRooms(accessToken, id_institution, id_zone) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.ZONES}/${id_zone}/${API_ROUTES.ROOMS}`;
        console.log('url get getRooms ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del getRooms", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // /institutions/{institution}/zones/{zone}/rooms
    async createRooms(accessToken, id_institution, id_zone, data) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.ZONES}/${id_zone}/${API_ROUTES.ROOMS}`;
        console.log('url post createRooms ', url);
        console.log('data en createRooms', data);

        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del post createRooms", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
