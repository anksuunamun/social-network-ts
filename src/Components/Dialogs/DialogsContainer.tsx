import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux-store/redux-store';
import {addNewMessageAC, DialogsReducerStateType} from '../../redux-store/Dialogs-reduser';
import {Dispatch} from 'redux';


// function DialogsContainerAjax(props: any) {
//     return (
//         <>
//             <Dialogs messages={props.messages} dialogs={props.dialogs}/>
//         </>
//     )
// }

type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void
}

export type DialogsPropsType = MapDispatchToPropsType & DialogsReducerStateType;

const mapStateToProps = (state: AppStateType): DialogsReducerStateType => {
    return {
        'dialogs': state.dialogsPage.dialogs,
        'messages': state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (newMessage: string) => dispatch(addNewMessageAC(newMessage)),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);