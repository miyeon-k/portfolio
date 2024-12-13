import axios from 'axios';

const GET_EXIST_USER_INFO = '/api/user/getExistUserInfo'
const GET_USER_INFO = '/api/user/getUserInfo'
const SAVE_USER_INFO = '/api/user/saveUserInfo'


export function getExistUserInfo(param) {
    return axios.get(GET_EXIST_USER_INFO , {params: param});
}

export function getUserInfo(param) {
    return axios.post(GET_USER_INFO , param, {headers: { "Content-Type": `application/json`}});
}

export function saveUserInfo(param) {
    return axios.post(SAVE_USER_INFO , param, {headers: { "Content-Type": `application/json`}});
}