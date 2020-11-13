import { getReplace, getRandom } from './util.js';

const productsTemplate = document.querySelector('#products_section').content.querySelector('.products_page');

const productsArea = document.querySelector('.product__area');

const updateProduct = (el) => {
  const cardElement = productsTemplate.cloneNode(true);

  const productCode = cardElement.querySelector('.product_code');
  const productTitle = cardElement.querySelector('.product_description .product__link');
  const goldPrice = cardElement.querySelector('.goldPrice');
  const retailPrice = cardElement.querySelector('.retailPrice');
  const bonusPrice = cardElement.querySelector('.product_price_points .ng-binding');
  const productsLinks = cardElement.querySelector('.product_tags');
  const productLink = productsLinks.querySelector('.url--link');
  const productPhoto = cardElement.querySelector('.product_photo img');
  const unitBtns = cardElement.querySelectorAll('.unit--select');
  const productCount = cardElement.querySelector('.product__count');
  const productCountArrows = cardElement.querySelectorAll('.stepper-arrow');
  const productID = cardElement.querySelector('.btn_cart');

  const getPriceMeter = () => {
    goldPrice.textContent = getReplace(el.priceGoldAlt.toFixed(2));
    retailPrice.textContent = getReplace(el.priceRetailAlt.toFixed(2));
    bonusPrice.textContent = `Можно купить за ${Math.floor(el.priceRetailAlt.toFixed(2) / 2)} балла`;
  };

  const getPricePack = () => {
    goldPrice.textContent = getReplace(el.priceGold.toFixed(2));
    retailPrice.textContent = getReplace(el.priceRetail.toFixed(2));
    bonusPrice.textContent = `Можно купить за ${Math.floor(el.priceRetail.toFixed(2) / 2)} балла`;
  };

  productCode.textContent = `Код: ${el.code}`;
  productTitle.textContent = el.title.split(' (')[0];
  getPriceMeter();
  productPhoto.src = el.primaryImageUrl.replace('.jpg', '_220x220_1.jpg');
  productID.dataset.productId = el.productId;

  const string = el.assocProducts.replace(/\n/g, ' ').replace(/[\;\;;]/g, ',').replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');

  const assoc = string.split(', ');

  for (let i = 0; i < assoc.length - 1; i++) {
    assoc[i] = assoc[i] + ', ';
  }

  productsLinks.querySelectorAll('.url--link').forEach((el) => {
    productsLinks.removeChild(el);
  });

  assoc.forEach((el) => {
    const link = productLink.cloneNode(true);
    productsLinks.appendChild(link);
    link.textContent = el;
  });

  Array.from(unitBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      cardElement.querySelector('.unit--active').classList.remove('unit--active');
      btn.classList.add('unit--active');

      if (btn.querySelector('.ng-binding').textContent === 'За м. кв.') {
        getPriceMeter();
      }
      else getPricePack();
    });
  });

  Array.from(productCountArrows).forEach((arrow) => {
    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('up')) {
        productCount.value++;
      }
      else {
        productCount.value--;
      }
    });
  });

  return cardElement;
}

const renderCard = (arr) => {
  let fragment = new DocumentFragment();

  arr.forEach((el) => {
    const card = updateProduct(el);
    fragment.append(card);
  })
  productsArea.append(fragment);
};

const successHandler = (data) => {
  renderCard(data);
};

const errorHandler = (message) => {
  console.log(message);
};

export { successHandler, errorHandler };