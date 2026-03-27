import { $instance, $instanceForm } from '../instances'

const articles = (params: Record<string, any> = {}) => {
  return $instance.get('articles', { params })
}

const article = (id: number | string) => {
  return $instance.get(`articles/${id}`)
}

const createArticle = (payload: Record<string, any> | FormData) => {
  if (payload instanceof FormData) {
    return $instanceForm.post('articles', payload)
  }
  return $instance.post('articles', payload)
}

export default {
  articles,
  article,
  createArticle,
}
