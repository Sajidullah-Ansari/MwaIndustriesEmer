import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import StickyContactBar from "./components/layout/StickyContactBar";
import ScrollProgress from "./components/ui/ScrollProgress";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Projects from "./pages/Projects";
import Quality from "./pages/Quality";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App min-h-screen bg-industrial-black">
      <BrowserRouter>
        <ScrollProgress />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <StickyContactBar />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#121212',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F8FAFC',
            },
          }}
        />
      </BrowserRouter>
      <div className="noise-overlay" />
    </div>
  );
}

export default App;
