var categories,
    types,
    products;

/* ----- XHR for each json file ----- */

var categoriesXHR = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'categories.json'
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var typesXHR = function(result_of_categoriesXHR) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'types.json',
      data: result_of_categoriesXHR
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var productsXHR = function(result_of_typesXHR) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'products.json',
      data: result_of_typesXHR
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

/* ----- Load arrays of all separate json files on page load in order categories -> types -> products ----- */
$(document).ready(function() {
  categoriesXHR()
  .then(function(data1) {
    categories = data1;
    return typesXHR();
  })
  .then(function(data2) {
    types = data2;
    return productsXHR(data2);
  })
  .then(function (data3) {
    products = data3.products;
    console.log(categories, types, products);
  });
})

console.log(categories);

// ----- Make keys/values in products object accessible ----- //
var accessProductInfo = function() {
  var myProducts = products[0];
  console.log("my products", myProducts);
  for (var product in myProducts) { // create something for DOM
    console.log('product', myProducts[product].name);
  };
};

//select fireworks or demolition
$('#fireworksCat').click(function () {

});

$('#demolitionCat').click(function () {

});


//on select, use Promises to read from categories.json to load the array of objects


// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.

