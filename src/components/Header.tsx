import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão quando a rolagem ultrapassar 70% da altura da tela (fazendo o botão Hero sumir)
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.substring(1);
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const navItems = [
    { name: "Início", href: "/#inicio", isHash: true },
    { name: "Serviços", href: "/#servicos", isHash: true },
    { name: "Sobre", href: "/#sobre", isHash: true },
    { name: "Contato", href: "/#contato", isHash: true },
    { name: "Acervo de Obras", href: "/portfolio", isHash: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    e.preventDefault();
    if (isHash) {
      if (location.pathname === '/') {
        const targetId = href.replace('/#', '');
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const showContactButton = location.pathname === '/portfolio' || isScrolledPastHero;

  return (
    <header className="bg-azul-escuro border-b-3 border-dourado fixed w-full top-0 z-50 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl relative">
        <motion.a 
          href="/#inicio"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "/#inicio", true)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center z-50 relative"
        >
          <img 
            src="https://drive.google.com/thumbnail?id=1bvEn-NxDoccCBgEjeoNHvuWihM14ar4x&sz=w800" 
            alt="OHMIX Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-white font-bold text-sm tracking-widest mt-1">OHMIX</span>
        </motion.a>
        
        {/* Centralized Action Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <AnimatePresence>
            {showContactButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="pointer-events-auto"
              >
                <a
                  href="https://wa.me/5511994001655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dourado text-azul-escuro px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md font-bold text-[11px] sm:text-xs md:text-sm hover:bg-white transition-colors shadow-lg whitespace-nowrap block"
                >
                  Solicitar Orçamento
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center">
          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href, item.isHash)}
                    className="text-white hover:text-dourado transition-colors font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-dourado transition-colors z-50 relative ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Alternar menu mobile"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-azul-escuro border-b border-dourado/20 shadow-lg md:hidden"
          >
            <ul className="flex flex-col px-6 py-6 space-y-6">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href, item.isHash)}
                    className="text-white block hover:text-dourado transition-colors font-medium text-lg"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
