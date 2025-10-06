"use client";
import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Filter, 
  X, 
  Music, 
  Film, 
  Theater, 
  Glass, 
  Music2, 
  TreePine, 
  Laptop 
} from "lucide-react";

// Tipos para TypeScript
interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  fecha: string;
  hora: string;
  destacado: boolean;
}

export default function EventosOcio() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("todos");
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<string>("todas");
  const [filtrosActivos, setFiltrosActivos] = useState(false);
  const [eventoDestacado, setEventoDestacado] = useState<Evento | null>(null);

  // Cargar datos de eventos (en un caso real, vendría de una API)
  useEffect(() => {
    // Datos de ejemplo
    const eventosEjemplo: Evento[] = [
      {
        id: 1,
        titulo: "Festival de Jazz en Parque Centenario",
        descripcion: "Disfruta de los mejores artistas de jazz nacionales e internacionales en un escenario al aire libre.",
        categoria: "Música",
        ubicacion: "CABA",
        fecha: "2023-12-15",
        hora: "18:00",
        destacado: true
      },
      {
        id: 2,
        titulo: "Estreno: Nueva Película Argentina",
        descripcion: "No te pierdas el estreno exclusivo de la última producción del cine nacional con entrada gratuita.",
        categoria: "Cine",
        ubicacion: "CABA",
        fecha: "2023-12-10",
        hora: "20:30",
        destacado: true
      },
      {
        id: 3,
        titulo: "Obra de Teatro Experimental",
        descripcion: "Una experiencia teatral única que desafía los límites convencionales del arte escénico.",
        categoria: "Teatro",
        ubicacion: "Zona Sur",
        fecha: "2023-12-12",
        hora: "21:00",
        destacado: false
      },
      {
        id: 4,
        titulo: "Noche de Cocktails en Bar Temático",
        descripcion: "Degustación de cocktails exclusivos con música en vivo y ambiente sofisticado.",
        categoria: "Bares",
        ubicacion: "CABA",
        fecha: "2023-12-08",
        hora: "22:00",
        destacado: false
      },
      {
        id: 5,
        titulo: "Festival de Rock Alternativo",
        descripcion: "Las bandas más innovadoras del rock alternativo se presentan en un evento único.",
        categoria: "Conciertos/Festivales",
        ubicacion: "Zona Sur",
        fecha: "2023-12-16",
        hora: "17:00",
        destacado: true
      },
      {
        id: 6,
        titulo: "Feria de Arte al Aire Libre",
        descripcion: "Exposición y venta de obras de artistas emergentes en un entorno natural.",
        categoria: "Aire Libre/Exposiciones",
        ubicacion: "CABA",
        fecha: "2023-12-09",
        hora: "11:00",
        destacado: false
      },
      {
        id: 7,
        titulo: "Conferencia de Tecnología e Innovación",
        descripcion: "Encuentro con los líderes de la industria tecnológica para discutir las últimas tendencias.",
        categoria: "Negocio/Tecnologías/Innovación",
        ubicacion: "Zona Sur",
        fecha: "2023-12-14",
        hora: "09:00",
        destacado: false
      },
      {
        id: 8,
        titulo: "Clase Magistral de Piano",
        descripcion: "Aprende técnicas avanzadas de piano con músicos reconocidos internacionalmente.",
        categoria: "Música",
        ubicacion: "CABA",
        fecha: "2023-12-11",
        hora: "16:00",
        destacado: false
      }
    ];

    setEventos(eventosEjemplo);
    
    // Encontrar el evento destacado principal
    const destacado = eventosEjemplo.find(evento => evento.destacado) || eventosEjemplo[0];
    setEventoDestacado(destacado);
  }, []);

  // Filtrar eventos según categoría y ubicación
  const eventosFiltrados = eventos.filter(evento => {
    const coincideCategoria = categoriaSeleccionada === "todos" || evento.categoria === categoriaSeleccionada;
    const coincideUbicacion = ubicacionSeleccionada === "todas" || evento.ubicacion === ubicacionSeleccionada;
    return coincideCategoria && coincideUbicacion;
  });

  const categorias = [
    { id: "todos", nombre: "Todos", icono: null },
    { id: "Música", nombre: "Música", icono: <Music className="w-4 h-4" /> },
    { id: "Cine", nombre: "Cine", icono: <Film className="w-4 h-4" /> },
    { id: "Teatro", nombre: "Teatro", icono: <Theater className="w-4 h-4" /> },
    { id: "Bares", nombre: "Bares", icono: <Glass className="w-4 h-4" /> },
    { id: "Conciertos/Festivales", nombre: "Conciertos/Festivales", icono: <Music2 className="w-4 h-4" /> },
    { id: "Aire Libre/Exposiciones", nombre: "Aire Libre/Exposiciones", icono: <TreePine className="w-4 h-4" /> },
    { id: "Negocio/Tecnologías/Innovación", nombre: "Negocio/Tecnologías/Innovación", icono: <Laptop className="w-4 h-4" /> }
  ];

  const ubicaciones = [
    { id: "todas", nombre: "Todas" },
    { id: "CABA", nombre: "CABA" },
    { id: "Zona Sur", nombre: "Zona Sur" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">Eventos de Ocio</h1>
            <button 
              onClick={() => setFiltrosActivos(!filtrosActivos)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>
      </header>

      {/* Filtros */}
      {filtrosActivos && (
        <div className="bg-white shadow-md p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtrar eventos</h2>
              <button 
                onClick={() => setFiltrosActivos(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filtro por categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <div className="flex flex-wrap gap-2">
                  {categorias.map(categoria => (
                    <button
                      key={categoria.id}
                      onClick={() => setCategoriaSeleccionada(categoria.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${categoriaSeleccionada === categoria.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {categoria.icono}
                      {categoria.nombre}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filtro por ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                <div className="flex flex-wrap gap-2">
                  {ubicaciones.map(ubicacion => (
                    <button
                      key={ubicacion.id}
                      onClick={() => setUbicacionSeleccionada(ubicacion.id)}
                      className={`px-3 py-2 rounded-full text-sm ${ubicacionSeleccionada === ubicacion.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {ubicacion.nombre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Evento destacado */}
        {eventoDestacado && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Evento Destacado</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64 md:h-96">
                <img 
                  src="https://placehold.co/1200x600" 
                  alt="Imagen del evento destacado mostrando una multitud disfrutando de música en vivo en un parque" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{eventoDestacado.titulo}</h3>
                    <p className="mb-4 max-w-2xl">{eventoDestacado.descripcion}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-5 h-5" />
                        <span>{eventoDestacado.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(eventoDestacado.fecha).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-5 h-5" />
                        <span>{eventoDestacado.hora}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Video destacado */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Destacado</h2>
          <div className="bg-black rounded-xl overflow-hidden shadow-md">
            <div className="relative aspect-video">
              <img 
                src="https://placehold.co/800x450" 
                alt="Vista previa del video destacado del festival mostrando artistas en el escenario principal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-blue-600 bg-opacity-80 hover:bg-blue-700 text-white rounded-full p-4 transition">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Resumen del Festival Anual</h3>
              <p className="text-gray-300">Mira los mejores momentos del evento más esperado del año con artistas internacionales y shows increíbles.</p>
            </div>
          </div>
        </section>

        {/* Lista de eventos */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {categoriaSeleccionada === "todos" ? "Todos los Eventos" : `Eventos de ${categoriaSeleccionada}`}
              {ubicacionSeleccionada !== "todas" && ` en ${ubicacionSeleccionada}`}
            </h2>
            <span className="text-gray-600">
              {eventosFiltrados.length} evento{eventosFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>

          {eventosFiltrados.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No hay eventos que coincidan con tus filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosFiltrados.map(evento => (
                <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 relative">
                    <img 
                      src="https://placehold.co/400x250" 
                      alt={`Imagen del evento ${evento.titulo} mostrando a participantes disfrutando de la actividad`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {evento.categoria}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{evento.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{evento.descripcion}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(evento.fecha).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{evento.hora}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Eventos de Ocio</h3>
              <p className="text-gray-300">Descubre los mejores eventos de entretenimiento en CABA y Zona Sur.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <ul className="space-y-2">
                {categorias.filter(cat => cat.id !== "todos").map(categoria => (
                  <li key={categoria.id}>
                    <button 
                      onClick={() => {
                        setCategoriaSeleccionada(categoria.id);
                        setFiltrosActivos(false);
                      }}
                      className="text-gray-300 hover:text-white transition"
                    >
                      {categoria.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ubicaciones</h3>
              <ul className="space-y-2">
                {ubicaciones.filter(ubic => ubic.id !== "todas").map(ubicacion => (
                  <li key={ubicacion.id}>
                    <button 
                      onClick={() => {
                        setUbicacionSeleccionada(ubicacion.id);
                        setFiltrosActivos(false);
                      }}
                      className="text-gray-300 hover:text-white transition"
                    >
                      {ubicacion.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Eventos de Ocio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
