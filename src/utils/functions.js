/* eslint-disable import/prefer-default-export */
export function generateId(len) {
  function dec2hex(dec) {
    return dec.toString(16).padStart(2, '0');
  }
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
