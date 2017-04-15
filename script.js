var categories,
    types,
    products;

/* ----- XHR for each json file ----- */

var categoriesXHR = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'categories.json'
    }).done(function(data1) {
      resolve(data1);
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
    }).done(function(data2) {
      resolve(data2);
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
    }).done(function(data3) {
      resolve(data3);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

/* ----- Load arrays of all separate json files on page load in order categories -> types -> products ----- */
var getData = function() {
  $(document).ready(function() {
  categoriesXHR()
  .then(function(data1) {
    categories = data1.categories;
    return typesXHR();
  })
  .then(function(data2) {
    types = data2.types;
    return productsXHR(data2);
  })
  .then(function (data3) {
    products = data3.products;
    console.log(categories, types, products);
    accessCategoryInfo();
    accessProductInfo();
  });
})
};




// ----- Make keys/values in products object accessible ----- //
var accessCategoryInfo = function(){
 console.log(categories[0].name);
};

var accessProductInfo = function() {
  var myProducts = products[0];
  for (var product in myProducts) { // create something for DOM
    console.log('product', myProducts[product].name);
  };
};

// ----- select fireworks or demolition ----- //
$('#fireworksCat').click(function () {
  getData();
 // getData() needs to run on selection of demo or fire
});

$('#demolitionCat').click(function () {
  getData();
});



// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.

