import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/sizes';
import SecurtyImage from '../../component/securtyImage/Image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Api from '../../socket/index';
import { ToastsStore } from 'react-toasts';


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
        if (this.props.item.type === 'LINK') {
            //window.location.href = this.props.item.redirect_url;
            if (this.props.isLogin) {
                Api.taskDone('CLICK_AD', (e, code, message) => {
                    console.log(message);
                });
            }
            window.open(this.props.item.redirect_url);
        }
        if (this.props.item.type === 'COMIC') {
            if (this.props.isLogin) {
                const { GLOBAL_TYPE } = this.context;
                this.props.navi.push(`/manga_detail/${this.props.item.comic_id}/${GLOBAL_TYPE}`);
            } else {
                ToastsStore.warning('请先登录');
            }
        }

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
                            return <BannerItem isLogin={this.props.isLogin} key={index} item={item} navi={this.props.history} />;
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        isLogin: store.user.isLogin,
    }
}

const BannerWithRouter = withRouter(connect(mapState2Props)(Banner));
export default BannerWithRouter;