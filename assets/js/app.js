const WHATSAPP_NUMBER = "256742602919";

// Format number with commas for Uganda Shillings
function formatUGX(amount) {
  return "Shs " + Number(amount).toLocaleString("en-US");
}

// Update displayed price when a size dropdown changes
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("variant-size-select")) {
    const card = e.target.closest(".product-card");
    const selectedOption = e.target.options[e.target.selectedIndex];
    const newPrice = selectedOption.getAttribute("data-price");
    const priceDisplay = card.querySelector(".price-tag");
    if (newPrice && priceDisplay) {
      priceDisplay.textContent = formatUGX(newPrice);
    }
  }
});

// Handle "Order on WhatsApp" button click on any product card
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".order-wa-btn");
  if (!btn) return;

  const card = btn.closest(".product-card");
  const productName = btn.getAttribute("data-product");
  const basePrice = btn.getAttribute("data-price");

  // Check if product has a size selector
  const sizeSelect = card.querySelector(".variant-size-select");
  let sizeText = "";
  let finalPrice = basePrice;

  if (sizeSelect) {
    const selectedOpt = sizeSelect.options[sizeSelect.selectedIndex];
    sizeText = `\n• Size: ${selectedOpt.value}`;
    finalPrice = selectedOpt.getAttribute("data-price");
  }

  // Check if product has a scent/flavor selector
  const scentSelect = card.querySelector(".variant-scent-select");
  let scentText = "";
  if (scentSelect) {
    scentText = `\n• Scent / Option: ${scentSelect.value}`;
  }

  // Check quantity
  const qtyInput = card.querySelector(".product-qty");
  const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
  const totalAmount = Number(finalPrice) * qty;

  const message =
    `Hello Hair Renew! ✨ I would like to place an order:\n\n` +
    `• Product: *${productName}*` +
    `${sizeText}` +
    `${scentText}\n` +
    `• Unit Price: ${formatUGX(finalPrice)}\n` +
    `• Quantity: ${qty}\n` +
    `• Total: *${formatUGX(totalAmount)}*\n\n` +
    `Please let me know delivery/pickup details.`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
});

// Handle Treatment Consultation Booking Form (treatments.html)
const bookingForm = document.getElementById("treatmentBookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const service = document.getElementById("treatmentType").value;
    const preferredDate = document.getElementById("preferredDate").value;
    const notes = document.getElementById("conditionNotes").value.trim();

    const message =
      `Hello Hair Renew! 🌿 I would like to book a Beauty & Treatment Consultation:\n\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Treatment: *${service}*\n` +
      `• Preferred Date: ${preferredDate || "Flexible"}\n` +
      `• Hair/Skin Concerns: ${notes || "Will discuss during consultation"}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  });
}
