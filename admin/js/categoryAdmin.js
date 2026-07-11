
let arr = []
let update = null

// function displaydata() {
//     let print = ''
//     for (let i = 0; i < arr.length; i++) {

//         print += `
//         <tr>
//             <td>Sr.no</td>
//             <td>${arr[i].file}</td>
//             <td>${arr[i].cat}</td>
//             <td>${arr[i].desc}</td>
//             <td>
//                 <button class="btn btn-warning btn-sm" onclick="handleedit(${i})">
//                     <i class="bi bi-pencil"></i>
//                 </button>
//                 <button class="btn btn-danger btn-sm" onclick="handledelete(${i})">
//                     <i class="bi bi-trash"></i>
//                 </button>
//             </td>
//         </tr>
//     `
//     }
//     document.getElementById("displaydata").innerHTML = print
// }


function handlesubmit() {
    event.preventDefault()

    let cat = document.getElementById("catname").value;
    let file = document.getElementById("file").value;
    let desc = document.getElementById("desc").value;

    console.log(cat, file, desc);

    if (cat === '') {
        document.getElementById("nameErr").innerHTML = "Please enter category name."
    } else {
        const recat = /^[a-zA-Z\-]+$/;
        if (recat.test(cat)) {
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

// function handleedit(i) {

// }

// function handledelete(i) {
//     arr.splice(i, 1)
//     displaydata()
// }

