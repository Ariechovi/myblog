import request from '@/utils/request'

export const createArticle = (data: { title: string, content: string ,category:string | number }) => {
  return request.post('/articles/', data)
}

export const getArticleList = () => {
  return request.get('/articlelist/')
}

export const getArticleDetail = (id: number | string) => {
  return request.get(`/articles/${id}/`)
}

export const getLifeArticleList = () => {
  return request.get('/lifearticleslist/')
}

export const getLifeArticleDetail = (id: number | string ) => {
  return request.get(`/lifearticles/${id}/`)
}
