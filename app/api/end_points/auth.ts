import { $instance, $instanceForm } from '../instances'

export default {

    login(data: any) {
        return $instance.post(`auth/login`, JSON.stringify(data))
    },


    register(data: any) {
        return $instance.post(`auth/register`, JSON.stringify(data))
    },
}