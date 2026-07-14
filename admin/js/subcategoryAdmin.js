
const handlesubcatsubmit = async () => {
    event.preventDefault()

    let subcat = document.getElementById("subcat").value;
    let subcat_name = document.getElementById("subcatname").value;
    let subcat_img = document.getElementById("subcatimg").files[0];
    let desc = document.getElementById("desc").value;

    console.log(subcat, subcat_name, subcat_img, desc);

    if (subcat === '') {
        document.getElementById("catErr").innerHTML = "Please select any subcategory"
    } else {

        document.getElementById("catErr").innerHTML = ""

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
    if (!subcatimg) {
        document.getElementById("fileErr").innerHTML = "Please choose file"
    } else {
        const allowedfiles = ['image/jpeg', 'image/jpg', 'image/png']

        if (allowedfiles.includes(subcatimg.type)) {
            document.getElementById("fileErr").innerHTML = ""

            if (subcatimg.size < 2 * 1024 * 1024) {
                document.getElementById("fileErr").innerHTML = ""
            } else {
                document.getElementById("fileErr").innerHTML = "please enter files under 2 mb."
            }
        } else {
            document.getElementById("fileErr").innerHTML = "please enter jpeg,jpg and png types file."
        }
    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
    } else {
        document.getElementById("desErr").innerHTML = ""
    }

    let response = await fetch("http://localhost:3000/subcategory")
    const data = await response.json();
    console.log(data);

    let print = '';
    data.map((v, i) =>{
        print+=`
            <td>${i+1}</td>
            <td><img src="./images/${v.subcat_img}"></td>
            <td>${v.catoption}</td>
            <td>${v.subcat_name}</td>
            <td>${v.desc}</td>
            <td>
                button class="btn btn-warning btn-sm" onclick="handleEdit('${v.id}')">
                    <i class="bi bi-pencil"></i>
                </button>


                <button class="btn btn-danger btn-sm" onclick="handledelete('${v.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
    }
    )
    document.getElementById("displaydata").innerHTML=print

}

const handlesubcat = async () => {

    // console.log("ashfbdjh");

    const response = await fetch("http://localhost:3000/category");
    let data =await response.json();

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
};