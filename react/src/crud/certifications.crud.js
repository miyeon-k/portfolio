import axios from 'axios';

const imp_key = '2027771512342018'
const imp_secret = 'nOxZTHhMvoSfjGEMBXiBqmyCjxguBtH7H0oqu7tDYK0exYnRW6ybJuvxBZkpXtcHYDeXfRXRFQt18i4A'
const geo_key = '0d2786c421de49138947'
const get_secret = '54c8ef263d854dddb9b1'

const GET_TOKEN_URL = 'iamport/users/getToken'
const GET_IAMPORT_USER_INFO_URL = 'iamport/certifications/'
const GET_GEO_API_TOKEN_URL = '/sgisapi/OpenAPI3/auth/authentication.json'
const GET_GEOJSON_INFO = '/sgisapi/OpenAPI3/boundary/hadmarea.geojson'
const GET_GEOJSON_KEY = '/sgisapi/OpenAPI3/addr/rgeocode.json'
const GET_GEO_LOCATION_INFO = '/sgisapi/OpenAPI3/addr/geocode.json'
const GET_STAGE_URL = '/sgisapi/OpenAPI3/addr/stage.json'

export const impKey= 'imp55776381'

export function getToken() {
    return axios.post(GET_TOKEN_URL , {imp_key: imp_key,imp_secret: imp_secret}, {headers: { "Content-Type": `application/json`}} , {mode: 'no-cors'});
}

export function getIamPortUserInfo(param  , token) {    
    return axios.get(GET_IAMPORT_USER_INFO_URL+param , {headers: { "Authorization": token }});
}

export function getGeoToken() {
    return axios.get(GET_GEO_API_TOKEN_URL+ '?consumer_key='+ geo_key+'&consumer_secret='+ get_secret, {headers: { "Content-Type": `application/json`}} , {mode: 'no-cors'});
}

export function getGeojsonKey(param) {
    return axios.get(GET_GEOJSON_KEY , { params : param });
}

export function getGeojsonInfo(param) {
    return axios.get(GET_GEOJSON_INFO , { params : param });
}

export function getStageUrl(param) {
    return axios.get(GET_STAGE_URL , { params : param });
}

export function getLocationInfo(param) {
    return axios.get(GET_GEO_LOCATION_INFO , { params : param });
}