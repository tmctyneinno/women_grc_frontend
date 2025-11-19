
import api from '~/api';

interface PersonInterface {
    id: number;
    name: string;
    email: string;
}

export const useAuthStore = defineStore('authStore', () => {
    const token = useCookie('wigrcMorgnas#Tkn', {
        maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    const person = ref<PersonInterface | null>(null);

    const isLoggedIn = computed(() => !!token.value);
    const isAuthenticated = computed(() => isLoggedIn.value && !!person.value);
    const user = computed(() => person.value);

    const login = (authToken: string) => {
        token.value = authToken;
        nextTick(() => {
            window.location.reload();
        });
    };

    function logout() {
        try {
            api.logout();
        } catch (error) {
            // 
        }
        finally {
            token.value = null;
            person.value = null;
            window.location.reload();
        }
    }

    async function getProfile() {
        try {
            const { data } = await api.profile();
            person.value = data;
            return data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
            }
        }
    }

    return {
        person,
        user,
        token: readonly(token),
        isLoggedIn,
        isAuthenticated,
        login,
        logout,
        getProfile
    };
});