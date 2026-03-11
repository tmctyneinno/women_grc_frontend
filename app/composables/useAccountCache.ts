type CacheEntry<T> = {
  data: T
  ts: number
  ttl: number
}

type CacheStore = Record<string, CacheEntry<any>>

export const useAccountCache = () => {
  const cache = useState<CacheStore>('account-cache', () => ({}))

  const getCached = <T>(key: string): T | null => {
    const entry = cache.value[key]
    if (!entry) return null
    if (Date.now() - entry.ts > entry.ttl) return null
    return entry.data as T
  }

  const setCached = <T>(key: string, data: T, ttlMs = 120000) => {
    cache.value[key] = { data, ts: Date.now(), ttl: ttlMs }
  }

  const clearCached = (key: string) => {
    delete cache.value[key]
  }

  return { getCached, setCached, clearCached }
}
