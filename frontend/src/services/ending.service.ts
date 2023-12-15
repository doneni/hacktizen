import axios from 'axios'
import { Ending } from '../models/ending'

const API_URL = import.meta.env.VITE_BACKEND_API_URL

class EndingService {
  async getEnding(): Promise<Ending> {
    const response = await axios.get(API_URL + 'ending/get-ending')

    return response.data
  }
}

export default new EndingService()