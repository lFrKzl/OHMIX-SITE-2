import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function About() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const defaultLogo = "https://drive.google.com/thumbnail?id=1bvEn-NxDoccCBgEjeoNHvuWihM14ar4x&sz=w1000";

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .storage
          .from("portfolio-ohmix")
          .list("", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });
        
        if (error) {
          throw error;
        }

        if (data && Array.isArray(data)) {
          const validImages = data
            .filter((file) => file.name && file.name !== ".emptyFolderPlaceholder")
            .map((file) => {
              const { data: publicUrlData } = supabase
                .storage
                .from("portfolio-ohmix")
                .getPublicUrl(file.name);
              return publicUrlData.publicUrl;
            });
          
          setImages([defaultLogo, ...validImages]);
        }
      } catch (error) {
        console.error("Erro ao buscar imagens do Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <section id="sobre" className="py-24 bg-azul-escuro text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-dourado/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-dourado/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-block px-4 py-1 bg-dourado/20 text-dourado rounded-full text-sm font-bold mb-6">
              Compromisso com a Excelência
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Kelvin Deoldoto</h2>
            <p className="text-xl text-dourado font-medium mb-8">Eletrotécnico Responsável</p>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Na <span className="text-white font-bold">OHMIX</span>, acreditamos que a eletricidade deve ser sinônimo de segurança absoluta e eficiência energética. Com uma trajetória pautada pelo rigor técnico, transformamos a forma como você interage com a energia.
              </p>
              <p>
                Nossa missão é oferecer soluções completas e inteligentes, desde manutenções preventivas essenciais até os mais sofisticados projetos de automação residencial e energia solar fotovoltaica.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full"
          >
            <div className="relative z-10 w-full max-w-md mx-auto aspect-square flex flex-col items-center justify-center">
              {loading || images.length === 0 ? (
                <>
                  <img 
                    src={defaultLogo} 
                    alt="OHMIX Logo" 
                    className="w-full max-w-[80%] h-auto object-contain transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-white font-bold text-4xl tracking-[0.3em] mt-8 drop-shadow-lg">OHMIX</span>
                </>
              ) : (
                <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden group shadow-2xl ring-1 ring-white/10 p-2 bg-white/5 flex items-center justify-center">
                  <img 
                    src={images[currentIndex]}
                    alt={`Portfolio OHMIX ${currentIndex + 1}`}
                    className={`w-full h-full rounded-xl transition-opacity duration-500 object-contain ${
                      images[currentIndex] === defaultLogo 
                        ? 'p-8 sm:p-12' 
                        : 'bg-black/20'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white p-2.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-dourado"
                        aria-label="Imagem Anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white p-2.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-dourado"
                        aria-label="Próxima Imagem"
                      >
                        <ChevronRight size={24} />
                      </button>

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex-wrap justify-center w-[90%] md:w-auto">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${
                              idx === currentIndex 
                                ? 'w-6 h-2 bg-dourado' 
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Ir para a imagem ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
