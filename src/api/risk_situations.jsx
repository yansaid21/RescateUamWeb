//api/institutions/{institution}/risk_situations 
import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class Risk_situation {

    async createRiskSituation(accessToken, data, id_institution) {
/*         const accessTokenString = accessToken.access; 
        console.log('accessTokenString ', accessTokenString);
        console.log('accesstoken ', accessToken); */
        
        
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.RISK_SITUATION}/`;
        console.log('url post risk_situation ', url);
        console.log('data post risk_situation ', data);
        
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": 'application/json',
                    /* Authorization: `Bearer ${accessTokenString}`, */
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del post risk_situation", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRiskSituation(accessToken, id_institution) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.RISK_SITUATION}`;
        console.log('url get getRiskSituation ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del getRiskSituation", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}   
