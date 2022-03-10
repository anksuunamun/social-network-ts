import {
  FollowUserAC,
  SetCurrentPageAC,
  setDisabledButtonAC,
  setIsLoadingAC,
  SetSearchFilterAC,
  setTotalCountAC,
  setUsersAC,
  UnFollowUserAC,
  usersReducer,
  UsersReducerInitialStateType,
  UserType,
} from './Users-reducer';

let startState: UsersReducerInitialStateType;

beforeEach(() => {
  startState = {
    users: [
      {
        followed: false,
        id: 15527,
        name: 'grigory95',
        photos: {
          small: null,
          large: null,
        },
        status: null,
        uniqueUrlName: null,
      },
      {
        followed: true,
        id: 15521,
        name: 'grigory95',
        photos: {
          small: null,
          large: null,
        },
        status: null,
        uniqueUrlName: null,
      },
    ],
    totalCount: 0,
    currentPage: 1,
    portionSize: 9,
    isLoading: false,
    disabledButtons: [],
    filter: {
      friend: false,
      term: '',
    },
  };
});

test('correct user should be followed', () => {
  const userIdForFollow = 15527;
  const endState = usersReducer(startState, FollowUserAC(userIdForFollow));

  expect(endState.users[0].followed).toBeTruthy();
  expect(endState.users[1].followed).toBeTruthy();
  expect(endState.users.length).toBe(2);
});

test('correct user should be unfollowed', () => {
  const userIdForFollow = 15521;
  const endState = usersReducer(startState, UnFollowUserAC(userIdForFollow));

  expect(endState.users[0].followed).toBeFalsy();
  expect(endState.users[1].followed).toBeFalsy();
  expect(endState.users.length).toBe(2);
});

test('correct users should be set', () => {
  const startState: UsersReducerInitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    portionSize: 9,
    isLoading: false,
    disabledButtons: [],
    filter: {
      friend: false,
      term: '',
    },
  };

  const users: Array<UserType> = [
    {
      followed: false,
      id: 15527,
      name: 'grigory95',
      photos: {
        small: null,
        large: null,
      },
      status: null,
      uniqueUrlName: null,
    },
    {
      followed: true,
      id: 15521,
      name: 'grigory95',
      photos: {
        small: null,
        large: null,
      },
      status: null,
      uniqueUrlName: null,
    },
  ];

  const endState = usersReducer(startState, setUsersAC(users));

  expect(endState.users[0].id).toBe(15527);
  expect(endState.users[1].id).toBe(15521);
  expect(endState.users.length).toBe(2);
});

test('totalCount should be correct', () => {
  const endState = usersReducer(startState, setTotalCountAC(10));

  expect(endState.totalCount).toBe(10);
  expect(startState.totalCount).toBe(0);
});

test('isLoading should be correct', () => {
  const endState = usersReducer(startState, setIsLoadingAC(true));

  expect(endState.isLoading).toBe(true);
  expect(startState.isLoading).toBe(false);
});

test('currentPage should be correct', () => {
  const endState = usersReducer(startState, SetCurrentPageAC(5));

  expect(endState.currentPage).toBe(5);
  expect(startState.currentPage).toBe(1);
});

test('disabledButtons should be correct', () => {
  const endState = usersReducer(startState, setDisabledButtonAC(15527, true));

  expect(endState.disabledButtons).toEqual([15527]);
});

test('search filters should be correct', () => {
  const endState = usersReducer(startState, SetSearchFilterAC('1', true));

  expect(endState.filter).toEqual({
    friend: true,
    term: '1',
  });
});
