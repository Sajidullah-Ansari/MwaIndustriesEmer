import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { blogPosts } from '../data/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 lg:pt-44 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-oswald text-4xl text-[rgb(var(--text-primary))] mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-[rgb(var(--safety-yellow))] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex(p => p.id === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="blog-post-page">
      {/* Hero Section */}
      <section className="py-8 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--safety-yellow))] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span className="font-mono text-sm uppercase tracking-wide">Back to Blog</span>
            </button>
            
            <span className="bg-[rgb(var(--safety-yellow))] text-black font-mono text-xs uppercase px-3 py-1">
              {post.category}
            </span>
            
            <h1 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-[rgb(var(--text-primary))] mt-4 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[rgb(var(--text-secondary))] text-sm">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-[rgb(var(--safety-yellow))] transition-colors"
                data-testid="share-btn"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="aspect-video bg-[rgb(var(--industrial-gray))] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="font-oswald text-xl text-[rgb(var(--text-primary))] uppercase mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('**')) {
                  const parts = paragraph.split('**');
                  return (
                    <p key={index} className="text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
                      {parts.map((part, i) => (
                        i % 2 === 1 
                          ? <strong key={i} className="text-[rgb(var(--text-primary))] font-semibold">{part}</strong>
                          : <span key={i}>{part}</span>
                      ))}
                    </p>
                  );
                }
                if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                  return (
                    <ul key={index} className="space-y-2 mb-6 ml-4">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i} className="text-[rgb(var(--text-secondary))] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[rgb(var(--safety-yellow))] mt-2.5 shrink-0" />
                          {item.replace(/^[-•]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-8 text-center">
            <h3 className="font-oswald font-medium text-2xl text-[rgb(var(--text-primary))] uppercase mb-4">
              Need Fabrication Services?
            </h3>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              Get in touch with MWA Industries for all your metal fabrication needs.
            </p>
            <Link
              to="/request-quote"
              className="inline-flex items-center gap-2 bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-6 py-3 hover:brightness-110 transition-all"
            >
              Request a Quote
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-[rgb(var(--industrial-black))] border-t border-[rgb(var(--border))]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.id}`}
                className="flex-1 group bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--safety-yellow))]/30 transition-colors"
              >
                <span className="flex items-center gap-2 text-[rgb(var(--text-secondary))] text-sm mb-2">
                  <ArrowLeft size={14} />
                  Previous Post
                </span>
                <h4 className="font-oswald text-[rgb(var(--text-primary))] uppercase group-hover:text-[rgb(var(--safety-yellow))] transition-colors line-clamp-2">
                  {prevPost.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}
            
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.id}`}
                className="flex-1 group bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--safety-yellow))]/30 transition-colors text-right"
              >
                <span className="flex items-center justify-end gap-2 text-[rgb(var(--text-secondary))] text-sm mb-2">
                  Next Post
                  <ArrowRight size={14} />
                </span>
                <h4 className="font-oswald text-[rgb(var(--text-primary))] uppercase group-hover:text-[rgb(var(--safety-yellow))] transition-colors line-clamp-2">
                  {nextPost.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
