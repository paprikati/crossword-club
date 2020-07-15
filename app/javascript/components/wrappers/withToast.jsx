import React, {useState} from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import { v4 as uuid } from 'uuid';

const withToast = Component => (props) => {

    const [toasts, updateToasts] = useState({});

    // toast_type can be success or error
    const addMessage = (message, toast_type) => {
        updateToasts({...toasts, [uuid()]: {message, toast_type }});
    };

    const closeToast = id => {
        console.log('close toast');
        updateToasts(existingToasts => {
            let newToasts = {...existingToasts};
            delete newToasts[id];
            return newToasts;
        });
    };

    const API = {
        error: message => addMessage(message, 'error'),
        success: message => addMessage(message, 'success'),
        warning: message => addMessage(message, 'warning')
    };

    return (
        <>
        <div className="toasts" style={{position:'absolute', top: '65px', right: 0}}>
        {
            Object.entries(toasts).map(([id, {message, toast_type}]) => (
                <Toast className={toast_type} onClose={() => closeToast(id)} autohide delay={2000} key={id}>
                    <ToastHeader>
                        <div className="message"> {message}</div>
                    </ToastHeader>
                </Toast>
            ))
        }
        </div>
        <Component {...props} toast={API}/>
    </>);
}

export default withToast


