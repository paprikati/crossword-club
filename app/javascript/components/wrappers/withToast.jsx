import React, {useState} from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import { v4 as uuid } from 'uuid';

const withToast = (Component) => (props) => {

    const [toasts, updateToasts] = useState({});

    const addMessage = message => {
        updateToasts({...toasts, [uuid()]: message});
    }

    const closeToast = id => {
        updateToasts(existingToasts => {
            let newToasts = {...existingToasts};
            delete newToasts[id];
            return newToasts;
        });
    }

    return (
        <>
        <div className="toasts" style={{position:'absolute', top: '65px', right: 0}}>
        {
            Object.entries(toasts).map(([id, message]) => (
                <Toast onClose={() => closeToast(id)} delay={1000} autohide key={id}>
                    <ToastHeader>
                        {message}
                    </ToastHeader>
                </Toast>
            ))
        }
        </div>
        <Component {...props} sendToast={addMessage}/>
    </>);
}

export default withToast