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


const handleQuantity = () => {
    // const plusBtn = document.createElement("button")
    // plusBtn.setAttribute("type", "button")
    // plusBtn.textContent = "+"


    const spanEle = document.createElement("span")

    // const minBtn = document.createElement("button")
    // minBtn.setAttribute("type", "button")
    // minBtn.textContent = "-";
    // minBtn.setAttribute("onclick", "handleMinQty()")


    const divEle = document.createAttribute("div")
    // divEle.setAttribute("class", "qty")

    // divEle.appendChild(plusBtn)
    // divEle.appendChild(minBtn)  
    // divEle.appendChild(spanEle)


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



window.onload = () => {
    productCart()

    let spanQty = parseInt(document.getElementById("spanNum").innerHTML);

    if (spanQty === 1) {
        let btnMin = document.getElementById("btnMin").disabled = true;
    }
}
