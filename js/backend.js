const URL_LOAD = `https://ormhildr.github.io/chaika-test/products.json`;

const SUCCESS_STATUS = 200;
const TIMEOUT_IN_MS = 10000;

const createXhr = (request, url, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === SUCCESS_STATUS) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(request, url);

  return xhr;
};

export const load = (onLoad, onError) => {
  createXhr(`GET`, URL_LOAD, onLoad, onError).send();
};
