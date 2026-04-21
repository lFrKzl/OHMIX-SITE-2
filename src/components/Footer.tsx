import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="bg-[#0a1d37] text-white pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white uppercase">Fale Conosco</h2>
          <div className="w-20 h-1 bg-dourado mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16">
          {/* WhatsApp */}
          <a href="https://wa.me/5511994001655" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:scale-110 transition-all duration-300 mb-4 shadow-lg border border-white/10 group-hover:border-transparent">
              <MessageCircle size={32} className="text-dourado group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors tracking-wide">(11) 99400-1655</span>
          </a>

          {/* Email */}
          <a href="mailto:contato@ohmix.com.br" className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#42b3f5] group-hover:scale-110 transition-all duration-300 mb-4 shadow-lg border border-white/10 group-hover:border-transparent">
              <Mail size={32} className="text-dourado group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors tracking-wide">contato@ohmix.com.br</span>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com/ohmix_eletrica" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-[#fdf497] group-hover:via-[#fd5949] group-hover:to-[#285AEB] group-hover:scale-110 transition-all duration-300 mb-4 shadow-lg border border-white/10 group-hover:border-transparent">
              <Instagram size={32} className="text-dourado group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors tracking-wide">@ohmix_eletrica</span>
          </a>
        </div>

        <div className="pt-8 border-t border-white/10 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} OHMIX Soluções Elétricas. Sua solução completa em energia inteligente!</p>
        </div>
      </div>
    </footer>
  );
}
