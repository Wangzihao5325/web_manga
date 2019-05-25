import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
//import './scroll.css';

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
    return (
        <div style={{ height: 46, width: 80, display: 'flex', flexDirection: 'column' }}>
            <div
                style={
                    {
                        height: 43,
                        width: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: selected ? 'rgb(255,29,35)' : 'rgb(34,34,34)',
                        fontWeight: 'bold'
                    }
                }
            >
                {text}
            </div>
            <div style={
                {
                    display: 'flex',
                    alignSelf: 'center',
                    borderRadius: 1,
                    height: 3,
                    width: 20,
                    backgroundColor: selected ? 'rgb(255,29,35)' : 'white'
                }
            } />
        </div>
    );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(el => {
        const { name } = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });