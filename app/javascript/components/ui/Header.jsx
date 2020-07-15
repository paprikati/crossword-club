import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Iframe from 'react-iframe';

import { make_request } from '../../helpers';
import Login from './Login';

const Header = ({ user, isHome }) => {

    const [showSignInModal, updateShowSignInModal] = useState(false);

    const onLogout = () => {
        make_request(
            {
                method: 'delete',
                url: '/users/sign_out'
            })
            .then(function(response) {
                console.log(response);
                location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    // href="/users/sign_in"
    const home = <Button variant="primary" href="/">Home</Button>;
    const logout = <Button variant="primary" onClick={onLogout}>Logout</Button>;
    const signIn = <Button variant="primary" onClick={() => updateShowSignInModal(true)}>Sign In</Button>;

    return (
        <div className="header">
            {isHome ? null : home}
            <div className="text">Crossword Club</div>
            {user ? logout : signIn}
            <Login visible={showSignInModal} onHide={() => updateShowSignInModal(false)} />
        </div>
    );
};

export default Header;
