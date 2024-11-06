import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class MeetPoints {

    async createMeetPoint(accessToken, id_institution, data) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.MEETPOINT}`;
        console.log('url post createMeetPoint ', url);
        console.log('data en createMeetPoint', data);
        
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del post createMeetPoint", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getMeetPoints(accessToken, id_institution) {
        const url = `${BASE_PATH}/institutions/${id_institution}/${API_ROUTES.MEETPOINT}`;
        console.log('url get getMeetPoints ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("respuesta despues del getMeetPoints", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
