import {v1} from 'uuid';
import {addNewMessageAC, dialogsReducer, DialogsReducerStateType} from './Dialogs-reduser';


test('correct message should be added', () => {
    let startState: DialogsReducerStateType = {
        'dialogs': [],
        'messages': [
            {
                'id': v1(),
                'messageText': 'Hello!'
            },
            {
                'id': v1(),
                'messageText': 'Hey! See my new photos!'
            },
            {
                'id': v1(),
                'messageText': 'YO!!'
            },
            {
                'id': v1(),
                'messageText': 'I want some pizza...'
            },
        ]
    }

    let newMessageText = 'I want to add new message!!';
    let endState = dialogsReducer(startState, addNewMessageAC(newMessageText));

    expect(endState.messages.length).toBe(5);
    expect(endState.messages[4].messageText).toBe(newMessageText);
    expect(endState.dialogs.length).toBe(0);
})