import { WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { trackWhatsAppClick } from "@/hooks/useAnalytics";

export default function WhatsAppFloat() {
  const whatsappNumber = "916284925684";
  const message = "Hi! I need help with SAGEDO AI services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating_button')}
      data-testid="button-whatsapp-float"
      className="fixed bottom-6 right-6 [body.has-cookie-banner_&]:bottom-20 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:scale-110 transition-all duration-300 hover-elevate active-elevate-2"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}
