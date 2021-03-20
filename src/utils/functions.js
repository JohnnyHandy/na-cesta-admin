/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export function generateId(len) {
  function dec2hex(dec) {
    return dec.toString(16).padStart(2, '0');
  }
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function isoFormatDMY(d) {
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
}

export function parseISOString(s) {
  const b = s.split(/\D+/);
  const newDate = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  return isoFormatDMY(newDate);
}
