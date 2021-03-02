import { soDigitos } from "./helpers";

export const checkPlayerName = playerName =>
  new Promise(resolve => {
    const available = !!playerName.match(/^[A-Za-z]+($|_[A-Za-z]+$)/i);
    // if we return `true` then validation has passed
    setTimeout(() => resolve(available), 1);
  });

export const checkPassword = password =>
  new Promise(resolve => {
    const available = !!password.match(/^[a-zA-Z,0-9,\$\!\@\#\$\%\^\&\*\(\)\-\=\+\_\;\'\"\{\}\[\]\?\/\.\,\<\>\:\ˆ]+$/i);
    // if we return `true` then validation has passed
    setTimeout(() => resolve(available), 1);
  });

export const checkBrazilianPhone = phone =>
  new Promise(resolve => {
    const available = !!soDigitos(phone).match(/^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$/);
    // if we return `true` then validation has passed
    setTimeout(() => resolve(available), 1);
  });
