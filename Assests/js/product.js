const fetchProductItem=async()=>{

    const response=await fetch("http://localhost:3000/products");
    const data=await response.json();

    let print=''

    data.map((v)=>{
        print+=`
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="card">
                    <a href="#"><img src="./admin/images/${v.productImg}" class="img-fluid" alt=""></a>
                    <h4>${v.productName}</h4>
                    <p>${v.price}</p>
                    <a href="product_detain.html" class="cart">Add To Cart</a>
                </div>
            </div>
        `
    })
    document.getElementById("displayProductData").innerHTML=print


}



window.onload=()=>{
    fetchProductItem()
}