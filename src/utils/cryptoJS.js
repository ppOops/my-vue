import CryptoJS from 'crypto-js'
// 解密方法
export const myDecrypt = function (word, keys) {
  var key = CryptoJS.enc.Utf8.parse(keys)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
export const myEncrypt = function (word, keys) {
  var key = CryptoJS.enc.Utf8.parse(keys)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
