// verify if the access or(login) information are exist

let username = "ramzi";
let password = "1234";
const user_name = document.getElementById("username");
const pass_word = document.getElementById("password");
const login_btn = document.getElementById("loginbtn");

document.addEventListener("DOMContentLoaded", () => {
  login_btn.addEventListener("click", () => {
    let user = user_name.value.trim();
    let pass = pass_word.value.trim();
    if (user !== username && pass !== password) {
      alert("Incorrect Username and Password");
      user_name.value = "";
      pass_word.value = "";
    } else if (pass !== password) {
      alert("Incorrect passward");
      pass_word.value = "";
    } else if (user !== username) {
      alert("Incorrect Username");
      user_name.value = "";
    } else {
      window.location.href = "main.html";
    }
  });
});

// open and close the shopping card

const shop_btn = document.getElementById("shopping_card_btn");
const shop_card = document.querySelector(".shopping_card");
const exit_btn = document.getElementById("exit_btn");

shop_btn.addEventListener("click", () => {
  shop_card.style.display = "inherit";
});

exit_btn.addEventListener("click", () => {
  shop_card.style.display = "none";
});

const products_cards = document.querySelectorAll(".product_card");
const shop_item = document.querySelector(".shop_items");

function create_shop_cart() {
  shop_item.innerHTML = "";
  let card = JSON.parse(localStorage.getItem("card")) || [];
  card.forEach((x, index) => {
    let new_div = document.createElement("div");
    new_div.classList.add("card_item");
    new_div.innerHTML = `
        
         <div>
         <div>
           <button type="button" class="add_btn btn">+</button>
            <h3 > ${x.countity}</h3>
             <button type="button" class="remove_btn btn">-</button>
             </div>
          <h4">total price:<ins>${x.price}</ins>$</h4>
         </div>

         <div>
          <h2 style="color: black;"> ${x.name}</h2>
         </div>
         
           
       `;
    shop_item.appendChild(new_div);

    new_div.querySelector(".add_btn").addEventListener("click", () => {
      let card = JSON.parse(localStorage.getItem("card")) || [];
      card[index].countity++;
      card[index].price =
        (card[index].price / (card[index].countity - 1)) * card[index].countity;
      localStorage.setItem("card", JSON.stringify(card));
      create_shop_cart();
      calculate_total();
    });
    new_div.querySelector(".remove_btn").addEventListener("click", () => {
      let card = JSON.parse(localStorage.getItem("card")) || [];
      if (card[index].countity > 1) {
        card[index].countity--;
        card[index].price =
          (card[index].price / (card[index].countity + 1)) *
          card[index].countity;
      } else {
        card.splice(index, 1);
      }
      localStorage.setItem("card", JSON.stringify(card));
      create_shop_cart();
      check_if_card_empty();
      calculate_total();
    });
  });
}

// adding products to the shopping card and create carts

products_cards.forEach((product) => {
  let btn = product.querySelector(".add_to_card_btn");
  btn.addEventListener("click", () => {
    name = product.querySelector(".name").textContent;
    price = parseInt(product.querySelector(".price").textContent);
    countity = parseInt(product.querySelector(".countity").value);
    let card = JSON.parse(localStorage.getItem("card")) || [];
    let exist = card.find((item) => item.name === name);
    if (exist) {
      exist.countity += countity;
      exist.price = price * exist.countity;
    } else {
      card.push({
        name,
        price,
        countity,
      });
    }
    localStorage.setItem("card", JSON.stringify(card));
    create_shop_cart();
    calculate_total();
  });
});
create_shop_cart();

function check_if_card_empty() {
  let card = JSON.parse(localStorage.getItem("card")) || [];
  if (card.length === 0) {
    shop_item.innerHTML = `<h1 style="color:lime">shopping card is empty</h1>`;
  }
}

check_if_card_empty();

// calculate the total price and number of items that contain in shopping card

const side2 = document.querySelector(".side2");
const total_btn = document.getElementById("checkout");
const total_price = side2.querySelector(".total_price");
const total_nbr_items = side2.querySelector(".total_nbr_items");

function calculate_total() {
  let card = JSON.parse(localStorage.getItem("card")) || [];
  let total = {
    price: 0,
    items: 0,
  };
  card.forEach((item, index) => {
    total.price += card[index].price;
    total.items += card[index].countity;
  });

  total_price.textContent = total.price;
  total_nbr_items.textContent = total.items;
}

calculate_total();

const checkout = document.querySelectorAll(".checkout");
checkout.forEach((btn) => {
  btn.addEventListener("click", () => {
    let total = total_price.textContent;
    alert("The total final price: " + total + "$");
  });
});
