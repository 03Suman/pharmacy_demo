const products = [
 {id:1,name:"Paracetamol 500mg",brand:"HealthCare",price:39,mrp:49,cat:"Medicines",visual:"💊",rx:false},
 {id:2,name:"Vitamin C 1000mg",brand:"Wellness Plus",price:249,mrp:299,cat:"Vitamins",visual:"🧴",rx:false},
 {id:3,name:"Digital BP Monitor",brand:"MediTech",price:1299,mrp:1599,cat:"Devices",visual:"🩺",rx:false},
 {id:4,name:"Diabetic Care Kit",brand:"SugarSafe",price:699,mrp:799,cat:"Diabetes",visual:"🧪",rx:false},
 {id:5,name:"Cetirizine 10mg",brand:"AllerFree",price:85,mrp:110,cat:"Medicines",visual:"💊",rx:true},
 {id:6,name:"Omega 3 Capsules",brand:"NutriLife",price:399,mrp:499,cat:"Vitamins",visual:"🫙",rx:false},
 {id:7,name:"Antiseptic Liquid",brand:"SafeGuard",price:179,mrp:210,cat:"Personal Care",visual:"🧴",rx:false},
 {id:8,name:"Glucometer Kit",brand:"MediTech",price:899,mrp:1099,cat:"Devices",visual:"🩸",rx:false},
 {id:9,name:"Amoxicillin 500mg",brand:"MediCare Labs",price:145,mrp:180,cat:"Medicines",visual:"💊",rx:true},
 {id:10,name:"Pantoprazole 40mg",brand:"AcidLess",price:120,mrp:150,cat:"Medicines",visual:"💊",rx:true},
 {id:11,name:"Multivitamin Daily",brand:"Wellness Plus",price:329,mrp:399,cat:"Vitamins",visual:"🫙",rx:false},
 {id:12,name:"Thermometer",brand:"MediTech",price:299,mrp:349,cat:"Devices",visual:"🌡️",rx:false}
];
let cart = JSON.parse(localStorage.getItem("medicare_cart")||"[]");
let currentCategory="All";
const $=s=>document.querySelector(s);

