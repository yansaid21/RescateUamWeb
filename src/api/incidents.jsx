import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class Incidents {

    async createIncident(accessToken, id_institution, id_risk_situation) {
        const url = `${BASE_PATH}/institutions/${id_institution}/risk_situations/${id_risk_situation}/${API_ROUTES.INCIDENT}`;
        console.log('url post createIncident ', url);
        
        try {
            const response = await axios.post(url, {}, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del post createIncident", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateIncident(accessToken, id_institution, id_risk_situation, description, id_incident) {
        const url = `${BASE_PATH}/institutions/${id_institution}/risk_situations/${id_risk_situation}/${API_ROUTES.INCIDENT}/${id_incident}`;
        console.log('url post createIncident ', url);
        
        try {
            const response = await axios.put(url, description, {
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

    async getIncidents(accessToken, id_institution) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.INCIDENT}`;
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
