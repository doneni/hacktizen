import axios from 'axios'
import { Records } from '../models/record'

const API_URL = import.meta.env.VITE_BACKEND_API_URL

class RecordService {
  async getAllRecords(): Promise<Records> {
    const response = await axios.get(API_URL + 'record/get-all-records')

    return response.data
  }
}

export default new RecordService()