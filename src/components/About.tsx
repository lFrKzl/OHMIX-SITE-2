import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Search } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function About() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Lightbox State
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const defaultLogo = "https://drive.google.com/thumbnail?id=1bvEn-NxDoccCBgEjeoNHvuWihM14ar4x&sz=w1000";

  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        const allFetchedImages: string[] = [defaultLogo];

        // Fetch from 'carrossel' folder
        const { data: carrosselData } = await supabase.storage.from("portfolio-ohmix").list("carrossel", { limit: 50 });
        if (carrosselData) {
          carrosselData.forEach(file => {
             if (file.name && file.name !== ".emptyFolderPlaceholder" && file.id) {
                const { data } = supabase.storage.from("portfolio-ohmix").getPublicUrl(`carrossel/${file.name}`);
                allFetchedImages.push(data.publicUrl);
             }
          });
        }

        setImages(allFetchedImages);
      } catch (error) {
        console.error("Erro ao buscar imagens do Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarouselImages();
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  }
  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }

  const closePopout = () => {
    setIsPopoutOpen(false);
    setZoomLevel(1);
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
            
            {/* NOVO BOTAO: Ver todas as fotos */}
            <div className="mt-12">
              <Link 
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-dourado text-dourado hover:bg-dourado hover:text-azul-escuro rounded-xl font-bold transition-all duration-300 gap-3 group"
              >
                Explorar Acervo de Obras
                <Search size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full"
          >
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
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
                <div 
                  onClick={() => setIsPopoutOpen(true)}
                  className="relative w-full aspect-[163/100] rounded-2xl overflow-hidden group shadow-2xl ring-1 ring-white/10 p-2 bg-white/5 flex items-center justify-center cursor-pointer hover:ring-dourado/50 transition-all duration-500"
                  title="Clique para ampliar a imagem"
                >
                  <img 
                    src={images[currentIndex]}
                    alt={`Portfolio OHMIX ${currentIndex + 1}`}
                    className={`w-full h-full rounded-xl transition-transform duration-700 object-contain group-hover:scale-105 ${
                      images[currentIndex] === defaultLogo 
                        ? 'p-8 sm:p-12' 
                        : 'bg-black/20'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay Click to View */}
                  <div className="absolute inset-0 bg-azul-escuro/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 rounded-2xl pointer-events-none">
                     <span className="bg-dourado text-azul-escuro font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <Search size={20} />
                       Ampliar Foto
                     </span>
                  </div>
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrev}
                        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white p-2.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-dourado"
                        aria-label="Imagem Anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <button 
                        onClick={handleNext}
                        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white p-2.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-dourado"
                        aria-label="Próxima Imagem"
                      >
                        <ChevronRight size={24} />
                      </button>

                      <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex-wrap justify-center w-[90%] md:w-auto">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
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

      {/* Popout Lightbox Component */}
      <AnimatePresence>
        {isPopoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            {/* Controles Top Direita */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
              <button onClick={handleZoomIn} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors" title="Aumentar Zoom">
                 <ZoomIn size={24} />
              </button>
              <button onClick={handleZoomOut} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors" title="Diminuir Zoom">
                 <ZoomOut size={24} />
              </button>
              <div className="w-px h-8 bg-white/30 mx-2"></div>
              <button onClick={closePopout} className="p-3 bg-red-500/80 hover:bg-red-500 rounded-full text-white shadow-lg transition-colors" title="Fechar (Esc)">
                 <X size={24} />
              </button>
            </div>

            {/* Setas de navegação do Popout */}
            {images.length > 1 && (
              <>
                 <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors z-50">
                   <ChevronLeft size={32} />
                 </button>
                 <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors z-50">
                   <ChevronRight size={32} />
                 </button>
              </>
            )}

            {/* Imagem Container interagível */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-auto cursor-zoom-in mt-12 mb-12"
              onClick={handleZoomIn}
            >
              <motion.img 
                src={images[currentIndex]} 
                alt="Zoom OHMIX"
                style={{ scale: zoomLevel }}
                animate={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-h-[85vh] max-w-[90vw] object-contain origin-center cursor-move"
                referrerPolicy="no-referrer"
                drag={zoomLevel > 1}
                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
              />
            </div>

            <div className="absolute bottom-6 text-white/50 text-sm font-medium tracking-wide">
              {currentIndex + 1} de {images.length} • Arraste ao dar Zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
