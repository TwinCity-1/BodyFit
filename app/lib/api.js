import axios from 'axios'

const api = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': "2763ac27d0msh9a1c7c31741c2f1p19d8c3jsn4c45f5cda429",
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
})

// Add this function
export const checkApiStatus = async () => {
  try {
    // Try to fetch a single exercise as a health check
    await api.get('/exercises?limit=1')
    return true
  } catch (error) {
    console.error('API Status Check Failed:', error)
    return false
  }
}

export const fetchExercises = async (page = 1, limit = 100) => { // Increased default limit
  try {
    const offset = (page - 1) * limit
    const response = await api.get(`/exercises?limit=${limit}&offset=${offset}`)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}