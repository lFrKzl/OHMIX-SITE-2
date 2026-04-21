import { motion } from "motion/react";

export default function Header() {
  const navItems = [
    { name: "Início", href: "#inicio" },
    { name: "Serviços", href: "#servicos" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="bg-azul-escuro border-b-3 border-dourado fixed w-full top-0 z-50 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <motion.a 
          href="#inicio"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center"
        >
          <img 
            src="https://drive.google.com/thumbnail?id=1bvEn-NxDoccCBgEjeoNHvuWihM14ar4x&sz=w800" 
            alt="OHMIX Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-white font-bold text-sm tracking-widest mt-1">OHMIX</span>
        </motion.a>
        <nav>
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={item.href} 
                  className="text-white hover:text-dourado transition-colors font-medium"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
