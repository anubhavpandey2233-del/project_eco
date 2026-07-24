const productCart = async () => {
    //local get product id

    let id = localStorage.getItem("Product_id")
    //    console.log(localStorage.getItem("quickId"));


    //    localStorage.setItem("quickId",id)

    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json()
    console.log(data);

    //     let print = `
    //              <div class="col-sm-12 col-lg-6">

    //                         <div class="product-images">
    //                             <div class="main-image">
    //                                 <span class="discount">25% OFF</span>
    //                                

    //                             </div>


    //                             <div class="thumb-images">
    //                                 <img src="./admin/images/${data.productImg}" alt="">
    //                                 <img src="./admin/images/${data.productImg}" alt="">
    //                                 <img src="./admin/images/${data.productImg}" alt="">
    //                                 <img src="./admin/images/${data.productImg}" alt="">
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div class="col-sm-12 col-lg-6">

    //                         <div class="product-details">
    //                             <h1>${data.productName}</h1>

    //                             <p class="star">
    //                                 <i class="fa-solid fa-star"></i>
    //                                 <i class="fa-solid fa-star"></i>
    //                                 <i class="fa-solid fa-star"></i>
    //                                 <i class="fa-solid fa-star"></i>
    //                                 <i class="fa-solid fa-star"></i>
    //                                 <span>(128 Reviews)</span>
    //                             </p>



    //                             <div class="price">

    //                               Rs.${data.price}
    //                             </div>

    //                             <p class="desc">
    //                                 Premium quality women's sweatshirt made from soft cotton fabric.
    //                                 Comfortable, stylish and perfect for casual wear.
    //                             </p>


    //                             <h3>Quantity</h3>
    //                             <div class="qty">
    //                                 <button>-</button>
    //                                 <span>1</span>
    //                                 <button>+</button>
    //                             </div>


    //                             <div class="buttons">
    //                                 <a href="#" class="cart">Add To Cart</a>
    //                                 <a href="#" class="buy">Buy Now</a>
    //                             </div>

    //                             <div class="features">
    //                                 <div>🚚 Free Delivery</div>
    //                                 <div>🔄 7 Days Return</div>
    //                                 <div>🛡️ Secure Payment</div>
    //                             </div>
    //                         </div>

    //                     </div>
    //         `


    //     document.getElementById("cartProduct").innerHTML = print
    // 

let print = '';

data.productImg.map((v) => {
print += `
            
                    <div class="swiper-slide"><img src="./admin/images/${v}" alt=""></div>
                    `
                    
})

                    
                
    
    

    document.getElementById("allProuctImgs").innerHTML = print
}





window.onload = () => {
    productCart()
}
