import { v1 } from 'uuid';
import { addNewMessageAC, dialogsReducer, DialogsReducerStateType } from './Dialogs-reducer';

test('correct message should be added', () => {
  const startState: DialogsReducerStateType = {
    dialogs: [],
    messages: [
      {
        id: v1(),
        messageText: 'Hello!',
      },
      {
        id: v1(),
        messageText: 'Hey! See my new photos!',
      },
      {
        id: v1(),
        messageText: 'YO!!',
      },
      {
        id: v1(),
        messageText: 'I want some pizza...',
      },
    ],
  };

  const newMessageText = 'I want to add new message!!';
  const endState = dialogsReducer(startState, addNewMessageAC(newMessageText));

  expect(endState.messages.length).toBe(5);
  expect(endState.messages[4].messageText).toBe(newMessageText);
  expect(endState.dialogs.length).toBe(0);
});
