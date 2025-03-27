import axios from 'axios'

const api = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': "2763ac27d0msh9a1c7c31741c2f1p19d8c3jsn4c45f5cda429",
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
})

// Add this new function
export const checkApiStatus = async () => {
  try {
    const response = await api.get('/status')
    return response.data
  } catch (error) {
    console.error('API Status Check Failed:', error)
    return null
  }
}

// Keep your existing exercises function
export const fetchExercises = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit
    const response = await api.get(`/exercises?limit=${limit}&offset=${offset}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch exercises:', error)
    throw error
  }
}