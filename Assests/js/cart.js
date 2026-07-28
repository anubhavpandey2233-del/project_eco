const minBtn = () => {

    let spanQty = parseInt(document.getElementById("spanQty").innerHTML);

    console.log(spanQty);

    spanQty--;

    document.getElementById("spanQty").innerHTML = spanQty

    if (spanQty < 2) {
        document.getElementById("minBtn").disabled = true;
    }


    if (spanQty > 0) {
        let minBtn = document.getElementById("plusBtn").disabled = false;
    } else {

        let minBtn = document.getElementById("plusBtn").disabled = true;

    }


}

const plusBtn = () => {

    let spanQty = parseInt(document.getElementById("spanQty").innerHTML);

    console.log(spanQty);

    spanQty++;

    document.getElementById("spanQty").innerHTML = spanQty

    if (spanQty > 9) {
        document.getElementById("plusBtn").disabled = true;
    }

    if (spanQty < 1) {
        let plusBtn = document.getElementById("minBtn").disabled = true;
    } else {
        let plusBtn = document.getElementById("minBtn").disabled = false;
    }

}

const fetchCartItem=async()=>{
    const response=await fetch(`http://localhost:3000/products/${id}`);
    const data=await response.json();
    console.log(data);
    

    let print=''

    print+=`
       <img src="./admin/images/${data.productImg[0]}" alt="">
       <h3>${data.productName}</h3>

    `
    document.getElementById("product-image").innerHTML=print
}



window.onload = () => {

    fetchCartItem()

    let spanQty = parseInt(document.getElementById("spanQty").innerHTML);

    if (spanQty === 1) {
         document.getElementById("minBtn").disabled = true;
    }
}
