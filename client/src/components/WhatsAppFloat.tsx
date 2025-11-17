import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const whatsappNumber = "917018709291";
  const message = "Hi! I need help with SAGEDO AI services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:scale-110 transition-transform duration-300 hover-elevate active-elevate-2"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
