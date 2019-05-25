// /crypto/rollups/aes.js');
// /crypto/components/mode-ecb.js');
// /crypto/components/enc-u8arr.js');
let key = '$uploadKey';// wPK8CxWaOwPuVzgs
function process(buffer, id) {
    var decryptedData = decrypt(buffer);
    //把解密后的对象再转为base64编码,这步是关键,跟解密文字不同
    var d64 = decryptedData.toString(CryptoJS.enc.Base64);
    $(".img-thumbnail,.file-preview-image")[id].src = "data:image/jpeg;base64," + d64;
}
function decrypt(data) {
    // 接收的是ArrayBuffer
    u8array = new Uint8Array(data);
    // 将u8array转换成WordArray
    data = CryptoJS.enc.u8array.parse(u8array);
    // 要求密文是base64格式
    data = data.toString(CryptoJS.enc.Base64);
    // 解密key
    var decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Latin1.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted;
}
//如果获取图片失败,尝试再获取一次
function retry(url, id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        if (xhr.status == 200) {
            process(xhr.response, id);
        }
    };
    xhr.send();
}

$(function () {
    $(".img-thumbnail,.file-preview-image").each(function (j, item) {
        // 你要实现的业务逻辑
        let url = item.src;
        var xhr = new XMLHttpRequest();
        if (url && url.indexOf(".ceb") != -1) {
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.timeout = 3000;
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        process(xhr.response, j);
                    } else {
                        retry(url, j);
                    }
                }
            }
            xhr.ontimeout = function () {
                retry(url, j);
            }
            xhr.send();
        }
    });
});