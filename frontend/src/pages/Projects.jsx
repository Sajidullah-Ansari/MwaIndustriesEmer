import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, X } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { projects, projectCategories } from '../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="projects-page">
      {/* Hero Section */}
      <section className="py-16 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Our Portfolio
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              Featured <span className="text-safety-yellow">Projects</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              Explore our completed projects across various industries. Each project represents our commitment to quality and precision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-industrial-gray border-y border-white/5 sticky top-20 lg:top-[105px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`font-oswald text-sm uppercase tracking-wide whitespace-nowrap px-5 py-2 transition-all ${
                  activeFilter === category.id
                    ? 'bg-safety-yellow text-black'
                    : 'text-slate-400 border border-white/10 hover:border-safety-yellow/30 hover:text-white'
                }`}
                data-testid={`filter-${category.id}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div 
                    className="group bg-industrial-gray border border-white/5 overflow-hidden hover:border-safety-yellow/30 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    data-testid={`project-card-${project.id}`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-gray via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-safety-yellow text-black font-mono text-xs uppercase px-3 py-1">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/50 text-white font-mono text-xs px-3 py-1">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-oswald font-medium text-lg text-white uppercase mb-2 group-hover:text-safety-yellow transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                        <MapPin size={14} />
                        {project.location}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight) => (
                          <span key={highlight} className="text-xs text-slate-400 bg-white/5 px-2 py-1">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-industrial-gray border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 flex items-center justify-center text-white hover:bg-safety-yellow hover:text-black transition-colors"
                data-testid="close-project-modal"
              >
                <X size={20} />
              </button>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-gray via-transparent to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-safety-yellow text-black font-mono text-xs uppercase px-3 py-1">
                    {selectedProject.category}
                  </span>
                  <span className="text-slate-500 text-sm">{selectedProject.year}</span>
                </div>
                <h2 className="font-oswald font-bold text-3xl text-white uppercase mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 mb-6">
                  <MapPin size={16} />
                  {selectedProject.location}
                  {selectedProject.client && (
                    <>
                      <span className="mx-2">•</span>
                      {selectedProject.client}
                    </>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="mb-8">
                  <span className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-3">
                    Project Highlights:
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.highlights.map((highlight) => (
                      <span key={highlight} className="text-sm text-white bg-white/10 px-4 py-2">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/request-quote"
                  className="inline-flex items-center gap-2 bg-safety-yellow text-black font-oswald font-bold uppercase px-6 py-3 hover:bg-white transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  Start Similar Project
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-white mb-6">
              Ready to Start Your <span className="text-safety-yellow">Project?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Join our growing list of satisfied clients. Let's discuss your fabrication requirements.
            </p>
            <Link
              to="/request-quote"
              className="inline-flex items-center gap-3 bg-safety-yellow text-black font-oswald font-bold uppercase px-8 py-4 hover:bg-white transition-colors"
              data-testid="projects-request-quote-btn"
            >
              Request a Quote
              <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Projects;
