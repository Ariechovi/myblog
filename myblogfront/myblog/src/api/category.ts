import request from '@/utils/request.ts'

export const getCategory = async () => {
  const response = await request.get('/category/')
  return response.data
}
