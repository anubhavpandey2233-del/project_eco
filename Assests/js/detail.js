const productCart = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json()

    let print = ''

    data.map((v) => {
        print += `
             <div class="col-sm-12 col-lg-6">
                        
                        <div class="product-images">
                            <div class="main-image">
                                <span class="discount">25% OFF</span>
                                <img src="./admin/images/${v.productImg}" alt="Women's Sweatshirt">

                            </div>


                            <div class="thumb-images">
                                <img src="./admin/images/${v.productImg}" alt="">
                                <img src="./admin/images/${v.productImg}" alt="">
                                <img src="./admin/images/${v.productImg}" alt="">
                                <img src="./admin/images/${v.productImg}" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6">
                    
                        <div class="product-details">
                            <h1>${v.productName}</h1>

                            <p class="star">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <span>(128 Reviews)</span>
                            </p>



                            <div class="price">
                                
                              Rs.${v.price}
                            </div>

                            <p class="desc">
                                Premium quality women's sweatshirt made from soft cotton fabric.
                                Comfortable, stylish and perfect for casual wear.
                            </p>

                           
                            <h3>Quantity</h3>
                            <div class="qty">
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>

                         
                            <div class="buttons">
                                <a href="#" class="cart">Add To Cart</a>
                                <a href="#" class="buy">Buy Now</a>
                            </div>

                            <div class="features">
                                <div>🚚 Free Delivery</div>
                                <div>🔄 7 Days Return</div>
                                <div>🛡️ Secure Payment</div>
                            </div>
                        </div>

                    </div>
        `

    })
    document.getElementById("cartProduct").innerHTML = print
}






window.onload = () => {
    productCart()
}
