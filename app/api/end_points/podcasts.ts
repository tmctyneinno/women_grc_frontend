import { $instance } from '../instances'

export default {
    podcasts(params: Record<string, any> = {}) {
        return $instance.get('podcasts', { params })
    },
    podcastDetails(podcastId: string | number) {
        return $instance.get(`podcasts/${podcastId}`)
    },
    podcastProgress() {
        return $instance.get('podcasts/progress/list')
    },
    podcastUpdateProgress(podcastId: string | number, payload: {
        last_position_seconds: number
        duration_seconds?: number
        progress_seconds?: number
        completed?: boolean
    }) {
        return $instance.post(`podcasts/${podcastId}/progress`, payload)
    },
}
