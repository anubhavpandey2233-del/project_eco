function handleproduct() {
    event.preventDefault()

    let category = document.getElementById("cat").value;
    let subcategory = document.getElementById("subcat").value;
    let subcatname = document.getElementById("subcatname").value;
    let price = document.getElementById("price").value;
    let productImg = document.getElementById("file").files[0]; //files[0] se file ka pura object mil jata hai
    let desc = document.getElementById("desc").value;

    console.log(cat, subcat, file, desc, price);

    if (category === '') {
        document.getElementById("catErr").innerHTML = "Please select category"
    } else {

        document.getElementById("catErr").innerHTML = ""

    }

    if (subcategory === '') {
        document.getElementById("subcatErr").innerHTML = "Please select subcategory"
    } else {

        document.getElementById("subcatErr").innerHTML = ""

    }

    if (subcatname === '') {
        document.getElementById("nameErr").innerHTML = "Please enter category name."
    } else {
        const recat = /^[a-zA-Z\-]+$/;
        if (recat.test(subcatname)) {
            document.getElementById("nameErr").innerHTML = ""
        } else {
            document.getElementById("nameErr").innerHTML = "please enter valid category name"
        }
    }
    if (!productImg) {
        document.getElementById("fileErr").innerHTML = "Please choose file"
    } else {
        const allowedfiles = ['image/jpeg', 'image/jpg', 'image/png']

        console.log(productImg.type, allowedfiles.includes(file.type));

        if (allowedfiles.includes(productImg.type)) {
            document.getElementById("fileErr").innerHTML = ""

            if (productImg.size < 2 * 1024 * 1024) {
                document.getElementById("fileErr").innerHTML = ""
            } else {
                document.getElementById("fileErr").innerHTML = "enter files under 2 MB"
            }

        } else {
            document.getElementById("fileErr").innerHTML = "Please enter only .jpeg,.jpg or png type files"
        }


    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
    } else {
        document.getElementById("desErr").innerHTML = ""
    }

    if (price === '') {
        document.getElementById("priceErr").innerHTML = "Price enter here"
    } else {
        const reprice = /^(\d{1,3})(,\d{3})*(\.\d{1,})?$/g

        if (reprice.test(price)) {
            document.getElementById("priceErr").innerHTML = ""
        } else {
            document.getElementById("priceErr").innerHTML = "Please enter valid price"
        }

    }

}

const fetchCategory=async()=>{

   const response = await fetch("http://localhost:3000/category");
    let data = await response.json();

    console.log(data);
   
    let print=`
        <option>---Select Anyone---<option>
    `
    data.map((v,i)=>{
        print+=`
              <option value="${v.id}">${v.name}<option>
        `
    })
    document.getElementById("cat").innerHTML=print
}

const fetchSubcategory=async()=>{
    let response=await fetch("http://localhost:3000/subcategory");
    let data=await response.json();

    let print=`
        <option>---Select Subcategory---</option>   
    `
    data.map((v,i)=>{
        print+=`
                <option value="${v.id}">${v.subcat_name}</option>    
        `
    })
    document.getElementById("subcat").innerHTML=print
}




window.onload=()=>{
    fetchCategory();
    fetchSubcategory();
}
