import React, { Component } from 'react';

class PhoneNumInput extends Component {
    render() {
        return (
            <div style={{ height: 67, width: document.body.clientWidth, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input type='text' />
            </div>
        );
    }
}

export {
    PhoneNumInput
}