
let update = null;
const productSubmit = async () => {
    event.preventDefault()

    let category = document.getElementById("cat").value;
    let subcategory = document.getElementById("subcat").value;
    let productName = document.getElementById("subcatname").value;
    let price = document.getElementById("price").value;
    let productImg = document.getElementById("fileImage").files[0]; //files[0] se file ka pura object mil jata hai
    let desc = document.getElementById("desc").value;
    let checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

    let array = [];

    for (let i = 0; i < checkBox.length; i++) {
        array.push(checkBox[i].value)
    }
    console.log(array);

    
    
    let alreadyExistImg = document.getElementById("productImage").src.split("/");
    let arr = alreadyExistImg
    console.log(alreadyExistImg);

    // console.log(category, subcategory, productName, productImg, desc, price, checkBox);
    let formErr = false;

    if (category === '') {
        document.getElementById("catErr").innerHTML = "Please select category"
        formErr = true;
    } else {

        document.getElementById("catErr").innerHTML = ""

    }

    if (subcategory === '') {
        if (update === null) {
            document.getElementById("subcatErr").innerHTML = "Please select subcategory"
            formErr = true;
        }
    } else {

        document.getElementById("subcatErr").innerHTML = ""

    }

    if (productName === '') {
        document.getElementById("nameErr").innerHTML = "Please enter category name."
        formErr = true;
    } else {
        const recat = /^[a-zA-Z\-]+$/;
        if (recat.test(productName)) {
            document.getElementById("nameErr").innerHTML = ""
        } else {
            document.getElementById("nameErr").innerHTML = "please enter valid category name"
            formErr = true;
        }
    }
    if (!productImg) {

        if (update === null) {
            document.getElementById("fileErr").innerHTML = "Please choose file"
            formErr = true;
        }
    } else {
        const allowedfiles = ['image/jpeg', 'image/jpg', 'image/png']

        console.log(productImg.type, allowedfiles.includes(productImg.type));

        if (allowedfiles.includes(productImg.type)) {
            document.getElementById("fileErr").innerHTML = ""

            if (productImg.size < 2 * 1024 * 1024) {
                document.getElementById("fileErr").innerHTML = ""
            } else {
                document.getElementById("fileErr").innerHTML = "enter files under 2 MB"
                formErr = true;
            }

        } else {
            document.getElementById("fileErr").innerHTML = "Please enter only .jpeg,.jpg or png type files"
            formErr = true;
        }


    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
        formErr = true;
    } else {
        document.getElementById("desErr").innerHTML = ""
    }

    if (price === '') {
        document.getElementById("priceErr").innerHTML = "Price enter here"
        formErr = true;
    } else {
        const reprice = /^(\d{1,3})(,\d{3})*(\.\d{1,})?$/g

        if (reprice.test(price)) {
            document.getElementById("priceErr").innerHTML = ""
        } else {
            document.getElementById("priceErr").innerHTML = "Please enter valid price"
            formErr = true;
        }

    }

    if (!formErr) {

        console.log(productImg);
        console.log(arr);
        

        let productImg1 = document.getElementById("fileImage");
        let obj = {
            category,
            subcategory,
            productName,
            price,
            productImg: productImg1?.files[0]?.name ? productImg1?.files[0]?.name : arr[arr.length - 1],
            desc,
            tags:array
        }

        if (update) {
            const response = await fetch(`http://localhost:3000/products/${update}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)

            })
            const data = await response.json()
            console.log(data);
        } else {
            const response = await fetch("http://localhost:3000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)

            })
            const data = await response.json()
            console.log(data);
        }


    }

}

const productTable = async () => {

    let response = await fetch("http://localhost:3000/products");
    let data = await response.json();
    // console.log(data);

    let res1 = await fetch("http://localhost:3000/category");
    let cdata = await res1.json();

    let res2 = await fetch("http://localhost:3000/subcategory");
    let sdata = await res2.json();


    console.log(data, cdata, sdata);




    let print = '';

    data.map((v, i) => {
        print += `
            <tr>
                <td>${i + 1}</td>
                <td>${cdata.find((v1) => v1.id === v.category).name}</td>
                <td>${sdata?.find((v2) => v2.id === v.subcategory)?.subcat_name}</td>
                <td>${v.productName}</td>
                <td>${v.price}</td>
                <td><img src="./images/${v.productImg}"></td>
                <td>${v.desc}</td>
                <td>${v.tags}</td>
                 <td>
                    <button class="btn btn-warning btn-sm" onclick="handleEdit('${v.id}')">
                        <i class="bi bi-pencil"></i>
                    </button>


                    <button class="btn btn-danger btn-sm" onclick="handledelete('${v.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `
    })
    document.getElementById("displayProductTable").innerHTML = print

}

const handledelete = async (id) => {

    const response = await fetch(`http://localhost:3000/products/${id}`,
        {
            method: "DELETE"
        }
    )
    const data = await response.json();

    console.log(data);

}

const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    let data = await response.json();
    console.log(data);

    document.getElementById("cat").value = data.category;

    await fetchSubcategory(data.category)

    document.getElementById("subcat").value = data.subcategory
    document.getElementById("subcatname").value = data.productName
    document.getElementById("price").value = data.price

    
    document.getElementById("productImage").src = './images/' + data.productImg
  

    document.getElementById("desc").value = data.desc

        

    //data.tags map     v   document.getElementById(v).checked = true;
    data.tags.map((v)=>{
        document.getElementById(v).checked = true
    })

    update = id;
}


const fetchCategory = async () => {

    const response = await fetch("http://localhost:3000/category");
    let data = await response.json();

    // console.log(data);

    let print = `
        <option value="">---Select Anyone---</option>
    `
    data.map((v, i) => {
        print += `
              <option value="${v.id}">${v.name}</option>
        `
    })
    document.getElementById("cat").innerHTML = print
}

const fetchSubcategory = async () => {
    let response = await fetch("http://localhost:3000/subcategory");
    let data = await response.json();

    let categoryId = document.getElementById("cat").value;
    // console.log(category_id);

    const filterData = data.filter((v) => v.categoryId === categoryId);
    // console.log(filterData);

    let print = `
        <option value="">---Select Subcategory---</option>   
    `
    filterData.map((v, i) => {
        print += `
                <option value="${v.id}">${v.subcat_name}</option>    
        `
    })
    document.getElementById("subcat").innerHTML = print


}



window.onload = () => {
    fetchCategory();
    productTable();
}

let productSubmitform = document.getElementById("handleproductsubmit");
productSubmitform.addEventListener("submit", productSubmit)

const prImg = document.getElementById("fileImage");
prImg.addEventListener("change", function () {
    console.log("abc");

    let imageProduct = prImg.files[0].name

    document.getElementById("productImage").src = './images/' + imageProduct


})