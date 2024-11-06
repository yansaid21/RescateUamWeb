import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class Zones {

    async createZones(accessToken, id_institution, data) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.ZONES}`;
        console.log('url post createZones ', url);
        console.log('data en createZones', data);
        
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del post createZones", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getZones(accessToken, id_institution) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.ZONES}`;
        console.log('url get getZones ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del getZones", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
