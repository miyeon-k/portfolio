import axios from 'axios';

const GET_NOTICE_LIST = '/api/notice/getNoticeList'
const GET_NOTICE_INFO = '/api/notice/getNoticeInfo'
const GET_FILE_DOWNLOAD = '/api/notice/getNoticeFile'

export function getNoticeList(param) {
    return axios.get(GET_NOTICE_LIST , {params: param});
}

export function getNoticeInfo(param) {
    return axios.get(GET_NOTICE_INFO , {params: param});
}

export function getNoticeFile(param) {
    return axios.post(GET_FILE_DOWNLOAD , param ,  {responseType: 'blob'});
}
