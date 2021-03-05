import {
    FollowUserAC,
    setUsersAC,
    UnFollowUserAC,
    usersReducer,
    UsersReducerInitialStateType,
    UserType
} from './Users-reducer';


test('correct user should be followed', () => {
    let startState: UsersReducerInitialStateType = {
        users: [{
            followed: false,
            id: 15527,
            name: 'grigory95',
            photos:
                {
                    small: null,
                    large: null
                },
            status: null,
            uniqueUrlName: null,
        },
            {
                followed: true,
                id: 15521,
                name: 'grigory95',
                photos:
                    {
                        small: null,
                        large: null
                    },
                status: null,
                uniqueUrlName: null,
            }]
    }

    let userIdForFollow = 15527;
    let endState = usersReducer(startState, FollowUserAC(userIdForFollow));

    expect(endState.users[0].followed).toBeTruthy();
    expect(endState.users[1].followed).toBeTruthy();
    expect(endState.users.length).toBe(2);
})

test('correct user should be unfollowed', () => {
    let startState: UsersReducerInitialStateType = {
        users: [{
            followed: false,
            id: 15527,
            name: 'grigory95',
            photos:
                {
                    small: null,
                    large: null
                },
            status: null,
            uniqueUrlName: null,
        },
            {
                followed: true,
                id: 15521,
                name: 'grigory95',
                photos:
                    {
                        small: null,
                        large: null
                    },
                status: null,
                uniqueUrlName: null,
            }]
    }

    let userIdForFollow = 15521;
    let endState = usersReducer(startState, UnFollowUserAC(userIdForFollow));

    expect(endState.users[0].followed).toBeFalsy();
    expect(endState.users[1].followed).toBeFalsy();
    expect(endState.users.length).toBe(2);
})

test('correct users should be set', () => {
    let startState: UsersReducerInitialStateType = {
        users: []
    }

    let users: Array<UserType> = [{
        followed: false,
        id: 15527,
        name: 'grigory95',
        photos:
            {
                small: null,
                large: null
            },
        status: null,
        uniqueUrlName: null,
    },
        {
            followed: true,
            id: 15521,
            name: 'grigory95',
            photos:
                {
                    small: null,
                    large: null
                },
            status: null,
            uniqueUrlName: null,
        }]

    let endState = usersReducer(startState, setUsersAC(users))

    expect(endState.users[0].id).toBe(15527);
    expect(endState.users[1].id).toBe(15521);
    expect(endState.users.length).toBe(2);
})