import { $instance } from '../instances'

export default {
    mentors(params?: any){
        return $instance.get('mentors', { params })
    },
    mentorDetails(id: number | string){
        return $instance.get(`mentors/${id}`)
    },
    applyForMentor(id: number | string, payload: any){
        return $instance.post(`mentors/${id}/apply`, payload)
    },
    applyAsMentor(payload: any){
        return $instance.post('mentors/apply-as-mentor', payload)
    },
    mentorshipApplications(params?: any){
        return $instance.get('mentorships/applications', { params })
    },
    myMentorships(params?: any){
        return $instance.get('mentorships/my', { params })
    }
}
