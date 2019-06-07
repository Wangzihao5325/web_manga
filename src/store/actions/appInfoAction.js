import * as Types from '../actionTypes';

export function add_app_info_url(officalUrl, shareUrl, potatoUrl, shareText) {
    return { type: Types.ADD_APP_INFO_URL, offical: officalUrl, share: shareUrl, potato: potatoUrl, shareText: shareText };
}
