import request from '@/utils/request'

interface FriendLink{
  id:number
  name:string
  url:string
  avatar:string
  description:string
  my_description:string
}

export function getFriendLinks(): Promise<{ data: FriendLink[] }> {
  return request.get('/friendlinks/')
}
