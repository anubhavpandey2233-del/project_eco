
function handlesubcategory() {
    event.preventDefault()

    let subcat = document.getElementById("subcat").value;
    let subcatname=document.getElementById("subcatname").value;
    let file = document.getElementById("file").value;
    let desc = document.getElementById("desc").value;

    console.log(subcat, file, desc);

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
    if (file === '') {
        document.getElementById("fileErr").innerHTML = "Please choose file"
    } else {
        const refile = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;

        if (refile.test(file)) {
            document.getElementById("fileErr").innerHTML = ""
        } else {
            document.getElementById("fileErr").innerHTML = "please enter valid file."
        }
    }

    if (desc === '') {
        document.getElementById("desErr").innerHTML = "Please write description here.."
    } else {
        document.getElementById("desErr").innerHTML = ""
    }

}

