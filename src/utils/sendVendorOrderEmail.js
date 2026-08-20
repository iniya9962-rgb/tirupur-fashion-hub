import emailjs from "@emailjs/browser";

const EMAIL_SERVICE_ID = "service_466q9sd";
const VENDOR_ORDER_TEMPLATE_ID = "template_di3dkz8";
const EMAIL_PUBLIC_KEY = "BkBJdouBomcnqXGBA";

export async function sendVendorOrderEmail(order) {
  if (!order.vendorEmail) {
    console.warn("Vendor email is missing for this order.");
    return;
  }

  await emailjs.send(
    EMAIL_SERVICE_ID,
    VENDOR_ORDER_TEMPLATE_ID,
    {
      vendor_email: order.vendorEmail,
      vendor_name: order.vendorName || "Vendor",
      product_name: order.productName,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      quantity: order.quantity,
      price: order.price,
      status: order.status,
    },
    EMAIL_PUBLIC_KEY
  );
}
