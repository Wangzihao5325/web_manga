import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import SecurtyImage from '../../component/securtyImage/Image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const WIDTH = CLIENT_WIDTH - 24;
const HEIGHT = WIDTH / 2;

class BannerItem extends PureComponent {

    static contextTypes = {
        GLOBAL_TYPE: PropTypes.string
    }

    render() {
        return (
            <div onClick={this.bannerPress} style={{ height: HEIGHT, width: WIDTH }}>
                <SecurtyImage borderRadius={5} style={{ height: HEIGHT, width: WIDTH }} source={this.props.item.cover_oss_filename} />
            </div>
        );
    }

    bannerPress = () => {
        const { GLOBAL_TYPE } = this.context;
        this.props.navi.push(`/manga_detail/${this.props.item.id}/${GLOBAL_TYPE}`);
    }
}

class Banner extends PureComponent {

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
                    showIndicators={false}
                >
                    {
                        this.props.data.map((item, index) => {
                            return <BannerItem key={index} item={item} navi={this.props.history} />;
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

const BannerWithRouter = withRouter(Banner);
export default BannerWithRouter;