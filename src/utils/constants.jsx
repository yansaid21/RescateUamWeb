const SERVER_IP = '192.168.20.21:8000';

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api`,
    API_ROUTES: {
        REGISTER: 'users',
        LOGIN: 'auth/login',
        GET_USERS: 'users',
        RISK_SITUATION: 'risk_situations',
        INCIDENT: 'incidents'
    }
};
