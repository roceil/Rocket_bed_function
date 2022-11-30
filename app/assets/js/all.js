// ! API-route
const route = `rocket-frank`;
// ! API-token
const token = `xWFBP5xYVHNDhUnNY6F5oYdQSIB3`;

// ! 全部產品渲染用資料集
let newData = [];
// ! 購物車清單渲染用資料集
let cartNewData = [];

// DOM => 全部產品列表的ul
const allProduct_ul = document.querySelector(`#allProduct`);
// DOM => 全部產品列表的選單按鈕
const allProductType_btn = document.querySelector("#allProductType");
// DOM => 購物車列表的ul
const cartList_ul = document.querySelector(`#cartList`);
// DOM => 清空購物車的btn
const clearAllCart_btn = document.querySelector(`#clearAllCart_btn`);
// DOM => 刪除購物車商品的btn
const deleteProduct_btn = document.querySelector(`#deleteProductBtn`);
// DOM => 送出訂單的form
const orderSubmit_form = document.querySelector(`#orderSubmit`);

// * 撈取所有產品資料
axios
  .get(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/products`
  )
  .then((res) => {
    newData = res.data;
    allProductRender();
  })
  .catch((err) => {
    console.log(err);
  });

// * 撈取購物車列表資料
axios
  .get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts`)
  .then((res) => {
    cartNewData = res.data;
    cartListRender();
  })
  .catch((err) => {
    console.log(err);
  });

// 函式 => 初始化渲染全部產品
function allProductRender() {
  let allProductStr = ``;
  newData["products"].map((item) => {
    allProductStr += `<li class="flex items-center">
    <p class="min-w-[300px]">${item["title"]}</p>
    <input
    data-id=${item["id"]}
    class="btn btn-hover addToCartBtn"
    type="button"
    value="加入購物車"
  />`;
    allProduct_ul.innerHTML = allProductStr;
  });
}

// 函式 => 初始化渲染購物車列表
function cartListRender() {
  if (cartNewData["carts"].length === 0) {
    let cartListStr = `<li class="text-xl font-bold">購物車沒有商品</li>`;
    cartList_ul.innerHTML = cartListStr;
  } else {
    let cartListStr = ``;
    cartNewData["carts"].map((item) => {
      cartListStr += `<li class="flex items-center"><p class="min-w-[300px]">${item["product"]["title"]}</p><input id="deleteProductBtn" cart-id=${item["id"]} class="btn btn-hover" type="button" value="刪除商品" /></li>`;
      cartList_ul.innerHTML = cartListStr;
    });
  }
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
          productId: `${e.target.getAttribute("data-id")}`,
          quantity: 5,
        },
      }
    )
    .then((res) => {
      // * 撈取購物車列表資料
      axios
        .get(
          `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts`
        )
        .then((res) => {
          cartNewData = res.data;
          cartListRender();
        })
        .catch((err) => {
          console.log(err);
        });
      cartListRender();
    })
    .catch((err) => {
      console.log(err);
    });
}

//函式 => 清空購物車
function clearAllCart() {
  cartNewData["carts"] = [];
  alert("購物車已清空");
  cartListRender();
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts
  `
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      alert("購物車清空失敗");
      window.location.reload();
    });
}

//函式 => 送出訂單
function orderSubmit(forms) {

  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/orders`,
      {
        data: {
          user: {
            name: forms[0].value,
            tel: forms[1].value,
            email: forms[2].value,
            address: forms[3].value,
            payment: forms[4].value,
          },
        },
      }
    )
    .then((res) => {
      for (let i = 0; i < 4; i++) {
        forms[i].value = ``;
        forms[4].value = `none`;
      }
      cartNewData['carts'] = []
      cartListRender();
      alert("訂單建立成功");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}

// 監聽 => 全部產品類別選擇
allProductType_btn.addEventListener("change", (e) => {
  // console.log(e.target.value);
  let allProductStr = ``;
  newData["products"].map((item) => {
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
});
// 監聽 => 加入購物車按鈕
allProduct_ul.addEventListener("click", (e) => {
  if (e.target.type === "button") {
    alert("此商品已加入購物車");
    addToCart(e);
  } else {
    return;
  }
});
// 監聽 => 清空購物車按鈕
clearAllCart_btn.addEventListener("click", (e) => {
  // alert("購物車已清空");
  clearAllCart();
});
// 監聽 => 刪除購物車商品按鈕
cartList_ul.addEventListener("click", (e) => {
  if (e.target.type === "button") {
    cartNewData["carts"].forEach((item, index) => {
      if (e.target.getAttribute("cart-id") === item["id"]) {
        cartNewData["carts"].splice(index, 1);
        alert("此商品已刪除");
        cartListRender();
      }
    });
    axios
      .delete(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${route}/carts/${e.target.getAttribute(
          "cart-id"
        )}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("商品刪除失敗");
        window.location.reload();
      });
  } else {
    return;
  }
});
// 監聽 => 送出訂單的各項資料
orderSubmit_form.addEventListener("click", (e) => {
  e.preventDefault();
  let forms = document.forms[0];
  if (e.target.value === "送出訂單") {
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].value === `` || forms[4].value === "none") {
        alert("請填寫每筆資料");
        return;
      }
    }
    orderSubmit(forms);
  }
});
