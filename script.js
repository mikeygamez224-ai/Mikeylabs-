const products = [
  {id:"starter",name:"Business Starter Kit",type:"PLANNING KIT",description:"A simple launch checklist, idea worksheet and first-month action planner.",price:"Coming soon",color:"#f0edff",symbol:"✦"},
  {id:"social",name:"Social Media Planner Kit",type:"CONTENT KIT",description:"A content calendar, post prompts and campaign planning sheets for small brands.",price:"Coming soon",color:"#eaf5f1",symbol:"▤"},
  {id:"shop",name:"Small Shop Launch Kit",type:"RETAIL KIT",description:"A product listing checklist, customer FAQ template and shop launch planner.",price:"Coming soon",color:"#fff2e8",symbol:"◇"}
];

const productGrid = document.getElementById("productGrid");
productGrid.innerHTML = products.map((product) => `
  <article class="product-card">
    <div class="product-visual" style="--visual:${product.color}">
      <div class="product-sheet" aria-hidden="true">
        <div class="sheet-line wide"></div><div class="sheet-line narrow"></div>
        <div class="sheet-blocks"><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="product-info">
      <span class="product-type">${product.type}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom"><span class="price">${product.price}</span>
      <button class="small-button" type="button" data-product="${product.name}">Enquire ↗</button></div>
    </div>
  </article>`).join("");

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  document.getElementById("interest").value = button.dataset.product === "Business Starter Kit"
    ? "Business Starter Kit"
    : button.dataset.product === "Social Media Planner Kit"
      ? "Social Media Planner Kit" : "Small Shop Launch Kit";
  document.getElementById("contact").scrollIntoView({behavior:"smooth"});
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("customerEmail").value.trim();
  const status = document.getElementById("formStatus");
  if (!email) {
    status.textContent = "Add an email address to preview your enquiry.";
    return;
  }
  status.textContent = "Demo only: your enquiry has not been sent or saved. Connect a secure form service when you are ready to accept real enquiries.";
});

document.getElementById("year").textContent = new Date().getFullYear();

// Customer-facing tracking demo. This is local sample data only.
// A secure server/database is required before using real customer orders.
const demoOrders = {
  "ML-DEMO-001": {
    product: "Business Starter Kit",
    status: 2,
    statusLabel: "Design production",
    steps: [
      "Order received",
      "Content preparation",
      "Design production",
      "Quality check",
      "Final delivery"
    ]
  }
};

const trackingForm = document.getElementById("trackingForm");
const trackingResult = document.getElementById("trackingResult");

trackingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reference = document.getElementById("orderReference").value.trim().toUpperCase();
  const order = demoOrders[reference];

  trackingResult.hidden = false;
  if (!order) {
    trackingResult.innerHTML = `
      <div class="tracking-result-head"><h3>We couldn't find that order.</h3></div>
      <p class="tracking-disclaimer">Check the reference and try again. This prototype only contains the sample order ML-DEMO-001; real order lookup is not connected yet.</p>`;
    return;
  }

  const steps = order.steps.map((step, index) => {
    const state = index < order.status ? "done" : index === order.status ? "current" : "";
    const label = index < order.status ? "Completed" : index === order.status ? "In progress" : "Pending";
    const icon = index < order.status ? "✓" : String(index + 1);
    return `<li class="${state}">
      <span class="tracking-step-icon">${icon}</span>
      <span><span class="tracking-step-title">${step}</span><br><span class="tracking-step-state">${label}</span></span>
    </li>`;
  }).join("");

  trackingResult.innerHTML = `
    <div class="tracking-result-head">
      <div><span class="eyebrow">ORDER ${reference}</span><h3>${order.product}</h3></div>
      <span class="product-type">${order.statusLabel.toUpperCase()}</span>
    </div>
    <ol class="tracking-steps">${steps}</ol>
    <p class="tracking-disclaimer">Demo status only. No live production system is connected yet.</p>`;
  trackingResult.scrollIntoView({behavior:"smooth", block:"nearest"});
});
