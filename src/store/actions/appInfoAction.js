import * as Types from '../actionTypes';

export function add_app_info_url(officalUrl, shareUrl) {
    return { type: Types.ADD_APP_INFO_URL, offical: officalUrl, share: shareUrl };
}
