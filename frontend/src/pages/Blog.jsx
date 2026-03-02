import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { blogPosts, blogCategories } from '../data/blog';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory);

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="blog-page">
      {/* Hero Section */}
      <section className="py-16 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              Blog & News
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Industry <span className="text-[rgb(var(--safety-yellow))]">Insights</span>
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-lg max-w-3xl leading-relaxed">
              Stay updated with the latest trends in metal fabrication, industry news, and technical insights from MWA Industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[rgb(var(--industrial-gray))] border-y border-[rgb(var(--border))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`font-oswald text-sm uppercase tracking-wide whitespace-nowrap px-5 py-2 transition-all ${
                  activeCategory === category.id
                    ? 'bg-[rgb(var(--safety-yellow))] text-black'
                    : 'text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))] hover:border-[rgb(var(--safety-yellow))]/30 hover:text-[rgb(var(--text-primary))]'
                }`}
                data-testid={`blog-filter-${category.id}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group block bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] overflow-hidden hover:border-[rgb(var(--safety-yellow))]/30 transition-all duration-500"
                    data-testid={`blog-card-${post.id}`}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--industrial-gray))] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[rgb(var(--safety-yellow))] text-black font-mono text-xs uppercase px-3 py-1">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[rgb(var(--text-secondary))] text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-oswald font-medium text-xl text-[rgb(var(--text-primary))] uppercase mb-3 group-hover:text-[rgb(var(--safety-yellow))] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))] text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="text-[rgb(var(--safety-yellow))] font-mono text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[rgb(var(--text-secondary))]">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-oswald font-bold text-3xl md:text-4xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Have Questions About <span className="text-[rgb(var(--safety-yellow))]">Fabrication?</span>
            </h2>
            <p className="text-[rgb(var(--text-secondary))] text-lg mb-10 max-w-2xl mx-auto">
              Our team is here to help. Get expert advice for your industrial fabrication needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-8 py-4 hover:brightness-110 transition-all"
              data-testid="blog-contact-btn"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Blog;
