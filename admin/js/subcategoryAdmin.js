let update = null
const handlesubcatsubmit = async () => {
    event.preventDefault()

    let categoryId = document.getElementById("subcat").value;
    let subcat_name = document.getElementById("subcatname").value;
    let subcat_img = document.getElementById("subcatimg").files[0];
    let desc = document.getElementById("desc").value;

    let alreadyExistImg = document.getElementById("displayImg").src.split("/");

    let arr = alreadyExistImg

    console.log(alreadyExistImg);

    let formErr = false

    console.log(categoryId, subcat_name, subcat_img, desc);

    if (categoryId === '') {
        document.getElementById("catErr").innerHTML = "Please select any subcategory"
        formErr = true
    } else {

        document.getElementById("catErr").innerHTML = ""

    }

    if (subcat_name === '') {
        document.getElementById("nameErr").innerHTML = "Please enter category name."
        formErr = true
    } else {
        const recat = /^[a-zA-Z\-]+$/;
        if (recat.test(subcat_name)) {
            document.getElementById("nameErr").innerHTML = ""
        } else {
            document.getElementById("nameErr").innerHTML = "please enter valid category name"
            formErr = true
        }
    }
    if (!subcat_img) {
        if (update === null) {
            document.getElementById("fileErr").innerHTML = "Please choose file"
            formErr = true
        }
    } else {
        const allowedfiles = ['image/jpeg', 'image/jpg', 'image/png']

        if (allowedfiles.includes(subcat_img.type)) {
            document.getElementById("fileErr").innerHTML = ""

            if (subcat_img.size < 2 * 1024 * 1024) {
                document.getElementById("fileErr").innerHTML = ""
            } else {
                document.getElementById("fileErr").innerHTML = "please enter files under 2 mb."
                formErr = true
            }
        } else {
            document.getElementById("fileErr").innerHTML = "please enter jpeg,jpg and png types file."
            formErr = true
        }
    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
        formErr = true
    } else {
        document.getElementById("desErr").innerHTML = ""
    }

    if (!formErr) {
        let file1 = document.getElementById("subcatimg")
        let obj = {
            categoryId: categoryId,
            subcat_name: subcat_name,
            subcat_img: file1?.files[0]?.name ? file1?.files[0]?.name : arr[arr.length - 1],
            desc: desc
        }
        console.log(obj);

        if (update) {
            const response = await fetch(`http://localhost:3000/subcategory/${update}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            const data = await response.stringify()
            console.log(data);



        } else {
            const response = await fetch("http://localhost:3000/subcategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)

            })
            const data = await response.json()
            console.log(data)
        }
    }


}

const displaySubcategory = async () => {

    let response = await fetch("http://localhost:3000/subcategory")
    const data = await response.json();
    console.log(data);

    // get all category data    cData

    let res = await fetch("http://localhost:3000/category");
    const cData = await res.json();


    //cData  find v.id == v.categoryId      .name

    let print = '';
    data.map((v, i) => {
        print += `
           <tr>
                <td>${i + 1}</td>
                <td>${cData?.find((v1) => v1.id == v.categoryId)?.name}</td>                   
                <td>${v.subcat_name}</td>
                <td><img src="./images/${v.subcat_img}"></td>
                <td>${v.desc}</td>
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
    }
    )
    document.getElementById("displaysubcategorytable").innerHTML = print




}

const handledelete = async (id) => {
    const response = await fetch(`http://localhost:3000/subcategory/${id}`, {
        method: "DELETE"
    })
    const data = await response.json();

    console.log(id);

}

const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:3000/subcategory/${id}`)
    let data = await response.json();
    console.log(data);

    document.getElementById("subcat").value = data.categoryId
    document.getElementById("subcatname").value = data.subcat_name
    document.getElementById("displayImg").src = './images/' + data.subcat_img
    document.getElementById("desc").value = data.desc

    update = id;

}

const handlesubcat = async () => {

    // console.log("ashfbdjh");

    const response = await fetch("http://localhost:3000/category");
    let data = await response.json();

    console.log(data);
    let print = `
     <option value="">---Select Category---</option>`
    data.map((v, i) => {
        print += `
            <option value="${v.id}">${v.name}</option>
       `
    })
    document.getElementById("subcat").innerHTML = print
}

let display_subcat = document.getElementById("handlesubmitofsubcat");
display_subcat.addEventListener("submit", handlesubcatsubmit)

window.onload = () => {
    handlesubcat();
    displaySubcategory()
};

const change_subcatimage = document.getElementById("subcatimg");
change_subcatimage.addEventListener("change", function () {
    console.log("jfkgf")
    let img_change = change_subcatimage.files[0].name

    document.getElementById("displayImg").src = './images/' + img_change

})