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
// DOM-購物車列表的ul
const cartList_ul = document.querySelector(`#cartList`);
allProductRender();
cartListRender();

// 初始化渲染全部產品
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

// 初始化渲染購物車列表
function cartListRender() {
  // * 撈取購物車列表資料
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts`
    )
    .then((res) => {
      let cartListStr = ``;
      res.data["carts"].map((item) => {
        console.log(item['id']);
        cartListStr += `<li class="flex items-center"><p class="min-w-[300px]">${item["product"]["title"]}</p><input cart_id=${item['id']} class="btn btn-hover" type="button" value="刪除商品" /></li>`;
        cartList_ul.innerHTML = cartListStr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// function cartListRender() {

// }

allProduct_ul.addEventListener("click", (e) => {
  if (e.target.type === "button") {
    console.log("點到了按鈕");
    addToCart(e);
  } else {
    return;
  }
});

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
