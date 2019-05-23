import React, { Component } from 'react';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from '../../global/sizes';
import bg_image from '../../image/task/task_bg.jpg';
import header_bg_image from '../../image/task/task_header_bg.png';
import page_bg from '../../image/task/page_bg.png';
import './index.css';

export default class Task extends Component {
    render() {
        return (
            <div className='image-bg-container' style={{ height: CLIENT_HEIGHT * 2, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg_image})` }}>
                <div className='image-bg-container' style={{ height: 204, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', backgroundImage: `url(${header_bg_image})` }}>
                    <div style={{ marginTop: 50, marginLeft: 36, color: 'rgb(232,232,232)' }}>已拥有C币</div>
                    <div style={{ fontSize: 38, marginTop: 7, color: 'white', marginLeft: 35, fontWeight: 'bold' }}>2648</div>
                    <div style={{ marginLeft: 35, marginTop: 22, height: 32, width: 94, display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(212,81,52)', color: 'rgb(255,210,142)', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>立即充值</div>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <img style={{ height: 33, width: 351, marginLeft: 1 }} src={require('../../image/task/task_page_top.png')} alt='' />
                </div>
                <div className='image-bg-container' style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -20, height: 163, width: 320, alignSelf: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${page_bg})` }} ></div>
            </div>
        );
    }
}