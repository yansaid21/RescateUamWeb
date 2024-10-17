import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES } = ENV;

export class Auth {
    baseapi = BASE_PATH;

    register = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.REGISTER}`;
        console.log(url);

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("response desde auth register -> ", response);

            return response.data;
        } catch (error) {
            console.log('data ', data);
            
            if (error.response) {
                console.error('Error al hacer register', error.response.data);
            } else {
                console.error('Error al hacer register', error.message);
            }
            throw error;
        }
    };

    login = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.LOGIN}`;
        console.log(url);
        const noActive = {
            active: false
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("retorno el json en auto login", response.data);
            return response.data;
        } catch (error) {
            console.error('Error al hacer login', error);
            return noActive;
        }
    };

}
