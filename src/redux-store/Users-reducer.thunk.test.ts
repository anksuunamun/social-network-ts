import { CommonResponseType, followAPI } from '../data-access-layer/api';
import { followThunkAC, FollowUserAC, setDisabledButtonAC, unfollowThunkAC } from './Users-reducer';

//Mocks a module with an auto-mocked version when it is being required. factory and options are optional.
jest.mock('../data-access-layer/api');

// Our mock of `followAPI` is now fully typed
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;

//Returns a new, unused mock function. Optionally takes a mock implementation.
const mockedDispatch = jest.fn();
const mockedGetState = jest.fn();

const result: CommonResponseType<{}> = {
  resultCode: 0,
  messages: [],
  data: {},
};

beforeEach(() => {
  mockedDispatch.mockClear();
  mockedGetState.mockClear();
});

test('follow thunk should works correct', async () => {
  followAPIMock.follow.mockReturnValue(Promise.resolve(result));

  const followThunk = followThunkAC(1);
  await followThunk(mockedDispatch, mockedGetState, {});

  expect(mockedDispatch).toBeCalledTimes(3);
  expect(mockedDispatch).toHaveBeenNthCalledWith(1, setDisabledButtonAC(1, true));
  expect(mockedDispatch).toHaveBeenNthCalledWith(2, FollowUserAC(1));
  expect(mockedDispatch).toHaveBeenNthCalledWith(3, setDisabledButtonAC(1, false));
});

test('unfollow thunk should works correct', async () => {
  followAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

  const unfollowThunk = unfollowThunkAC(1);
  await unfollowThunk(mockedDispatch, mockedGetState, {});

  expect(mockedDispatch).toBeCalledTimes(3);
  expect(mockedDispatch).toHaveBeenNthCalledWith(1, setDisabledButtonAC(1, true));
  expect(mockedDispatch).toHaveBeenNthCalledWith(2, FollowUserAC(1));
  expect(mockedDispatch).toHaveBeenNthCalledWith(3, setDisabledButtonAC(1, false));
});
