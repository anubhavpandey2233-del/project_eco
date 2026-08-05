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

      

        cart.items.map((v1) => {

            let product = products.find((p) => p.id == v1.pid);

            print += `
                <div class="order-row">
                    <div>${i + 1}</div>
                    <div>${userName}</div>
                    <div>
                        ${product.productName} (${v1.quantity})  ₹${product.price}
                    </div>
                    <div>₹${o.Amount}</div>
                    <div>
                        <select>
                            <option value="order placed" ${o.status=="order placed"?"selected":""}>Order Placed</option>
                            <option value="transit" ${o.status=="transit"?"selected":""}>Transit</option>
                            <option value="delivered" ${o.status=="delivered"?"selected":""}>Delivered</option>
                        </select>
                    </div>
                </div>
            `;

        });

    });

    document.getElementById("orderList").innerHTML = print;
}

window.onload = () => {
    showOrderList();
}

