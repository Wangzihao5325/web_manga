import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import SecurtyImage from '../../component/securtyImage/Image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const WIDTH = CLIENT_WIDTH - 24;
const HEIGHT = WIDTH / 2;

class BannerItem extends Component {
    render() {
        return (
            <div style={{ height: HEIGHT, width: WIDTH }}>
                <SecurtyImage borderRadius={5} style={{ height: HEIGHT, width: WIDTH }} source={this.props.item.cover_oss_filename} />
            </div>
        );
    }
}

export default class Banner extends Component {

    static defaultProps = {
        data: []
    }

    render() {
        return (
            <div style={{ height: HEIGHT, width: WIDTH, display: 'flex', flexDirection: 'column' }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    autoPlay={true}
                    interval={2000}
                >
                    {
                        this.props.data.map((item, index) => {
                            return <BannerItem key={index} item={item} />;
                        })
                    }
                </Carousel>
            </div>
        );
    }
}