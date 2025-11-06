export const getListProducts = (orders) => {
  const listOfProducts = orders.map((product) => product.orderItems);

  const list = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    const element = listOfProducts[i];
    for (let x = 0; x < element.length; x++) {
      list.push(element[x]);
    }
  }

  return list;
};
export const getListPaymentOrders = (orders) => {
  const listOfProducts = orders.map((product) => product.payment);
  const cash = listOfProducts.reduce((acc, cur) => acc + cur.cash, 0);
  const transfer = listOfProducts.reduce((acc, cur) => acc + cur.transfer, 0);
  const debt = listOfProducts.reduce((acc, cur) => acc + cur.debt, 0);

  return {
    cash,
    transfer,
    debt,
  };
};
export const repeatSum = (arr) => {
  let arrProductsNonDupli = [];
  let arrProductsIdCounted = [];
  arr.forEach((product, indxA, arrProducts) => {
    // validar si el product ya fue contado en la busqueda de duplicados
    const isCountryCounted = arrProductsIdCounted.includes(product.productId);
    // Si no ha sido contado
    if (!isCountryCounted) {
      arrProductsIdCounted.push(product.productId);

      // Buscar cuantas coincidencias existen del product en el array
      const elemToCount = arrProducts.filter(
        (ele) => ele.productId === product.productId
      );

      const country =
        elemToCount.length > 1
          ? {
              ...product,
              totalQuantity: elemToCount.reduce(
                (acc, cur) => acc + cur.totalQuantity,
                0
              ),
            }
          : product;

      arrProductsNonDupli.push(country);
    }
  });

  return arrProductsNonDupli;
};
