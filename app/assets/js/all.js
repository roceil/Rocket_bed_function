// ! API-route
const route = `rocket-frank`;
// ! API-token
const token = `xWFBP5xYVHNDhUnNY6F5oYdQSIB3`;
// // ! 暫存產品列表data
// let allProductData = [];
// // ! 暫存購物車列表data
// let cartListData = [];

// DOM-全部產品列表的ul
const allProduct_ul = document.querySelector(`#allProduct`);
// DOM-全部產品列表的選單按鈕
const allProductType_btn = document.querySelector("#allProductType");
// DOM-購物車列表的ul
const cartList_ul = document.querySelector(`#cartList`);
// DOM-清空購物車的btn
const clearAllCart_btn = document.querySelector(`#clearAllCart_btn`);

allProductRender();
cartListRender();

// 函式 => 初始化渲染全部產品
function allProductRender() {
  // * 撈取所有產品資料
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/products`
    )
    .then((res) => {
      let allProductStr = ``;
      res.data["products"].map((item) => {
        allProductStr += `<li class="flex items-center">
        <p class="min-w-[300px]">${item["title"]}</p>
        <input
        id=${item["id"]}
        class="btn btn-hover addToCartBtn"
        type="button"
        value="加入購物車"
      />`;
        allProduct_ul.innerHTML = allProductStr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// 函式 => 初始化渲染購物車列表
function cartListRender() {
  // * 撈取購物車列表資料
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts`
    )
    .then((res) => {
      let cartListStr = ``;
      res.data["carts"].map((item) => {
        console.log(1);
        cartListStr += `<li class="flex items-center"><p class="min-w-[300px]">${item["product"]["title"]}</p><input cart_id=${item["id"]} class="btn btn-hover" type="button" value="刪除商品" /></li>`;
        cartList_ul.innerHTML = cartListStr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// 函式 => 加入購物車
function addToCart(e) {
  // * 撈取購物車列表資料
  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts
`,
      {
        data: {
          productId: `${e.target.id}`,
          quantity: 5,
        },
      }
    )
    .then((res) => {
      console.log(e.target.id);
      cartListRender();
    })
    .catch((err) => {
      console.log(err);
    });
}

//函式 => 清空購物車
function clearAllCart() {
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts
  `
    )
    .then((res) => {
      // cartListRender() => //? 按按鈕後不會重新渲染
      window.location.reload(); // !因為不會重新渲染，所以重新整理
    })
    .catch((err) => {
      console.log(err);
    });
}

// 監聽 => 全部產品類別選擇
allProductType_btn.addEventListener("change", (e) => {
  // console.log(e.target.value);
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/products`
    )
    .then((res) => {
      let allProductStr = ``;
      res.data["products"].map((item) => {
        console.log(item["category"]);
        if (e.target.value === item["category"]) {
          allProductStr += `<li class="flex items-center">
          <p class="min-w-[300px]">${item["title"]}</p>
          <input
          id=${item["id"]}
          class="btn btn-hover addToCartBtn"
          type="button"
          value="加入購物車"
        />`;
          allProduct_ul.innerHTML = allProductStr;
        } else if (e.target.value === "全部") {
          allProductRender();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// 監聽 => 加入購物車按鈕
allProduct_ul.addEventListener("click", (e) => {
  if (e.target.type === "button") {
    console.log("點到了按鈕");
    addToCart(e);
  } else {
    return;
  }
});
// 監聽 => 清空購物車按鈕
clearAllCart_btn.addEventListener("click", (e) => {
  clearAllCart();
});

function productSelect() {
  // * 撈取所有產品資料
}
