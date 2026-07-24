const handleBuy = (id) => {

    console.log(id);

    localStorage.setItem("Product_id", id)


    window.location = "product_detain.html";


}

const fetchProductItem = async () => {
    const response = await fetch("http://localhost:3000/products/");
    const data = await response.json()
    let print = ''
    data.map((v) => {
        print += `
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card">
                <a href="#"><img src="./admin/images/${v.productImg[0]}" class="img-fluid" alt=""></a>
                <h4>${v.productName}</h4>
                <p>₹${v.price}</p>
                <a href="#" class="cart" onclick="handleBuy('${v.id}')">Buy Now</a>
            </div>
        </div>

        `
    })

    document.getElementById("displayProducts").innerHTML = print


}






window.onload = () => {
    fetchProductItem()
    
}