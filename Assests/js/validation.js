function handlelogin() {
   

    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    
    let formErr=false;
    console.log(email, password);

    if (email === '') {
        document.getElementById("emailErr").innerHTML = "please enter your email.";
        formErr = true;
    } else {
        const reemail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (reemail.test(email)) {
            document.getElementById("emailErr").innerHTML = "";
        } else {
            document.getElementById("emailErr").innerHTML = "please enter your valid email.";
            formErr=true;
        }

    }

    if (password === '') {
        document.getElementById("passwordErr").innerHTML = "please enter your password.";
        formErr = true;
    } else {
        var repass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (repass.test(password)) {
            document.getElementById("passwordErr").innerHTML = ""
        } else {
            document.getElementById("passwordErr").innerHTML = "please enter your strong password.";
            formErr=true;
        }
    }

    if(formErr==false){
        alert("your form sumitted successfully.")
        return true;
    } else{
        return false;
    }
}


