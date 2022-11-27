"use strict";

// ! API-route
var route = "rocket-frank"; // ! API-token

var token = "xWFBP5xYVHNDhUnNY6F5oYdQSIB3"; // // ! 暫存產品列表data
// let allProductData = [];
// // ! 暫存購物車列表data
// let cartListData = [];
// DOM-全部產品列表的ul

var allProduct_ul = document.querySelector("#allProduct"); // DOM-全部產品列表的選單按鈕

var allProductType_btn = document.querySelector("#allProductType"); // DOM-購物車列表的ul

var cartList_ul = document.querySelector("#cartList"); // DOM-清空購物車的btn

var clearAllCart_btn = document.querySelector("#clearAllCart_btn");
allProductRender();
cartListRender(); // 函式 => 初始化渲染全部產品

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
} // 函式 => 初始化渲染購物車列表


function cartListRender() {
  // * 撈取購物車列表資料
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/carts")).then(function (res) {
    var cartListStr = "";
    res.data["carts"].map(function (item) {
      console.log(1);
      cartListStr += "<li class=\"flex items-center\"><p class=\"min-w-[300px]\">".concat(item["product"]["title"], "</p><input cart_id=").concat(item["id"], " class=\"btn btn-hover\" type=\"button\" value=\"\u522A\u9664\u5546\u54C1\" /></li>");
      cartList_ul.innerHTML = cartListStr;
    });
  })["catch"](function (err) {
    console.log(err);
  });
} // 函式 => 加入購物車


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
} //函式 => 清空購物車


function clearAllCart() {
  axios["delete"]("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/carts\n  ")).then(function (res) {
    // cartListRender() => //? 按按鈕後不會重新渲染
    window.location.reload(); // !因為不會重新渲染，所以重新整理
  })["catch"](function (err) {
    console.log(err);
  });
} // 監聽 => 全部產品類別選擇


allProductType_btn.addEventListener("change", function (e) {
  // console.log(e.target.value);
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(route, "/products")).then(function (res) {
    var allProductStr = "";
    res.data["products"].map(function (item) {
      console.log(item["category"]);

      if (e.target.value === item["category"]) {
        allProductStr += "<li class=\"flex items-center\">\n          <p class=\"min-w-[300px]\">".concat(item["title"], "</p>\n          <input\n          id=").concat(item["id"], "\n          class=\"btn btn-hover addToCartBtn\"\n          type=\"button\"\n          value=\"\u52A0\u5165\u8CFC\u7269\u8ECA\"\n        />");
        allProduct_ul.innerHTML = allProductStr;
      } else if (e.target.value === "全部") {
        allProductRender();
      }
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); // 監聽 => 加入購物車按鈕

allProduct_ul.addEventListener("click", function (e) {
  if (e.target.type === "button") {
    console.log("點到了按鈕");
    addToCart(e);
  } else {
    return;
  }
}); // 監聽 => 清空購物車按鈕

clearAllCart_btn.addEventListener("click", function (e) {
  clearAllCart();
});

function productSelect() {// * 撈取所有產品資料
}
//# sourceMappingURL=all.js.map
