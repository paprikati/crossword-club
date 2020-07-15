import React from 'react'
import Button from 'react-bootstrap/Button';
import { EyeFill, PlusSquareFill, PencilSquare, GridFill } from 'react-bootstrap-icons';

const Home = ({ user }) => {
    user = user || {};

    const buttonConfig = [
        {
            key: 'view',
            href: '/crosswords',
            text: 'View Crosswords',
            icon: <EyeFill/>
        },
        {
            key: 'create',
            href: '/crosswords/new',
            text: 'Create Crossword',
            icon: <PlusSquareFill/>
        },
        {
            key: 'edit',
            href: '/crosswords/edit',
            text: 'Edit Crosswords',
            hidden: !user.crossword_count > 0,
            icon: <PencilSquare/>
        },
        {
            key: 'grids',
            href: '/grids/new',
            text: 'Create New Grid',
            hidden: !user,
            icon: <GridFill/>
        },
    ];

    return <div className="home">
        <div className="background">
            <div className="top-bar"/>
            <div className="bottom-bar"/>
        </div>
        <div className="buttons">
        {
            buttonConfig.map(btn => {
                if (btn.hidden) return;
                return <Button variant="outline-dark" className="home-btn" key={btn.key} href={btn.href}>
                    <div className="icon">{btn.icon}</div>
                    <div className="text">{btn.text}</div>
                </Button>
            })
        }
        </div>
    </div>
}

export default Home