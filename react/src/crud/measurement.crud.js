import axios from 'axios';

const GET_MONTH_MEASUREMENT = '/api/measurement/getMonthMeasurement'

export function getMonthMeasurement(param) {
    return axios.get(GET_MONTH_MEASUREMENT , {params: param});
}
