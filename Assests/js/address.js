const fetchCartData=async()=>{

    const respons=await fetch("http://localhost:3000/cart");
    const data=await respons.json()

    console.log(data);
    
    uData=data.find((v)=>v.id==userId);
    let print=''

    uData.map((v)=>{
        print+=`
            <form>

                <div class="input-group">

                    <div class="input-field">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter first name">
                    </div>

                    <div class="input-field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter last name">
                    </div>

                </div>


                <div class="input-field">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter email address">
                </div>


                <div class="input-field">
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter phone number">
                </div>


                <div class="input-field">
                    <label>Full Address</label>
                    <textarea placeholder="Enter your address"></textarea>
                </div>


                <div class="input-group">

                    <div class="input-field">
                        <label>City</label>
                        <input type="text" placeholder="Enter city">
                    </div>


                    <div class="input-field">
                        <label>State</label>
                        <input type="text" placeholder="Enter state">
                    </div>

                </div>


                <div class="input-group">

                    <div class="input-field">
                        <label>Country</label>
                        <input type="text" placeholder="Enter country">
                    </div>


                    <div class="input-field">
                        <label>Zip Code</label>
                        <input type="text" placeholder="Enter zip code">
                    </div>

                </div>


                <button class="continue-btn">
                    Continue To Payment
                </button>


            </form>

        `
    })
}


window.onload=()=>{
    fetchCartData()
}