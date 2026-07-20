//window load   get     category
//cData     map     v             

// /<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
//                         <div class="cateimg">
//                             <a href="#">
//                                 <img src="v.name" alt="">

//                             </a>
//                             <h3>v.name</h3>
//                         </div>
//                     </div> 


const fetchCategory = async () => {
    const response = await fetch("http://localhost:3000/category");
    const data = await response.json()
    console.log(data);

    let print = ''

    data.map((v, i) => {
        print += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div class="cateimg">
                <a href="#">
                   <img src="./admin/images/${v.category_image}">

                </a>
                <h3>${v.name}</h3>
            </div>
        </div>
    `
    })
    document.getElementById("displayCategoryData").innerHTML = print


}



const handlequickAdd = (id) => {
    console.log(id);

    localStorage.setItem("Product_id", id)

    window.location = "product_detain.html";

}


const fetchProduct = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json()
    console.log(data);

    let data1 = data.filter((v1) => (v1.tags.includes("new")))

    let print = '';

    data1.map((v) => {
        print += `
            <div class="col-sm-6 col-md-6 col-lg-3">
                <div class="todayproduct">
                    <div class="productimg">
                        <div class="discount">25%-</div>
                        <img src="./admin/images/${v.productImg}" alt="">
                        <img src="./admin/images/${v.productImg}" class="secondimg" alt="">
                        <div class="like">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            <i class="fa-regular fa-eye"></i>

                        </div>
                        <a href="#" class="quick" onclick="handlequickAdd('${v.id}')">Quick Add</a>
                    </div>
                    <div class="productdata">
                        <p>${v.productName}</p>
                        <p class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </p>
                        <p><span class="cutprice">$99,99</span><span class="rightprice">${v.price}</span></p>
                        <a href="#" class="black colr "><span></span></a>
                        <a href="#" class="gray colr"><span></span></a>
                        <a href="#" class="brown colr"><span></span></a>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById("displayProducts").innerHTML = print

}

const fetchTrendingProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    console.log(data);

    let data2 = data.filter((v2) => (v2.tags.includes("Best_Seller")))
    let print = ''
    data2.map((v) => {
        print += `
            <div class="col-sm-6 col-lg-3">
                <div class="todayproduct">
                    <div class="productimg">
                        <div class="discount">25%-</div>
                        <img src="./admin/images/${v.productImg}" alt="">
                        <img src="./admin/images/${v.productImg}" class="secondimg" alt="">
                        <div class="like">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            <i class="fa-regular fa-eye"></i>

                        </div>
                        <a href="#" class="quick">Quick Add</a>
                    </div>
                    <div class="productdata">
                        <p>${v.productName}</p>
                        <p class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </p>
                        <p><span class="cutprice">$99,99</span><span class="rightprice">${v.price}</span></p>
                        <a href="#" class="black colr "><span></span></a>
                        <a href="#" class="gray colr"><span></span></a>
                        <a href="#" class="brown colr"><span></span></a>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById("displayTrendingProduct").innerHTML = print
}

window.onload = () => {
    fetchCategory()
    fetchProduct()
    fetchTrendingProducts()
}   