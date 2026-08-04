const minBtn =async(e,pid) => {

    // console.log(console.log(e.parentNode.childNodes[3].innerHTML));




    let spanQty = parseInt(e.parentNode.childNodes[3].innerHTML);

    console.log(spanQty);

    spanQty--;

    e.parentNode.childNodes[3].innerHTML = spanQty

    if (spanQty < 2) {
        document.getElementById("minBtn").disabled = true;
    }


    if (spanQty > 0) {
        let minBtn = document.getElementById("plusBtn").disabled = false;
    } else {

        let minBtn = document.getElementById("plusBtn").disabled = true;

    }

    calcTotal()



    let userId = localStorage.getItem("id");

    const res = await fetch("http://localhost:3000/cart")
    const cData = await res.json()
    console.log(cData);

    const cartData1 = cData.filter((v) => v.userId == userId)
    console.log(cartData1);

    const cartData = cartData1.find(v1 => !v1.status)
    console.log(cartData);

    const pData = cartData.items.findIndex((v) => v.pid === pid);

    cartData.items[pData].quantity = spanQty

    const resp = await fetch(`http://localhost:3000/cart/${cartData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartData)

    })


}

const plusBtn = async (e, pid) => {
    console.log(e.parentNode.childNodes[3].innerHTML);



    const quantity = e.parentNode.childNodes[3].innerHTML
    console.log(quantity);

    let spanQty = parseInt(e.parentNode.childNodes[3].innerHTML);

    console.log(spanQty);

    spanQty++;

    e.parentNode.childNodes[3].innerHTML = spanQty

    if (spanQty > 9) {
        document.getElementById("plusBtn").disabled = true;
    }

    if (spanQty < 1) {
        let plusBtn = document.getElementById("minBtn").disabled = true;
    } else {
        let plusBtn = document.getElementById("minBtn").disabled = false;
    }

    calcTotal()


    let userId = localStorage.getItem("id");

    const res = await fetch("http://localhost:3000/cart")
    const cData = await res.json()
    console.log(cData);

    const cartData1 = cData.filter((v) => v.userId == userId)
    console.log(cartData1);

    const cartData = cartData1.find(v1 => !v1.status)
    console.log(cartData);

    const pData = cartData.items.findIndex((v) => v.pid === pid);

    cartData.items[pData].quantity = spanQty

    const resp = await fetch(`http://localhost:3000/cart/${cartData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartData)

    })
}

const calcTotal = () => {
    let total = 0

    const alldivs = document.getElementsByClassName("cart-card");

    for (let i = 0; i < alldivs.length; i++) {
        console.log(alldivs[i].childNodes[3].childNodes[3].childNodes[3].innerHTML);

        console.log(alldivs[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML);

        let qty = parseInt(alldivs[i].childNodes[3].childNodes[3].childNodes[3].innerHTML);

        let price = parseInt(alldivs[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML)

        // console.log(qty, price);


        total += qty * price;

        localStorage.setItem("Amount", total)



    }

    let dFee = parseInt(document.getElementById("deliveryFee").innerHTML)
    console.log(dFee);

    let deliveryFee = total + dFee;

    document.getElementById("deliveryFee").innerHTML = dFee
    document.getElementById("totalCharge").innerHTML = deliveryFee

    document.getElementById("subtotal").innerHTML = total



}

const fetchCartItem = async () => {

    let uId = localStorage.getItem("id");

    const response = await fetch("http://localhost:3000/cart");
    const cartData = await response.json()

    console.log(cartData);

    const userCartData = cartData.find((v) => v.userId == uId && v.status !== "Completed");
    console.log(userCartData);


    const res = await fetch("http://localhost:3000/products");
    const productData = await res.json()

    console.log(productData);

    let prodcutDetail
    print = ''
    let total = 0

    if (userCartData) {
        userCartData.items.map((v) => {
            prodcutDetail = productData.find((f) => f.id == v.pid);

            print += `
            <div class="cart-card"  >

            <div class="product-info" id="product-image">

                    <div class="product-image" id="cartImage">
                            <img src="./admin/images/${prodcutDetail.productImg[0]}" alt="asd">
                    </div>

                    <div class="product-details" id="productDetail">
                        <p><span>Name:</span>${prodcutDetail.productName}</p>
                     
                        <p>Price:<span>${prodcutDetail.price}</span></p> 
                    </div>

            </div>

            <div class="cart-actions">

                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>

                <div class="quantity-box">
                    <button onclick="minBtn(this,'${v.pid}')" id="minBtn">-</button>
                    <span onclick="spanQty()" id="spanQty">${v.quantity}</span>
                    <button onclick="plusBtn(this,'${v.pid}')" id="plusBtn">+</button>
                </div>
                

            </div>

        </div>

         
        `

        });

        document.getElementById("cart-items").innerHTML = print
    }






    // const category = prodcutDetail.category
    // console.log(category);

}



window.onload = async () => {

    await fetchCartItem()
    let x = document.getElementById("spanQty")

    console.log(x);

    if (x) {
        let spanQty = parseInt(document.getElementById("spanQty").innerHTML);

        if (spanQty === 1) {
            document.getElementById("minBtn").disabled = true;
        }

        calcTotal()
    }

}
