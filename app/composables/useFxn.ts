import Swal from 'sweetalert2'

export default {
    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },
}