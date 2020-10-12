export const errorMessages = {
  getSpace: {
    'default': 'スペース情報を取得できませんでした。',
    401: 'スペースIDに対して登録されていないApiKeyが入力されています。',
    404: '入力されたスペースIDが見つかりません。',
  },
  getUsers: 'ユーザ一覧の取得に失敗しました'
} as const

export interface Space {
  "spaceKey": string, 
  "name": string, 
  "ownerId": number, 
  "lang": string, 
  "timezone": string, 
  "reportSendTime": string, 
  "textFormattingRule": string, 
  "created": string, 
  "updated": string
}

export interface Project {
  "id": number, 
  "projectKey": string, 
  "name": string, 
  "chartEnabled": boolean, 
  "subtaskingEnabled": boolean, 
  "projectLeaderCanEditProjectLeader": boolean, 
  "textFormattingRule": string, 
  "archived": boolean
}

export interface User {
  "id": number, 
  "userId": string, 
  "name": string, 
  "roleType": number, 
  "lang": string, 
  "mailAddress": string ,
  "nulabAccount": any
}