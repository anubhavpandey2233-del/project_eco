const handlelogin = async () => {


    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    let formErr = false;
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
            formErr = true;
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
            formErr = true;
        }
    }

    // if (formErr == false) {

    //     const response = await fetch("http://localhost:3000/users");
    //     const data=await response.json();
    //     console.log(data);



    // }


    const response = await fetch("http://localhost:3000/users");
    const uData = await response.json();
    console.log(uData);

    let flag = false;

    let loginId=''

    uData.map((v) => {
        if (v.email === email && v.password === password) {
            flag = true;
            loginId=v.id
        }
    })




    if (flag === true) {
        localStorage.setItem("id", loginId)

        window.location.href="index.html"

    } else{
        alert("wrong email or password")
    }
 
}
