import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';

const ITEM_WIDTH = (CLIENT_WIDTH - 24) / 7;

const MenuItem = ({ text, selected }) => {
    return (
        <div style={{ marginLeft: 6, marginRight: 6, height: 31, width: ITEM_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={
                    {
                        height: 31,
                        width: 52,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: selected ? 'white' : 'rgb(34,34,34)',
                        borderRadius: 15,
                        backgroundColor: selected ? 'rgb(255,42,49)' : 'white',
                        borderStyle: 'solid',
                        borderColor: selected ? 'white' : 'rgb(34,34,34)',
                        borderWidth: 1

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
    list.map(el => {
        const { name } = el;
        return <MenuItem text={name} key={name} selected={selected} />;
    });