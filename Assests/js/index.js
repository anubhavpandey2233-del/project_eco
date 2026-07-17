//window load   get     category
//cData     map     v             

/* <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <div class="cateimg">
                            <a href="#">
                                <img src="v.name" alt="">

                            </a>
                            <h3>v.name</h3>
                        </div>
                    </div> */


const fetchCategory=async()=>{
    const response=await fetch("http://localhost:3000/category");
    const data=await response.json()
    console.log(data);
    
    let print=''

    data.map((v,i)=>{
        print+=`
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
    document.getElementById("displayCategoryData").innerHTML=print


}

window.onload=()=>{
    fetchCategory()
}   