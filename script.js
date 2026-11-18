const kitchenProducts = [
  {
    name: "Induction Cooktop",
    category: "KITCHEN APPLIANCE",
    description: "Explore convenient cooking with the ATMOCE induction cooktop collection.",
    image: "image/kitchen/Induction-Cooktop.png"
  },
  {
    name: "Electric Cooktop",
    category: "KITCHEN APPLIANCE",
    description: "Discover practical cooking solutions for your modern kitchen.",
    image: "image/kitchen/electric-cooktop.png"
  },
  {
    name: "Mixer Grinder",
    category: "KITCHEN APPLIANCE",
    description: "Explore everyday kitchen convenience with mixer grinders.",
    image: "image/kitchen/mixer-grinder.png"
  },
  {
    name: "Blender",
    category: "KITCHEN APPLIANCE",
    description: "Discover blending solutions for your daily kitchen routine.",
    image: "image/kitchen/blender.png"
  },
  {
    name: "Toaster",
    category: "KITCHEN APPLIANCE",
    description: "Make everyday breakfast preparation more convenient.",
    image: "image/kitchen/toaster.png"
  },
  {
    name: "Air Fryer",
    category: "KITCHEN APPLIANCE",
    description: "Explore convenient cooking solutions for everyday meals.",
    image: "image/kitchen/air-fryer.png"
  },
  {
    name: "Electric Kettle",
    category: "KITCHEN APPLIANCE",
    description: "A convenient addition to your everyday kitchen.",
    image: "image/kitchen/electric-kettle.png"
  }
];

const homeProducts = [
  {
    name: "Air Conditioner",
    category: "HOME APPLIANCE",
    description: "Explore home comfort solutions from ATMOCE.",
    image: "image/home/ac.png"
  },
  {
    name: "Smart TV",
    category: "HOME APPLIANCE",
    description: "Discover entertainment solutions for modern living.",
    image: "image/home/smart-tv.png"
  },
  {
    name: "Room Heater",
    category: "HOME APPLIANCE",
    description: "Explore everyday comfort solutions for your home.",
    image: "image/home/heaters.png"
  },
  {
    name: "Geyser",
    category: "HOME APPLIANCE",
    description: "Discover convenient home appliance solutions.",
    image: "image/home/geyser.png"
  },
  {
    name: "Refrigerator",
    category: "HOME APPLIANCE",
    description: "Explore practical appliances for your modern home.",
    image: "image/home/refrigerator.png"
  },
  {
    name: "Washing Machine",
    category: "HOME APPLIANCE",
    description: "Discover convenient laundry solutions for everyday life.",
    image: "image/home/washing-machine.png"
  },
  {
    name: "Air Cooler",
    category: "HOME APPLIANCE",
    description: "Explore cooling solutions for your living spaces.",
    image: "image/home/cooler.png"
  },
  {
    name: "Pedestal Fan",
    category: "HOME APPLIANCE",
    description: "Explore everyday home comfort appliances.",
    image: "image/home/pedestal-fan.png"
  },
  {
    name: "Electric Iron",
    category: "HOME APPLIANCE",
    description: "Discover useful appliances for your daily routine.",
    image: "image/home/iron.png"
  },
  {
    name: "Immersion Rod",
    category: "HOME APPLIANCE",
    description: "Explore practical home appliance solutions.",
    image: "image/home/immersion-rod.png"
  },
  {
    name: "Ceiling Fan",
    category: "HOME APPLIANCE",
    description: "Discover appliances designed for everyday home comfort.",
    image: "image/home/ceiling-fan.png"
  }
];

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85'"
        >
      </div>
      <div class="product-info">
        <span>${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button class="view-product" data-type="${containerId}" data-index="${index}">
          View Details ↗
        </button>
      </div>
    </article>
  `).join("");
}

renderProducts(kitchenProducts, "kitchenProducts");
renderProducts(homeProducts, "homeProducts");

function createMegaLinks(products, containerId, mobileId) {
  const mega = document.getElementById(containerId);
  const mobile = document.getElementById(mobileId);

  const links = products.map(product =>
    `<a href="${containerId === "kitchenMega" ? "#kitchen" : "#home-appliances"}">${product.name} ↗</a>`
  ).join("");

  if (mega) mega.innerHTML = links;
  if (mobile) mobile.innerHTML = links;
}

createMegaLinks(kitchenProducts, "kitchenMega", "mobileKitchen");
createMegaLinks(homeProducts, "homeMega", "mobileHome");

document.addEventListener("click", event => {
  const button = event.target.closest(".view-product");
  if (!button) return;

  const products = button.dataset.type === "kitchenProducts"
    ? kitchenProducts
    : homeProducts;

  const product = products[Number(button.dataset.index)];

  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;

  const enquiry = document.getElementById("modalEnquiry");
  enquiry.href = `mailto:info@atmoce.com?subject=${encodeURIComponent("Enquiry for " + product.name)}`;

  document.getElementById("productModal").classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  document.getElementById("productModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("productModal").addEventListener("click", event => {
  if (event.target.id === "productModal") closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

function setupProductSlider(buttonId, trackId, direction) {
  const button = document.getElementById(buttonId);
  const track = document.getElementById(trackId);

  if (!button || !track) return;

  button.addEventListener("click", () => {
    const card = track.querySelector(".product-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const amount = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: amount * direction,
      behavior: "smooth"
    });
  });
}

setupProductSlider("kitchenPrev", "kitchenProducts", -1);
setupProductSlider("kitchenNext", "kitchenProducts", 1);
setupProductSlider("homePrev", "homeProducts", -1);
setupProductSlider("homeNext", "homeProducts", 1);

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-category").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    const isOpen = target.classList.toggle("open");

    button.querySelector("span").textContent = isOpen ? "−" : "+";
  });
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle(
    "scrolled",
    window.scrollY > 30
  );
});

document.getElementById("year").textContent = new Date().getFullYear();