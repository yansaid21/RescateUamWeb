const SERVER_IP = '127.0.0.1:8000';
// server dns rescueapi.xyz
// general route with http 127.0.0.1:8000
// Geral's house 192.168.20.21
// jean's house 192.168.1.12
// jean's iphone 172.20.10.14


export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api`,
    API_ROUTES: {
        REGISTER: 'users',
        LOGIN: 'auth/login',
        GET_USERS: 'users',
        RISK_SITUATION: 'risk_situations',
        INCIDENT: 'incidents',
        MEETPOINT: 'meet_points',
        ZONES: 'zones'
    }
};
