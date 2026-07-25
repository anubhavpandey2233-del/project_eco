let productImg = document.querySelectorAll('input[type="file"]');

for (let i=0; i<productImg.length; i++) {
        console.log(productImg, productImg[i].files, productImg[i].files.length);
        const allFilesRef = document.getElementById("allFiles");
        
        if (productImg[i].files.length == 0) {
            

            console.log(allFilesRef.childNodes[i+1].childNodes[3], productImg.parentNode);
            
            allFilesRef.childNodes[i+1].childNodes[3].innerHTML = "Please select file."

        } else {
            allFilesRef.childNodes[i+1].childNodes[3].innerHTML = ""
        }
    }