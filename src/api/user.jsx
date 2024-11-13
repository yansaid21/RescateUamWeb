import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class User {

    async getUserInfo(accessToken, id) {
        const accessTokenString = accessToken.access; 
        const url = `${BASE_PATH}/${API_ROUTES.GET_USERS}/${id}`;
        //console.log('url get ', url);
        
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });

            //console.log("respuesta despues del getMe", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUser(accessToken, id, userData) {
        //se actualiza sin el email
        const accessTokenString = accessToken.access; 
        const url = `${BASE_PATH}/${API_ROUTES.GET_USERS}/${id}`;
        //console.log('url get ', url);

        const formData = new FormData();
        formData.append('_method', 'PUT'); 
        formData.append('name', userData.name);
        formData.append('last_name', userData.last_name);
        formData.append('id_card', userData.id_card);

        if (userData.rhgb) formData.append('rhgb', userData.rhgb);
        if (userData.phone_number) formData.append('phone_number', userData.phone_number);
        if (userData.social_security) formData.append('social_security', userData.social_security);
        if (userData.photo) formData.append('photo', userData.photo);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });

            console.log("Response: ", response.data);
            return response.data; 
        } catch (error) {
            console.error("Error updating user info:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
    async getRole(accessToken, institutionId, userId) {
        const accessTokenString = accessToken.access; 
        const url = `${BASE_PATH}/institutions/${institutionId}/users/${userId}`;
        console.log('url get in get role', url);

        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });

            console.log("respuesta despues del getRole", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

