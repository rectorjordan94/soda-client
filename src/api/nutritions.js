import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createNutrition = (sodaId, newNutrition) => {
    return axios({
        url: `${apiUrl}/nutritions/${sodaId}`,
        method: 'POST',
        data: { nutrition: newNutrition }
    })
}

// UPDATE
export const updateNutrition = (user, sodaId, updatedNutrition) => {
    return axios({
        url: `${apiUrl}/nutritions/${sodaId}/${updatedNutrition._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { nutrition: updatedNutrition }
    })
}

// DELETE
export const deleteNutrition = (user, sodaId, nutritionId) => {
    // console.log('this the toyId', toyId)
    return axios({
        url: `${apiUrl}/nutritions/${sodaId}/${nutritionId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}