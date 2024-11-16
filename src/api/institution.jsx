
import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH} = ENV;


export class Institution{
    async getInstitution(accessToken, id_institution) {
        const url = `${BASE_PATH}/institutions/${id_institution}`;
        console.log('url get getIncidents ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del updateIncident", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
