import md5 from "md5";

const privateKey = process.env.REACT_APP_MARVEL_API_PRI_KEY;
const publicKey = process.env.REACT_APP_MARVEL_API_PUB_KEY;
const url = process.env.REACT_APP_MARVEL_URL;

const ts = Date.now();

export const getCharactersUrl = () => {
  return `${url}/characters?ts=${ts}&apikey=${publicKey}&hash=${md5(
    ts + privateKey + publicKey
  )}`;
};

export const getCharacterInfoUrl = (id) => {
  return `${url}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${md5(
    ts + privateKey + publicKey
  )}`;
};
