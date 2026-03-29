import { $instance } from '../instances'

export default {
    learningCourses(params: Record<string, any> = {}) {
        return $instance.get('learning/courses', { params })
    },

    learningCourseDetails(courseId: string | number) {
        return $instance.get(`learning/courses/${courseId}`)
    },

    learningEnroll(courseId: string | number) {
        return $instance.post(`learning/courses/${courseId}/enroll`)
    },

    learningPurchaseInitiate(courseId: string | number) {
        return $instance.post(`learning/courses/${courseId}/purchase/initiate`)
    },

    learningPurchaseConfirm(courseId: string | number, payload: { payment_reference: string }) {
        return $instance.post(`learning/courses/${courseId}/purchase/confirm`, payload)
    },

    learningMyCourses(params: Record<string, any> = {}) {
        return $instance.get('learning/my-courses', { params })
    },

    learningLeaderboard(params: Record<string, any> = {}) {
        return $instance.get('learning/leaderboard', { params })
    },

    learningAchievements() {
        return $instance.get('learning/achievements')
    },

    learningVerifyCertificate(verificationCode: string) {
        return $instance.get(`learning/certificates/verify/${verificationCode}`)
    },

    learningDownloadCertificate(certificateId: string | number) {
        return $instance.get(`learning/achievements/${certificateId}/download`, {
            responseType: 'blob'
        })
    },

    learningUpdateModuleProgress(courseId: string | number, moduleId: string | number, payload: {
        is_completed: boolean
        time_spent_minutes?: number
    }) {
        return $instance.post(`learning/courses/${courseId}/modules/${moduleId}/progress`, payload)
    },

    learningSubmitModuleQuiz(courseId: string | number, moduleId: string | number, payload: {
        answers: Record<string, string>
    }) {
        return $instance.post(`learning/courses/${courseId}/modules/${moduleId}/quiz/submit`, payload)
    },
}
