const fetchOrderData = async () => {

    let userId = localStorage.getItem("id");

    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json()

    console.log(data);

    let orderData = data.find((v) => v.userId == userId);


    let cartId = orderData.cId


    const res1 = await fetch("http://localhost:3000/cart");
    const cartdata = await res1.json();
    console.log(cartdata);


    let cartItems = cartdata.filter((v1) => v1.id == cartId)
    console.log(cartItems);


    const res = await fetch("http://localhost:3000/products");
    const productData = await res.json()
    console.log(productData);
    let print = ''

    productData.map((v2) => {
        print = `

    <div class="row g-0 align-items-center">
            <!-- <div class="col-md-2 text-center p-3">
                <img src="images/product1.jpg" class="img-fluid rounded" alt="Product">
            </div> -->

            <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${v2.productName}</h5>
                    <p class="mb-1">Quantity :</p>
                    <p class="mb-1">Status : </p>
                </div>
            </div>

            <div class="col-md-3 text-center">
                <h5 class="text-success">₹1,999</h5>
            </div>
        </div>
`
    })

    document.getElementById("displayData").innerHTML = print

}


window.onload = () => {
    fetchOrderData()
}