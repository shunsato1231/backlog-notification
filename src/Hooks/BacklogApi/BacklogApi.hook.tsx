import axios from 'axios'
import {Space, errorMessages} from './backlogApiTypes'

export const useBacklogApi = (spaceId: string, userApiKey: string) => {

  const createUrl = (apiUrl: string): string => {
    return 'https://' + spaceId + '.backlog.jp/api/v2/' + apiUrl + '?apiKey=' + userApiKey;
  }

  const getSpace = async () => {
    try {
      const space =  await axios.get<Space>(createUrl('space'))
      return space
    } catch (err) {
      throw err.response.status === 401 ? errorMessages.getSpace[401]
          : err.response.status === 404    ? errorMessages.getSpace[404]
          : errorMessages.getSpace.default
    }
  }

  return {
    getSpace
  }
}