import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';



function DialogsContainerAjax(props: any) {
    return (
        <>
            <Dialogs messages={props.messages} dialogs={props.dialogs}/>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        'dialogs': state.dialogsPage.dialogs,
        'messages': state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {}

}


export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainerAjax);