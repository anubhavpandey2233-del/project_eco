let update = null;
const handlesubmit = async () => {
    event.preventDefault();
    let cat = document.getElementById("catname").value;
    let file1 = document.getElementById("file1").files[0];
    let desc = document.getElementById("desc").value;
    

    let alreadyExistImg = document.getElementById("displayImg").src.split("/");

    let arr = alreadyExistImg

    console.log(alreadyExistImg);


    console.log(cat, file1, desc);
    let formErr = false

    if (cat === '') {
        document.getElementById("nameErr").innerHTML = "Please enter category name."
        formErr = true
    } else {
        const recat = /^[a-zA-Z\-]+$/;
        if (recat.test(cat)) {
            document.getElementById("nameErr").innerHTML = "";
            localStorage.setItem("cat", this.catname.value);
        } else {
            document.getElementById("nameErr").innerHTML = "please enter valid category name"
            formErr = true
        }
    }

    if (!file1) {

        if (update === null) {
            document.getElementById("fileErr").innerHTML = "Please choose file1"
            formErr = true
        }
    } else {
        const allowedfiles = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

        console.log(file1.type);

        if (allowedfiles.includes(file1.type)) {
            document.getElementById("fileErr").innerHTML = ""

            if (file1.size < 2 * 1024 * 1024) {
                document.getElementById("fileErr").innerHTML = ""
                localStorage.setItem("file1", this.file1.value)
            } else {
                document.getElementById("fileErr").innerHTML = "please enter files under 2 mb."
                formErr = true
            }
        } else {
            document.getElementById("fileErr").innerHTML = "please enter jpeg,jpg and png types file1."
            formErr = true
        }
    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
        formErr = true
    } else {
        document.getElementById("desErr").innerHTML = ""
        localStorage.setItem("desc", this.desc.value)
    }


    if (!formErr) {
        let file1 = document.getElementById("file1");

        let obj = {
            name: cat,
            category_image: file1?.files[0]?.name ? file1?.files[0]?.name : arr[arr.length - 1],
            description: desc
        }


        console.log(obj);

        if (update) {
            const response = await fetch(`http://localhost:3000/category/${update}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)

            })
            const data = await response.stringify();
            console.log(data);
        } else {
            const response = await fetch("http://localhost:3000/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)

            })
            const data = await response.stringify();
            console.log(data);
        }
    }
}

const handledelete = async (id) => {

    await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE"
    })

    console.log(id);
}

const handleEdit = async (id) => {

    let response = await fetch(`http://localhost:3000/category/${id}`);
    let data = await response.json()

    document.getElementById("catname").value = data.name
    document.getElementById("displayImg").src = './images/' + data.category_image
    document.getElementById("desc").value = data.description

    update = id;
}
const displaycategory = async () => {

    const response = await fetch("http://localhost:3000/category");
    const data = await response.json();
    console.log(data);

    let print = '';
    data.map((v, i) => {
        print += `
            <tr>
                <td>${i + 1}</td>
                <td>${v.name}</td>
                <td><img src="./images/${v.category_image}"></td>
                <td>${v.description}</td>
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

    document.getElementById("dispcat").innerHTML = print

}

window.onload = displaycategory;

const categoryForm = document.getElementById("catefory_form")
categoryForm.addEventListener("submit", handlesubmit)

const change_image = document.getElementById("file1");
change_image.addEventListener("change", function () {
    console.log("jfkgf", file1)
    let img_change = change_image.files[0].name;

    console.log(img_change);
    

    document.getElementById("displayImg").src = './images/' + img_change

})







