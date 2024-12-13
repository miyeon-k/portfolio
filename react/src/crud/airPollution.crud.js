import axios from 'axios';

const AIR_POLLUTION_INFO = '/api/getSidoAirPollution'

export function getSidoAirPollution(param) {
    return axios.get(AIR_POLLUTION_INFO , { params : param });
}