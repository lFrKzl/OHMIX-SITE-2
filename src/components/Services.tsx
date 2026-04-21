import { motion } from "motion/react";
import { 
  Plug, 
  Home, 
  Server, 
  Sun, 
  Smartphone, 
  Cctv, 
  UtilityPole, 
  ClipboardList 
} from "lucide-react";

const services = [
  {
    icon: Plug,
    title: "Manutenção elétrica geral (Residencial & Comercial)",
    description: "Serviços completos de reparo e prevenção para garantir o funcionamento seguro e eficiente de todas as suas instalações elétricas."
  },
  {
    icon: Home,
    title: "Instalação de elétrica geral (Residencial & Comercial)",
    description: "Execução de projetos elétricos do zero, com cabeamento estruturado e dimensionamento correto para atender todas as suas necessidades."
  },
  {
    icon: Server,
    title: "Montagem e manutenção em quadro de distribuição",
    description: "Organização, balanceamento de fases e instalação de dispositivos de proteção (DR, DPS, Disjuntores) para máxima segurança do seu imóvel."
  },
  {
    icon: Sun,
    title: "Instalação de painéis solares fotovoltaicos",
    description: "Sistemas completos de energia solar para você gerar sua própria energia, reduzindo drasticamente a conta de luz com sustentabilidade."
  },
  {
    icon: Smartphone,
    title: "Automação Residencial (Smart Home & Domótica)",
    description: "Transforme sua casa em um ambiente inteligente. Controle iluminação, climatização e segurança diretamente do seu smartphone ou por voz."
  },
  {
    icon: Cctv,
    title: "Instalação de CFTV & Câmeras de Segurança",
    description: "Monitoramento 24 horas com câmeras de alta resolução e acesso remoto, proporcionando tranquilidade e proteção para seu patrimônio."
  },
  {
    icon: UtilityPole,
    title: "Padrão de Entrada (Instalação e Adequação)",
    description: "Montagem e regularização do padrão de energia junto à concessionária local, garantindo a aprovação rápida e fornecimento seguro."
  },
  {
    icon: ClipboardList,
    title: "Projetos Elétricos & Laudos Técnicos",
    description: "Elaboração de plantas, diagramas unifilares e emissão de TRT por profissional habilitado para atestar a conformidade das instalações."
  }
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#0a1d37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-dourado font-bold tracking-widest uppercase text-sm mb-2 block"
          >
            Excelência Técnica
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-azul-escuro uppercase">Nossos Serviços</h2>
          <div className="w-24 h-1.5 bg-dourado mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="relative bg-white p-8 rounded-2xl text-center transition-all shadow-[0_10px_40px_-15px_rgba(10,29,55,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(197,160,89,0.2)] border border-gray-100 group overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-azul-escuro to-dourado opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-cinza-claro rounded-2xl group-hover:bg-azul-escuro transition-colors duration-300">
                  <service.icon size={40} className="text-azul-escuro group-hover:text-dourado transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-azul-escuro mb-4 min-h-[3.5rem] flex items-center justify-center leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <div className="pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                <span className="text-dourado text-xs font-bold uppercase tracking-wider">Consultar Especialista</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
