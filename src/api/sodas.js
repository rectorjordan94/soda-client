import apiUrl from '../apiConfig'
import axios from 'axios'

//! READ -> Index
export const getAllSodas = () => {
    return axios(`${apiUrl}/sodas`)
}

//! READ -> Show
export const getOneSoda = (id) => {
    return axios(`${apiUrl}/sodas/${id}`)
}