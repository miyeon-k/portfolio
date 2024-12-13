import axios from 'axios';

const CABON_MAP_LIST = '/api/getCabonMapList'
const CABON_MAP_AREA_INFO = '/api/getCabonMapAreaInfo'
const CABON_MAP_PURCHASE_AREA = '/api/savePurchaseInfo'

export function getCabonMapList(param) {
    return axios.get(CABON_MAP_LIST , { params : param });
}

export function savePurchaseInfo(form) {
    return axios.post(CABON_MAP_PURCHASE_AREA , form , {headers: { "Content-Type": `application/json`}});
}

export function getCabonMapAreaInfo(param ) {
    return axios.get(CABON_MAP_AREA_INFO , { params : param });
}