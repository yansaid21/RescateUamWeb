const SERVER_IP = '192.168.117.11:8000';

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api`,
    API_ROUTES: {
        REGISTER: 'users',
        LOGIN: 'auth/login',
    }
};
