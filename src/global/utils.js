const typeUtil = function (typeTitle) {
    let typeKey = 'hanman';
    switch (typeTitle) {
        case '韩漫':
            typeKey = 'hanman';
            break;
        case 'H漫画':
            typeKey = 'hman';
            break;
        case '动漫':
            typeKey = 'anime';
            break;
    }
    return typeKey;
}

export {
    typeUtil
}