function handleforget() {
    
    
    let email = document.getElementById("email").value;
   


    console.log(email);

    let formErr = false;

   


    if (email === '') {
        document.getElementById("emailErr").innerHTML = "please enter your email.";
        formErr = true;
    } else {
        const aemail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (aemail.test(email)) {
            document.getElementById("emailErr").innerHTML = "";
        } else {
            document.getElementById("emailErr").innerHTML = "please enter your valid email.";
            formErr = true;
        }

    }

    // if(email!=''){
    //     alert("Password send on your Email");
    // }
  
    if (formErr == false) {
        alert("Password send on your Email")

        return true
    } else {
        return false
    }

}