function money(n){return "₹"+n.toLocaleString("en-IN")}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function renderCategories(){
 const cats=["All","Medicines","Vitamins","Devices","Diabetes","Personal Care"];
 $("#categoryRow").innerHTML=cats.map(c=>`<button class="category ${c===currentCategory?"active":""}" onclick="setCategory('${c}')">${c}</button>`).join("");
}
function card(p){
 return `<article class="product-card">
 <div class="product-img">${p.rx?'<span class="rx-tag">PRESCRIPTION</span>':''}<span class="visual">${p.visual}</span></div>
 <div class="product-info"><div class="product-brand">${p.brand}</div><div class="product-name">${p.name}</div>
 <div class="price-row"><div><span class="price">${money(p.price)}</span><span class="mrp">${money(p.mrp)}</span></div><button class="add-btn" onclick="addToCart(${p.id})">+ Add</button></div></div></article>`
}
function renderProducts(){
 const shown=products.filter(p=>currentCategory==="All"||p.cat===currentCategory);
 $("#productGrid").innerHTML=shown.map(card).join("");
}
function setCategory(c){currentCategory=c;renderCategories();renderProducts()}
function addToCart(id){
 const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);
 if(item)item.qty++;else cart.push({id,qty:1});
 saveCart();openCart();toast(`${p.name} added to cart`);
}
function saveCart(){localStorage.setItem("medicare_cart",JSON.stringify(cart));renderCart();$("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){
 const box=$("#cartItems");
 if(!cart.length){box.innerHTML='<div class="empty-cart">Your cart is empty.<br><br>Browse products and add something you need.</div>';$("#subtotal").textContent="₹0";return}
 let total=0;
 box.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);total+=p.price*item.qty;return `<div class="cart-item"><div class="mini-img">${p.visual}</div><div class="cart-meta"><b>${p.name}</b><small>${money(p.price)} each</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><b>${money(p.price*item.qty)}</b></div>`}).join("");
 $("#subtotal").textContent=money(total)
}
function changeQty(id,d){const x=cart.find(i=>i.id===id);x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart()}
function openCart(){$("#cartDrawer").classList.add("show");$("#overlay").classList.add("show")}
function closeCart(){$("#cartDrawer").classList.remove("show");$("#overlay").classList.remove("show")}
function checkout(){
 if(!cart.length){toast("Your cart is empty");return}
 const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 $("#checkoutContent").innerHTML=`<div class="eyebrow">SECURE CHECKOUT</div><h2 class="checkout-title">Complete your order</h2><p class="checkout-sub">Demo checkout — no real payment is processed.</p>
 <div class="form-grid"><div class="field"><label>FULL NAME</label><input id="name" placeholder="Rahul Sharma"></div><div class="field"><label>PHONE</label><input id="phone" placeholder="+91 98765 43210"></div><div class="field full-field"><label>DELIVERY ADDRESS</label><textarea id="address" rows="3" placeholder="House, street, city, PIN code"></textarea></div></div>
 <div class="eyebrow" style="margin-top:22px">PAYMENT METHOD</div><div class="pay-options"><div class="pay-option selected" data-pay="cod">💵 Cash on Delivery</div><div class="pay-option" data-pay="online">💳 Online Payment</div></div>
 <div class="confirm-box"><b>Order total: ${money(total)}</b><br><span>Free delivery • Estimated 2–3 days</span></div><button class="primary-btn full" onclick="placeOrder()">Place order securely →</button>`;
 document.querySelectorAll(".pay-option").forEach(x=>x.onclick=()=>{document.querySelectorAll(".pay-option").forEach(y=>y.classList.remove("selected"));x.classList.add("selected")});
 $("#checkoutModal").classList.add("show");closeCart();
}
function placeOrder(){
 const name=$("#name").value.trim(),phone=$("#phone").value.trim(),address=$("#address").value.trim();
 if(!name||!phone||!address){toast("Please complete your delivery details");return}
 const pay=document.querySelector(".pay-option.selected").dataset.pay;
 const id="MC-"+Math.floor(10000+Math.random()*89999);
 localStorage.setItem("medicare_last_order",JSON.stringify({id,name,phone,address,pay,status:1,date:new Date().toLocaleDateString("en-IN")}));
 cart=[];saveCart();
 $("#checkoutContent").innerHTML=`<div class="success"><div class="success-icon">✓</div><div class="eyebrow">ORDER CONFIRMED</div><h2 class="checkout-title">Thanks, ${name.split(" ")[0]}!</h2><p class="checkout-sub">Your demo order has been placed successfully.</p><div class="order-id">${id}</div><p style="font-size:11px;color:#778680">Payment: ${pay==="cod"?"Cash on Delivery":"Online Payment"}<br>Expected delivery in 2–3 days.</p><button class="primary-btn" onclick="closeCheckout();document.querySelector('#track').scrollIntoView()">Track my order →</button></div>`;
}
function trackOrder(){
 const input=$("#orderInput").value.trim();const last=JSON.parse(localStorage.getItem("medicare_last_order")||"null");
 const id=input||last?.id;
 if(!id){toast("Enter an order ID");return}
 const found=last&&id.toUpperCase()===last.id.toUpperCase();
 const current=found?3:2;
 $("#trackingCard").classList.remove("hidden");
 $("#trackingCard").innerHTML=`<div class="track-top"><div><div class="eyebrow">ORDER ${id.toUpperCase()}</div><h3 style="margin:0;font:800 19px Manrope">${found?"Your order is on the way":"Demo order tracking"}</h3></div><span class="status-pill">${found?"Out for delivery":"Shipped"}</span></div>
 <div class="timeline">${["Placed","Confirmed","Shipped","Out for delivery","Delivered"].map((x,i)=>`<div class="step ${i<current?"done":""}"><div class="dot">${i<current?"✓":i+1}</div>${x}</div>`).join("")}</div>`;
}
$("#rxFile").onchange=e=>{const f=e.target.files[0];if(!f)return;$("#rxName").textContent=f.name;toast("Prescription uploaded successfully");setTimeout(()=>{$("#rxResults").classList.remove("hidden");$("#rxGrid").innerHTML=products.filter(p=>p.rx).map(card).join("");$("#rxResults").scrollIntoView({behavior:"smooth",block:"start"})},500)}
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;$("#checkoutBtn").onclick=checkout;
$("#closeCheckout").onclick=()=>$("#checkoutModal").classList.remove("show");
$("#checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")$("#checkoutModal").classList.remove("show")});
$("#trackBtn").onclick=trackOrder;
$("#viewAll").onclick=()=>{currentCategory="All";renderCategories();renderProducts();$("#products").scrollIntoView({behavior:"smooth"})};
$("#searchBtn").onclick=()=>{const q=prompt("Search products");if(!q)return;const matches=products.filter(p=>(p.name+" "+p.brand).toLowerCase().includes(q.toLowerCase()));$("#productGrid").innerHTML=matches.length?matches.map(card).join(""):'<p style="color:#7b8984">No products found. Try another search.</p>';$("#products").scrollIntoView({behavior:"smooth"})};
renderCategories();renderProducts();saveCart();
