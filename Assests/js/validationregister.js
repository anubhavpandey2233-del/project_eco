const handleregister = async () => {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;


    console.log(email, password, name);

    let formErr = false;

    if (name === '') {
        document.getElementById("nameErr").innerHTML = "please enter your name.";
        formErr = true;
    } else {
        const rename = /^[a-zA-Z ]+$/

        if (rename.test(name)) {
            document.getElementById("nameErr").innerHTML = "";
        } else {
            document.getElementById("nameErr").innerHTML = "please enter your valid name.";
            formErr = true;
        }
    }


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

    if (formErr == false) {
        let obj = {
            name,
            email,
            password
        }

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json(obj)

        console.log(data);

        if (data) {
            alert("form submitted successfully")
            window.location.href = "login.html"
        }

    }




}


