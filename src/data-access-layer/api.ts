import axios from 'axios';


const instance = axios.create({
    'baseURL': 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7adf2309-2d93-43e6-88f1-3d5c166ae533',
    }
})

const instanceForMedia = axios.create({
    'baseURL': 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7adf2309-2d93-43e6-88f1-3d5c166ae533',
        'Content-Type': 'multipart/form-data'
    }
})

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(
            response => response.data
        )
    },

    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(
            response => response.data
        )
    },

    updateProfilePhoto(formData: any) {
        return instanceForMedia.put(`profile/photo`, formData).then(
            response => response.data
        )
    },
    updateUserStatus(status: string) {
        return instance.put(`profile/status`, {status}).then(
            response => response
        )
    },
}

export const usersAPI = {
    getUsers(portionSize: number, currentPage: number) {
        return instance.get(`users?count=${portionSize}&page=${currentPage}`).then(
            response => response.data
        )
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then(
            response => response.data
        )
    },
}