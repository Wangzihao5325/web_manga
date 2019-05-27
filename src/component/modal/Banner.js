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
                <SecurtyImage style={{ height: HEIGHT, width: WIDTH }} source={this.props.item.url} />
            </div>
        );
    }
}

export default class Banner extends Component {

    static defaultProps = {
        data: []
    }

    render() {
        const BannerItems = this.props.data.map((item) => {
            return <div><BannerItem item={item} /></div>;
        });
        return (
            <div style={{ height: HEIGHT, width: WIDTH }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    autoPlay={true}
                    interval={2000}
                >
                    {
                        BannerItems
                    }
                </Carousel>
            </div>
        );
    }
}