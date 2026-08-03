function addAddress() {

    event.preventDefault()

    let addressForm = document.getElementById("addressForm");
    let form = document.createElement("form");
    form.setAttribute("onsubmit", "handleAddressSubmit()")

    let inpNumber = document.createElement("input");
    inpNumber.setAttribute("type", "text");
    inpNumber.setAttribute("placeholder", "enter number")
    inpNumber.setAttribute("id", "number")

    let divNum = document.createElement("div");
    divNum.setAttribute("class", "input-field");

    divNum.appendChild(inpNumber);


    let textareaLine1 = document.createElement("textarea");
    textareaLine1.setAttribute("placeholder", "enter address line 1")
    textareaLine1.setAttribute("id", "addline1")
    let textareaLine2 = document.createElement("textarea");
    textareaLine2.setAttribute("placeholder", "enter address line 2")
    textareaLine2.setAttribute("id", "addline2")

    let divAdd = document.createElement("div");
    divAdd.setAttribute("class", "input-field");

    divAdd.appendChild(textareaLine1);
    divAdd.appendChild(textareaLine2);

    let divGroup = document.createElement("div");
    divGroup.setAttribute("class", "input-group")




    let inpLandmark = document.createElement("input");
    inpLandmark.setAttribute("type", "text");
    inpLandmark.setAttribute("placeholder", "enter Landemark")
    inpLandmark.setAttribute("id", "landmark")

    let divLandmark = document.createElement("div");
    divLandmark.setAttribute("class", "input-field");

    divLandmark.appendChild(inpLandmark)



    let inpCity = document.createElement("input");
    inpCity.setAttribute("type", "text");
    inpCity.setAttribute("placeholder", "enter city")
    inpCity.setAttribute("id", "city")

    let divCity = document.createElement("div");
    divCity.setAttribute("class", "input-field");

    divCity.appendChild(inpCity)

    let inpPincode = document.createElement("input");
    inpPincode.setAttribute("type", "text");
    inpPincode.setAttribute("placeholder", "enter pincode")
    inpPincode.setAttribute("id", "pincode")

    let divPincode = document.createElement("div");
    divPincode.setAttribute("class", "input-field");

    divPincode.appendChild(inpPincode)


    divGroup.appendChild(divNum)
    divGroup.appendChild(divAdd)
    divGroup.appendChild(divLandmark);
    divGroup.appendChild(divCity);
    divGroup.appendChild(divPincode);

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "submitAddress")
    submitBtn.textContent = "submit"

    form.appendChild(divGroup);
    form.appendChild(submitBtn);


    addressForm.appendChild(form)



}

const handleAddressSubmit = async () => {


    let userId = localStorage.getItem("id")
    console.log(userId);


    const respons = await fetch(`http://localhost:3000/users/${userId}`);
    let userData = await respons.json()

    console.log(userData);

    let number = document.getElementById("number").value;
    let addline1 = document.getElementById("addline1").value;
    let addline2 = document.getElementById("addline2").value;
    let landmark = document.getElementById("landmark").value;
    let city = document.getElementById("city").value;
    let pincode = document.getElementById("pincode").value;

    console.log(number, addline1, addline2, landmark, city, pincode);



    let addObj = {
        id: crypto.randomUUID(),
        number,
        addline1,
        addline2,
        landmark,
        city,
        pincode
    }

    console.log(addObj);

    console.log(userData?.address);

    if (userData?.address) {
        userData?.address.push(addObj);

        await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(userData)
        })

    } else {
        userData.address = [addObj];

        await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(userData)
        })
    }



}

const displayAddress = async () => {

    let userId = localStorage.getItem("id")

    const respons = await fetch(`http://localhost:3000/users/${userId}`);
    const userData = await respons.json();

    console.log(userData);
    let print = ''

    console.log(userData.address);

    print += `
            <table border="2" class="table">
                <tr>
                    <th>Select</th>
                    <th>Number</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Landmark</th>
                    <th>City</th>
                    <th>Pincode</th>
                </tr>
        `

    userData.address.map((v) => {

        print += `
            
             <tr>
                <td><input type="radio" name="addrSelec" value="${v.id}" onchange="handleRadioChange(this)"></td>
                
                <td>${v.number}</td>
                <td>${v.addline1}</td>
                <td>${v.addline2}</td>
                <td>${v.landmark}</td>
                <td>${v.city}</td>
                <td>${v.pincode}</td>
            </tr>
        `

    })

    print += `</table>`

    document.getElementById("displayAddress").innerHTML = print

}
const handleRadioChange = (a) => {
    // console.log(a.value);

    document.querySelector(".orderbtn").style.display = "block"


    localStorage.setItem("addId", a.value)

}
const handlePlacedOrder = async () => {

    let userId = localStorage.getItem("id");
    let addrId = localStorage.getItem("addId");
    let Amount = parseInt(localStorage.getItem("Amount"));

    let status = "Placed"


    const response = await fetch("http://localhost:3000/cart");
    const data = await response.json();
    console.log(data);
    let cId
    data.map((v) => {
        cId = v.id
    })
    localStorage.setItem("cartId", cId)
    console.log(cId);

    let obj = {
        userId,
        addrId,
        cId,
        Amount,
        status: 'ordered'
    }

    const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    const orderData = await res.json()

    alert("Your order placed successfully");

    let cartStatus = "Completed"

    let cartStatusObject = {
        cartStatus,
    }

   console.log(cId);
   

    const response1 = await fetch(`http://localhost:3000/cart/${cId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status: "completed"})

    })
    const data1 = await response1.json()
    console.log(data1);


    localStorage.removeItem("addId")
    localStorage.removeItem("cartId")
    localStorage.removeItem("Amount")

    window.location.href="Order_list.html"


}
window.onload = async () => {
    await displayAddress();
}

