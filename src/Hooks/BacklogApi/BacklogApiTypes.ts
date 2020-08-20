export const errorMessages = {
  getSpace: {
    'default': 'スペース情報を取得できませんでした。',
    401: 'スペースIDに対して登録されていないApiKeyが入力されています。',
    404: '入力されたスペースIDが見つかりません。',
  }
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