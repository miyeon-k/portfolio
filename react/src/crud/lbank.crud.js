import axios from 'axios';

const GET_NGR_PRICE = '/lbank/v2/ticker/24hr.do?symbol=ngr_usdt'
const GET_USD_PRICE = '/usd/v1/forex/recent?codes=FRX.KRWUSD'

export function getNgrPriceInfo(param) {
    return axios.get(GET_NGR_PRICE , {params: param});
}


export function getUSDPriceInfo(param) {
    return axios.get(GET_USD_PRICE , {params: param});
}