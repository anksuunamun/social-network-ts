import axios from 'axios';
import {UserType} from '../redux-store/Users-reducer';
import {UserProfileType} from '../redux-store/Profile-reducer';


type CommonResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}
type UserResponseType = {
    items: UserType[]
    error: string | null
    totalCount: number
}
type AuthResponseType = {
    id: number
    email: string
    login: string
}
type PhotoResponseType = {
    photos: {
        small: string
        large: string
    }
}

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
        return instance.get<UserProfileType>(`profile/${userId}`).then(
            response => response.data
        )
    },

    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(
            response => response.data
        )
    },

    updateProfilePhoto(formData: any) {
        return instanceForMedia.put<CommonResponseType<PhotoResponseType>>(`profile/photo`, formData).then(
            response => response.data
        )
    },
    updateUserStatus(status: string) {
        return instance.put<CommonResponseType<{}>>(`profile/status`, {status}).then(
            response => response
        )
    },
}

export const usersAPI = {
    getUsers(portionSize: number, currentPage: number) {
        return instance.get<UserResponseType>(`users?count=${portionSize}&page=${currentPage}`).then(
            response => response.data
        )
    }
}

export const authAPI = {
    getAuth() {
        return instance.get<CommonResponseType<AuthResponseType>>(`auth/me`).then(
            response => response.data
        )
    },
}

export const followAPI = {
    follow(userId: number) {
        return instance.post<CommonResponseType<{}>>(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<CommonResponseType<{}>>(`follow/${userId}`)
            .then(response => response.data)
    },
}