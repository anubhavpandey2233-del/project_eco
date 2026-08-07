const showOrderList = async () => {

    const userResponse = await fetch("http://localhost:3000/users");
    const userData = await userResponse.json();

    const orderRes = await fetch("http://localhost:3000/orders");
    const orderData = await orderRes.json();

    const cartRes = await fetch("http://localhost:3000/cart");
    const carts = await cartRes.json();

    const productRes = await fetch("http://localhost:3000/products");
    const products = await productRes.json();

    let print = "";

    orderData.map((o, i) => {

        let user = userData.find((u) => u.id == o.userId);
        let userName = user.name;

        let cart = carts.find((c) => c.id == o.cartId);

        console.log(cart);

        print += `<tr>
        
        <td>${i + 1}</td>
                    <td>${userName}</td>
                    <td>
                    <table>
        `

        cart.items.map((v1) => {


            let product = products.find((p) => p.id == v1.pid);

            print += `
            
                 

                    
                        <tr>
                            <td style="width: 150px;"> ${product.productName}</td>
                            <td style="width: 150px;"> ${v1.quantity}</td>
                            <td style="width: 150px;">₹${product.price}</td>
                        </tr>
                    
              
                     
                `;

        });

        print += `
        </table>
                         
                    </td>
                    <td>₹${o.Amount}</td>
                    <td>
                        <select onchange="handleStatus('${o.id}', this.value)">
                            <option value="order placed" ${o.status == "order placed" ? "selected" : ""}>Order Placed</option>
                            <option value="transit" ${o.status == "transit" ? "selected" : ""}>Transit</option>
                            <option value="delivered" ${o.status == "delivered" ? "selected" : ""}>Delivered</option>
                        </select>
                    </td>
        
        </tr>
                `;

    });

    document.getElementById("orderList").innerHTML = print;
}

const handleStatus = async (id, status) => {

    await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    });

    alert("Status Updated Successfully");
}

window.onload = () => {
    showOrderList();
}

