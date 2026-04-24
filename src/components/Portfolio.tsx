import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, FolderOpen, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

// Categorias mapeadas aos serviços (os nomes dos paths no supabase precisam ser iguais ao `id` ou em lowercase)
const categories = [
  { id: "todas", name: "Todas as Fotos" },
  { id: "carrossel", name: "Destaques / Carrossel" },
  { id: "manutencao", name: "Manutenção Elétrica" },
  { id: "instalacao", name: "Instalação Elétrica" },
  { id: "quadros", name: "Quadros de Distribuição" },
  { id: "solar", name: "Energia Solar" },
  { id: "automacao", name: "Automação Residencial" },
  { id: "cftv", name: "CFTV & Câmeras" },
  { id: "padrao-entrada", name: "Padrão de Entrada" },
  { id: "projetos", name: "Projetos Elétricos" }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("todas");
  const [images, setImages] = useState<{ id: string; url: string; folder: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Busca todas as imagens iterando sobre as principais pastas
  useEffect(() => {
    // Rolar para o topo suavemente ao carregar a página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    async function fetchAllImages() {
      setLoading(true);
      try {
        const foldersToFetch = categories.filter(c => c.id !== "todas").map(c => c.id);
        // Incluir a raiz ('') nas buscas para retro-compatibilidade do que o cliente já upou
        foldersToFetch.push(""); 

        const allImages: { id: string; url: string; folder: string }[] = [];

        await Promise.all(
          foldersToFetch.map(async (folder) => {
            const { data, error } = await supabase.storage.from("portfolio-ohmix").list(folder, {
              limit: 50,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });

            if (error) {
              console.error(`Erro ao buscar imagens da pasta ${folder}:`, error);
              return;
            }

            if (data && Array.isArray(data)) {
              data.forEach((file) => {
                if (file.name && file.name !== ".emptyFolderPlaceholder" && file.id) {
                  // O caminho exato no bucket
                  const filePath = folder === "" ? file.name : `${folder}/${file.name}`;
                  const { data: publicUrlData } = supabase.storage.from("portfolio-ohmix").getPublicUrl(filePath);
                  
                  allImages.push({
                    id: filePath,
                    url: publicUrlData.publicUrl,
                    folder: folder === "" ? "raiz" : folder
                  });
                }
              });
            }
          })
        );

        setImages(allImages);
      } catch (error) {
        console.error("Erro geral na busca:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllImages();
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  
  const closeLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const filteredImages = activeTab === "todas" 
    ? images 
    : images.filter(img => img.folder === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Cabecalho e Voltar */}
        <div className="mb-12 text-center relative">
          <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center text-gray-500 hover:text-azul-escuro transition-colors font-medium">
            <ArrowLeft className="mr-2" size={20} />
            Voltar ao Início
          </Link>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-dourado font-bold tracking-widest uppercase text-sm mb-2 block"
          >
            Nosso Trabalho
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-azul-escuro uppercase"
          >
            Portfólio de Obras
          </motion.h1>
          <div className="w-24 h-1.5 bg-dourado mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Menu Lateral de Filtros (Pastas) */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
              <h3 className="font-bold text-azul-escuro uppercase tracking-wider text-sm mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <FolderOpen size={18} className="text-dourado" />
                Categorias / Pastas
              </h3>
              <ul className="space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <li key={cat.id} className="min-w-fit">
                    <button
                      onClick={() => setActiveTab(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeTab === cat.id 
                          ? "bg-azul-escuro text-white shadow-md shadow-azul-escuro/20" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-azul-escuro"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Galeria Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-dourado rounded-full animate-spin"></div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Sem imagens no momento</h3>
                <p className="text-gray-500">Em breve adicionaremos fotos dos nossos serviços para esta categoria.</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filteredImages.map((img) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={img.id}
                      onClick={() => setSelectedImage(img.url)}
                      className="group relative aspect-[163/100] rounded-xl overflow-hidden cursor-pointer shadow-sm border border-gray-100 bg-white items-center justify-center flex hover:shadow-xl hover:border-dourado/50 transition-all duration-300"
                    >
                      <img 
                        src={img.url} 
                        alt="Portfolio" 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-azul-escuro/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Maximize2 className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300" size={32} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Popout Fullscreen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            {/* Controles */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
              <button onClick={handleZoomIn} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors" title="Aumentar Zoom">
                 <ZoomIn size={24} />
              </button>
              <button onClick={handleZoomOut} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors" title="Diminuir Zoom">
                 <ZoomOut size={24} />
              </button>
              <div className="w-px h-8 bg-white/30 mx-2"></div>
              <button onClick={closeLightbox} className="p-3 bg-red-500/80 hover:bg-red-500 rounded-full text-white shadow-lg transition-colors" title="Fechar (Esc)">
                 <X size={24} />
              </button>
            </div>

            {/* Imagem Container interagível */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-auto cursor-zoom-in"
              onClick={handleZoomIn}
            >
              <motion.img 
                src={selectedImage} 
                alt="Popup"
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
              Clique na imagem para dar zoom • Arraste quando o zoom estiver ligado
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
