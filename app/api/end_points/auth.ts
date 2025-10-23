import { $instance, $instanceForm } from '../instances'

export default {

    login(data: any) {
        return $instance.post(`login`, JSON.stringify(data))
    },


    register(data: any) {
        return $instance.post(`register`, JSON.stringify(data))
    },
}