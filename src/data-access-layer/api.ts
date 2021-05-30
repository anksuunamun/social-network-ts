import axios from 'axios';
import {UserType} from '../redux-store/Users-reducer';
import {UserProfileType} from '../redux-store/Profile-reducer';
import {FormDataType} from '../Components/Profile/ProfileInfo/ProfileContacts/ProfileContactsEditForm';


export type CommonResponseType<T> = {
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

export type UpdateProfileRequestType = FormDataType & { userId: string }

const instance = axios.create({
    'baseURL': 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ab4073b3-e602-4190-9ab5-ec0d40796ddb',
    }
})

const instanceForMedia = axios.create({
    'baseURL': 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ab4073b3-e602-4190-9ab5-ec0d40796ddb',
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

    updateProfilePhoto(formData: Blob) {
        return instanceForMedia.put<CommonResponseType<PhotoResponseType>>(`profile/photo`, formData).then(
            response => response.data
        )
    },
    updateUserStatus(status: string) {
        return instance.put<CommonResponseType<{}>>(`profile/status`, {status}).then(
            response => response
        )
    },
    updateUserProfile(data: UpdateProfileRequestType) {
        return instance.put<CommonResponseType<{}>>('/profile', data)
            .then(response => response.data)
    }
}

export const usersAPI = {
    getUsers(portionSize: number, currentPage: number, term: string = '', friend: boolean | null = null) {
        return instance.get<UserResponseType>(`users?count=${portionSize}&page=${currentPage}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data
            )
    }
}

export const authAPI = {
    getAuth() {
        return instance.get<CommonResponseType<AuthResponseType>>(`auth/me`).then(
            response => response.data
        )
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string = '') {
        return instance.post<CommonResponseType<{ userId: number } | {}>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(
                response => response.data
            )
    },
    logout() {
        return instance.delete<CommonResponseType<{}>>(`/auth/login`)
            .then(response => response.data)
    },
    getCaptchaUrl() {
        return instance.get<{ url: string }>('/security/get-captcha-url')
            .then(response => response.data)
    }
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