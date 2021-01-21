import CryptoJS from "crypto-js";

export const encryptData = (data, key) => {
    console.log(data)
    console.log(key)
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decryptData = (data, key) => {
    return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, key)));
};
