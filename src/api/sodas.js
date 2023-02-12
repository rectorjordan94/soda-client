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

// Create
export const createSoda = (user, newSoda) => {
    console.log('this is the user', user)
    console.log('this is the newSoda', newSoda)
    return axios({
        url: `${apiUrl}/sodas`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { soda: newSoda }
    })
}

// Update 
export const updateSoda = (user, updatedSoda) => {
    return axios({
        url: `${apiUrl}/sodas/${updatedSoda._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { soda: updatedSoda }
    })
}

// Delete 
export const removeSoda = (user, sodaId) => {
    return axios({
        url: `${apiUrl}/sodas/${sodaId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}