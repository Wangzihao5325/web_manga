import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';

const ITEM_WIDTH = (CLIENT_WIDTH - 24) / 5;

const MenuItem = ({ text, selected }) => {
    return (
        <div style={{ height: 29, width: ITEM_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={
                    {
                        height: 29,
                        width: ITEM_WIDTH - 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: selected ? 'rgb(255,42,49)' : 'rgb(168,168,168)',
                        fontWeight: 'bold',
                        borderRadius: 14,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: selected ? 'rgb(255,42,49)' : 'white',
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
    list.map(item => {
        return <MenuItem text={item.name} key={item.name} selected={selected} />;
    });

export const WIDTH = ITEM_WIDTH;