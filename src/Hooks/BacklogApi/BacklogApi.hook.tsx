import axios from 'axios'
import {Space, Project, User, errorMessages} from './backlogApiTypes'
export interface backlogApiContextType {
  getSpace: () => Promise<Space>,
  getUsers: () => Promise<User[]>,
  getUserIcon: (id: number) => Promise<string>
}

export const useBacklogApi = (spaceId: string, userApiKey: string): backlogApiContextType => {

  const createUrl = (apiUrl: string): string => {
    return 'https://' + spaceId + '.backlog.jp/api/v2/' + apiUrl + '?apiKey=' + userApiKey;
  }

  const getSpace = async () => {
    try {
      const responce =  await axios.get<Space>(createUrl('space'))
      const space: Space = responce.data
      return space
    } catch (err) {
      throw err.response.status === 401 ? errorMessages.getSpace[401]
          : err.response.status === 404    ? errorMessages.getSpace[404]
          : errorMessages.getSpace.default
    }
  }

  const getUsers = async () => {
    try {
      const users =  await axios.get<Project[]>(createUrl('projects'))
        .then(async res => {
          let _users = []
          await Promise.all(res.data.map(async val => {
            const user = await axios.get<[User]>(createUrl(`projects/${val.projectKey}/users`))
            return _users.push(...user.data)
          }))

          return _users.reduce((prev, user) => {
            if(!prev.some(e => e.id === user.id)) {
              prev.push(user)
            }
            return prev
          }, [])
        })
  
      return users
    } catch (err) {
      throw errorMessages.getUsers
    }
  }

  const getUserIcon = async (id: number) => {
    try {
      const responce = await axios.get(createUrl(`users/${id}/icon`), {
        'responseType': 'arraybuffer'
      })

      const base64 = new Buffer(responce.data, "binary").toString("base64")
      const prefix = `data:${responce.headers["content-type"]};base64,`

      return prefix + base64
    } catch (err){
      throw err
    }
  }

  return {
    getSpace,
    getUsers,
    getUserIcon
  }
}