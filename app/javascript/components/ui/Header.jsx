import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Login from './Login';
import Modal from 'react-bootstrap/Modal';
import { make_request } from '../../helpers';
import Iframe from 'react-iframe';

const Header = ({user}) => {

    const [showSignInModal, updateShowSignInModal] = useState(false);

    const onLogout = () => {
        make_request(
            {
                method: "delete",
                url: '/users/sign_out',
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

   // href="/users/sign_in"

    const logout =  <Button variant="primary" onClick={onLogout}>Logout</Button>;
    const signIn = <Button variant="primary" onClick={() => updateShowSignInModal(true)}>Sign In</Button>;

    return <div className="header">
        <div className="text">Crossword Club</div>
        {user ? logout : signIn}
        <Login visible={showSignInModal} onHide={() => updateShowSignInModal(false)} />
    </div>
}

export default Header