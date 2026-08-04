const productCart = async () => {
    //local get product id

    let id = localStorage.getItem("Product_id")
    //    console.log(localStorage.getItem("quickId"));


    //    localStorage.setItem("quickId",id)

    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json()
    console.log(data);





    let print = '';

    data.productImg.map((v) => {
        print += `
            
        <div class="swiper-slide ProductImgSlider"><img src="./admin/images/${v}" alt=""></div>
    `

    })
    document.getElementById("allProuctImgs").innerHTML = print


    document.getElementById("pTitle").innerHTML = data.productName

    document.getElementById("pPrice").innerHTML = data.price

    document.getElementById("pDescription").innerHTML = data.desc


}

const plusbtn = () => {

    let spanQty = parseInt(document.getElementById("spanNum").innerHTML);

    console.log(spanQty);

    spanQty++;

    document.getElementById("spanNum").innerHTML = spanQty



    if (spanQty > 9) {
        let btnplus = document.getElementById("btnplus").disabled = true;
    }

    if (spanQty < 1) {
        let btnplus = document.getElementById("btnMin").disabled = true;
    } else {
        let btnplus = document.getElementById("btnMin").disabled = false;
    }



}

const minbtn = () => {
    let spanQty = parseInt(document.getElementById("spanNum").innerHTML);

    console.log("sdfd");

    spanQty--;

    document.getElementById("spanNum").innerHTML = spanQty

    if (spanQty < 2) {
        let btnMin = document.getElementById("btnMin").disabled = true;
    }

    if (spanQty > 0) {
        let btnMin = document.getElementById("btnplus").disabled = false;
    } else {

        let btnMin = document.getElementById("btnplus").disabled = true;

    }

}


const handleCart = async () => {
    let userId = localStorage.getItem("id");
    let productId = localStorage.getItem("Product_id");
    let quantity =parseInt( document.getElementById("spanNum").innerHTML);

    console.log(userId, productId, quantity);

    let obj = {
        userId,
        items: [
            {
                "pid": productId,
                "quantity": parseInt(quantity)
            }
        ]
    }

    const res = await fetch("http://localhost:3000/cart")
    const cData = await res.json()
    console.log(cData);

    const cartData1 = cData.filter((v) => v.userId == userId)
    console.log(cartData1);

    const cartData=cartData1.find(v1=>!v1.status)
    console.log(cartData);
    


    if (cartData) {

        const pData = cartData.items.findIndex((v) => v.pid === productId);

        console.log(pData);


        if (pData === -1) {
            cartData.items.push({
                pid: productId,
                quantity: parseInt(quantity)
            })
        } else {

            cartData.items[pData].quantity += quantity
        }

        //1


        //fetch     PUT     http://localhost:3000/cart/ cartData.id         body: JSON.stringify(cartData)

        // console.log(cartData);

        //Update

        const resp = await fetch(`http://localhost:3000/cart/${cartData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartData)

        })
        const newItemdata = await resp.json()
        console.log(newItemdata);



    } else {
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }
        )
        const data = await response.json()
        console.log(data);
    }

    window.location.href="cart.html"


}




window.onload = () => {
    productCart()

    let spanQty = parseInt(document.getElementById("spanNum").innerHTML);

    if (spanQty === 1) {
        let btnMin = document.getElementById("btnMin").disabled = true;
    }
}


const cartbtn=document.getElementById("cartbtn");
cartbtn.addEventListener("click",handleCart)