const SERVER_IP = 'rescueapi.xyz';
// server dns rescueapi.xyz
// general route with http 127.0.0.1:8000
// Geral's house 192.168.20.21
// jean's house 192.168.1.12
// jean's iphone 172.20.10.14


export const ENV = {
    BASE_PATH: `https://${SERVER_IP}/api`,
    API_ROUTES: {
        REGISTER: 'users',
        LOGIN: 'auth/login',
        GET_USERS: 'users',
        RISK_SITUATION: 'risk_situations',
        INCIDENT: 'incidents',
        MEETPOINT: 'meet_points',
        ZONES: 'zones',
        ROOMS: 'rooms'
    }
};
