import {v1} from 'uuid';

const ADD_MESSAGE = 'ADD_MESSAGE';

export type DialogType = {
    userName: string
    id: string
}
export type MessageType = {
    id: string
    messageText: string
}

type AddNewMessageActionType = {
    type: typeof ADD_MESSAGE
    message: string
}
export const addNewMessageAC = (message: string): AddNewMessageActionType => {
    return {
        type: ADD_MESSAGE, message
    }
}

export type DialogsReducerStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
type ActionType = AddNewMessageActionType

const initialState: DialogsReducerStateType = {
    'dialogs': [
        {
            'userName': 'Dimych',
            'id': v1(),
        },
        {
            'userName': 'Andrew',
            'id': v1(),
        },
        {
            'userName': 'Sveta',
            'id': v1(),
        },
        {
            'userName': 'Sasha',
            'id': v1(),
        },
        {
            'userName': 'Viktor',
            'id': v1(),
        },
        {
            'userName': 'Valera',
            'id': v1(),
        },
    ],
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
    ],
}


export const dialogsReducer = (state: DialogsReducerStateType = initialState, action: ActionType): DialogsReducerStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages,
                    {id: v1(), messageText: action.message}]
            }
        }
        default:
            return state
    }
}