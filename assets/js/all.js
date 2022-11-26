"use strict";

// ! API-route
var route = "rocket-frank"; // ! API-token

var token = "xWFBP5xYVHNDhUnNY6F5oYdQSIB3"; // // ! 暫存產品列表data
// let allProductData = [];
// // ! 暫存購物車列表data
// let cartListData = [];
// DOM-全部產品列表的ul

var allProduct_ul = document.querySelector("#allProduct"); // DOM-購物車列表的ul

var cartList_ul = document.querySelector("#cartList");
allProductRender();
cartListRender(); // 初始化渲染全部產品

function allProductRender() {
  // * 撈取所有產品資料
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/products")).then(function (res) {
    var allProductStr = "";
    res.data["products"].map(function (item) {
      allProductStr += "<li class=\"flex items-center\">\n        <p class=\"min-w-[300px]\">".concat(item["title"], "</p>\n        <input\n        id=").concat(item["id"], "\n        class=\"btn btn-hover addToCartBtn\"\n        type=\"button\"\n        value=\"\u52A0\u5165\u8CFC\u7269\u8ECA\"\n      />");
      allProduct_ul.innerHTML = allProductStr;
    });
  })["catch"](function (err) {
    console.log(err);
  });
} // 初始化渲染購物車列表


function cartListRender() {
  // * 撈取購物車列表資料
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/carts")).then(function (res) {
    var cartListStr = "";
    res.data["carts"].map(function (item) {
      console.log(item['id']);
      cartListStr += "<li class=\"flex items-center\"><p class=\"min-w-[300px]\">".concat(item["product"]["title"], "</p><input cart_id=").concat(item['id'], " class=\"btn btn-hover\" type=\"button\" value=\"\u522A\u9664\u5546\u54C1\" /></li>");
      cartList_ul.innerHTML = cartListStr;
    });
  })["catch"](function (err) {
    console.log(err);
  });
} // function cartListRender() {
// }


allProduct_ul.addEventListener("click", function (e) {
  if (e.target.type === "button") {
    console.log("點到了按鈕");
    addToCart(e);
  } else {
    return;
  }
});

function addToCart(e) {
  // * 撈取購物車列表資料
  axios.post("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/carts\n"), {
    data: {
      productId: "".concat(e.target.id),
      quantity: 5
    }
  }).then(function (res) {
    console.log(e.target.id);
    cartListRender();
  })["catch"](function (err) {
    console.log(err);
  });
}
//# sourceMappingURL=all.js.map
