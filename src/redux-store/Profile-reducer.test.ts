import {
    addPostAC,
    changeLikesAC,
    profileReducer,
    ProfileReducerStateType, setIsFetchingAC,
    setProfileAC, setUserPhotoAC, setUserStatusAC,
    UserProfileType
} from './Profile-reducer';
import {v1} from 'uuid';


let startState: ProfileReducerStateType;

beforeEach(() => {
    startState = {
        'posts': [{
            'text': 'This is my first post!',
            'likes': '23',
            'id': v1(),
        },
            {
                'text': 'This is my second post!',
                'likes': '6',
                'id': v1(),
            },
            {
                'text': 'This is my third post!',
                'likes': '901',
                'id': v1(),
            },
            {
                'text': ' I like writing posts!!',
                'likes': '0',
                'id': v1(),
            }
        ],
        user: null,
        isFetching: true,
        userStatus: '',
    }
})

test('correct post should be added', () => {
    let newPostText = 'New post text';
    let endState = profileReducer(startState, addPostAC(newPostText));

    expect(endState.posts.length).toBe(5);
    expect(endState.posts[4].text).toBe(newPostText);

})

test('correct likes count should be added to correct post', () => {
    let endState = profileReducer(startState, changeLikesAC(startState.posts[0].id, 'up'));

    expect(endState.posts.length).toBe(4);
    expect(endState.posts[0].likes).toBe('24');
    expect(endState.posts[1].likes).toBe(startState.posts[1].likes);
})

test('correct likes count should be deleted from correct post', () => {
    let endState = profileReducer(startState, changeLikesAC(startState.posts[0].id, 'down'));

    expect(endState.posts.length).toBe(4);
    expect(endState.posts[0].likes).toBe('22');
    expect(endState.posts[1].likes).toBe(startState.posts[1].likes);
})

test('correct user data should be set', () => {
    let userData: UserProfileType = {
        aboutMe: 'I am a frontend developer',
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null,
        },
        fullName: 'Zoe',
        lookingForAJob: false,
        lookingForAJobDescription: 'I am not looking for a job! TY.',
        photos: {
            large: null,
            small: null,
        },
        userId: 122,
    }
    let endState = profileReducer(startState, setProfileAC(userData));

    expect(endState.user?.userId).toBe(122);
    expect(endState.user?.fullName).toBe('Zoe');
    expect(endState.user?.contacts.website).toBeNull();
})

test('isFetching value should be correct', () => {
    let isFetching = true;
    let endState = profileReducer(startState, setIsFetchingAC(isFetching));

    expect(endState.isFetching).toBeTruthy();
})

test('user photos should be correct', () => {
    let photo = 'photoUrl';
    let endState = profileReducer(startState, setUserPhotoAC(photo));

    expect(endState.user?.photos.large).toBe(photo);
    expect(endState.user?.photos.small).toBe(endState.user?.photos.large);
})

test('user status should be correct', () => {
    let status = 'Have a nice day everybody!';
    let endState = profileReducer(startState, setUserStatusAC(status));

    expect(endState.userStatus).toBe('Have a nice day everybody!');
})