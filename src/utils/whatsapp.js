import { BUSINESS } from "../config";

/**
 * Generates a client-side temporary reference ID e.g. RRS-20260913-4821
 */
export function generateOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random4 = Math.floor(1000 + Math.random() * 9000);
  return `RRS-${year}${month}${day}-${random4}`;
}

/**
 * Formats order data into clean structured WhatsApp text message and returns WhatsApp link.
 */
export function formatOrderWhatsAppMessage(orderData, orderId) {
  const lines = [
    `*NEW STAMP ORDER REFERENCE: ${orderId}*`,
    `Hello Rafa Rubber Stamps, I would like to place a custom stamp order.\n`,
    `*👤 CUSTOMER DETAILS:*`,
    `• Name: ${orderData.customerName}`,
    `• Mobile: ${orderData.mobile}`,
    orderData.whatsapp ? `• WhatsApp: ${orderData.whatsapp}` : null,
    orderData.email ? `• Email: ${orderData.email}` : null,
    `\n*📦 STAMP SPECIFICATIONS:*`,
    `• Type: ${orderData.stampType}`,
    `• Shape: ${orderData.shape}`,
    `• Size: ${orderData.size}${orderData.customSizeWidth ? ` (${orderData.customSizeWidth}mm x ${orderData.customSizeHeight}mm)` : ""}`,
    `• Quantity: ${orderData.quantity}`,
    `• Ink Color: ${orderData.inkColor}`,
    `• Stamp Text / Content:`,
    `"${orderData.stampText.trim()}"`,
    orderData.additionalRequirements ? `\n*📝 ADDITIONAL REQUIREMENTS:*\n${orderData.additionalRequirements}` : null,
    `\n*📍 DELIVERY ADDRESS:*`,
    `• Address: ${orderData.address}`,
    `• City/Town: ${orderData.city}`,
    `• District: ${orderData.district}`,
    `• State: ${orderData.state}`,
    `• Pincode: ${orderData.pincode}`,
    `• Region Type: ${orderData.deliveryLocation}`,
    `\n*📎 ATTACHMENT STATUS:*`,
    orderData.hasDesignFile ? `✓ Artwork / Signature / Logo prepared for attachment` : `• No design file (Text only stamp)`,
    orderData.hasGovtIdFile ? `✓ Government ID Proof prepared for attachment` : `• No ID file attached`,
    `\n*PLEASE NOTE:* I will attach my artwork/signature and Govt ID proof in this chat right now. Please review my details and confirm the total price, design preview and estimated delivery time.`
  ].filter(Boolean);

  const rawText = lines.join("\n");
  const encodedText = encodeURIComponent(rawText);
  const whatsappUrl = `https://wa.me/${BUSINESS.orderWhatsappRaw}?text=${encodedText}`;

  return {
    orderId,
    formattedText: rawText,
    whatsappUrl
  };
}

/**
 * Creates general quick inquiry message links
 */
export function getGeneralWhatsAppLink(topic = "General Inquiry") {
  let text = `Hello Rafa Rubber Stamps, I would like to know more about your custom stamp services in Tenkasi.`;
  if (topic === "Logo Stamp") {
    text = `Hello Rafa Rubber Stamps, I am interested in getting a custom Logo Stamp for my business. Please provide details.`;
  } else if (topic === "Business Stamp") {
    text = `Hello Rafa Rubber Stamps, I need an official Business / Company Seal stamp. Please assist me.`;
  }
  return `https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(text)}`;
}
