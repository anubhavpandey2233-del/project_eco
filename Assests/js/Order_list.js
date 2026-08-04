const fetchOrderData = async () => {

    let userId = localStorage.getItem("id");

    // Orders
    const orderRes = await fetch("http://localhost:3000/orders");
    const orders = await orderRes.json();

    const userOrders = orders.filter(v => v.userId == userId);

    // Products
    const productRes = await fetch("http://localhost:3000/products");
    const products = await productRes.json();

    // Cart
    const cartRes = await fetch("http://localhost:3000/cart");
    const carts = await cartRes.json();

    let status = ''

    carts.map((v) => {
        status = v.status
    })
    console.log(status);


    let print = "";

    userOrders.map(v1 => {

        const cart = carts.find(c => c.id == v1.cartId);

        if (cart) {

            print += `
                    <div class="card mb-3 shadow-sm">
            `
            cart.items.map(i => {

                const product = products.find(p => p.id == i.pid);

                if (product) {

                    print += `
                  
                        <div class="row g-0 align-items-center">

                            <div class="col-md-7">
                                <div class="card-body">
                                    <h5 class="card-title itemName" >${product.productName}</h5>

                                    <p class="mb-1 itemqty">
                                        <strong class="itemqty">Quantity :</strong> ${i.quantity}
                                    </p>

                                    
                                </div>
                            </div>

                            <div class="col-md-3 text-center">
                                <h5 class="text-success">₹${product.price}</h5>
                            </div>

                        </div>
                   
                    `;

                }

            });
            print += `
             <p class="mb-1">
                <strong>Total :</strong> ${v1.Amount}
            </p>

            <p class="mb-1">
                <strong>Status :</strong> ${v1.status}
            </p>
            
            </div>`
        }

    });

    document.getElementById("displayData").innerHTML = print;


  

}

window.onload = () => {
    fetchOrderData();
}