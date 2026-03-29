import { $instance, $instanceForm } from '../instances'

export default {
    forumList(params: Record<string, any> = {}) {
        return $instance.get('forums', { params })
    },

    forumCreate(payload: any) {
        return $instance.post('forums', payload)
    },

    forumDetails(forumId: string | number) {
        return $instance.get(`forums/${forumId}`)
    },

    forumDelete(forumId: string | number) {
        return $instance.delete(`forums/${forumId}`)
    },

    forumJoin(forumId: string | number) {
        return $instance.post(`forums/${forumId}/join`)
    },

    forumLeave(forumId: string | number) {
        return $instance.post(`forums/${forumId}/leave`)
    },

    forumInvite(forumId: string | number, payload: { user_id: number }) {
        return $instance.post(`forums/${forumId}/invite`, payload)
    },

    forumInvitations() {
        return $instance.get('forums/invitations')
    },

    forumRespondInvitation(invitationId: number | string, action: 'accept' | 'decline') {
        return $instance.post(`forums/invitations/${invitationId}/respond`, { action })
    },

    forumThreads(forumId: string | number, params: Record<string, any> = {}) {
        return $instance.get(`forums/${forumId}/threads`, { params })
    },

    forumCreateThread(forumId: string | number, payload: { title: string; content?: string }) {
        return $instance.post(`forums/${forumId}/threads`, payload)
    },

    forumPosts(forumId: string | number, threadId: string | number, params: Record<string, any> = {}) {
        return $instance.get(`forums/${forumId}/threads/${threadId}/posts`, { params })
    },

    forumCreatePost(forumId: string | number, threadId: string | number, payload: any, hasFile = false) {
        if (hasFile) {
            return $instanceForm.post(`forums/${forumId}/threads/${threadId}/posts`, payload)
        }
        return $instance.post(`forums/${forumId}/threads/${threadId}/posts`, payload)
    },

    forumReactPost(postId: string | number, reaction: 'like' | 'dislike') {
        return $instance.post(`forums/posts/${postId}/react`, { reaction })
    },

    forumReportPost(postId: string | number, payload: { reason?: string; details?: string }) {
        return $instance.post(`forums/posts/${postId}/report`, payload)
    },

    forumNotifications() {
        return $instance.get('forums/notifications')
    },

    forumNotificationPreferences() {
        return $instance.get('forums/notification-preferences')
    },

    forumUpdateNotificationPreferences(payload: any) {
        return $instance.post('forums/notification-preferences', payload)
    },
}
