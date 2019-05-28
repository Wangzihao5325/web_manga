import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';

const ITEM_WIDTH = (CLIENT_WIDTH - 24) / 7;

const MenuItem = ({ text, selected }) => {
    return (
        <div style={{ height: 24, width: ITEM_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={
                    {
                        height: 24,
                        width: 45,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: selected ? 'white' : 'rgb(168,168,168)',
                        fontWeight: 'bold',
                        borderRadius: 12,
                        backgroundColor: selected ? 'rgb(255,42,49)' : 'white',

                    }
                }
            >
                {text}
            </div>
        </div>
    );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(element => {
        return <MenuItem text={element} key={element} selected={selected} />;
    });