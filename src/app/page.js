"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ sending: false, message: "" });
  const [currentYear, setCurrentYear] = useState("");

  const cardRefs = useRef([]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const currentRefs = cardRefs.current;
    currentRefs.forEach((card, index) => {
      if(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => {
        window.removeEventListener("scroll", handleScroll);
        currentRefs.forEach(card => {
          if (card) observer.unobserve(card);
        });
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ sending: true, message: "" });
    
    // Formspree endpoint configured
    const formSpreeEndpoint = "https://formspree.io/f/mzdyzkng";
    
    const formData = new FormData(e.target);

    try {
        const response = await fetch(formSpreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            setFormStatus({ sending: false, message: "Thank you! Your message has been sent successfully." });
            e.target.reset();
        } else {
            setFormStatus({ sending: false, message: "Oops! There was a problem configuring the form. (Did you add your Formspree ID?)" });
        }
    } catch (error) {
        setFormStatus({ sending: false, message: "Network error. Please try again later." });
    }
    
    setTimeout(() => {
        setFormStatus(prev => ({ ...prev, message: "" }));
    }, 5000);
  };

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
        cardRefs.current.push(el);
    }
  };

  const products = [
    { name: "Gilbey's Gin (Big)", desc: "Premium gin, large size.", src: "/images/Gilbeys_big.jfif" },
    { name: "Gilbey's Gin (Small)", desc: "Premium gin, small size.", src: "/images/gilbeys_small.jfif" },
    { name: "Bond 7 Whisky (Big)", desc: "Classic blended whisky, large size.", src: "/images/bond7_big.jfif" },
    { name: "Bond 7 Whisky (Small)", desc: "Classic blended whisky, small size.", src: "/images/bond7_small.jfif" },
    { name: "Konyagi", desc: "The spirit of the nation.", src: "/images/konyagi.jfif" },
    { name: "Smirnoff Ice", desc: "Crisp and refreshing.", src: "/images/smirnoff_ice.jfif" },
    { name: "Smirnoff Ice Black", desc: "Bold, smooth, and refreshing.", src: "/images/smirnoff_ice_black.jfif" },
    { name: "Tusker Lager & Guinness", desc: "Iconic beer and stout selection.", src: "/images/tusker_guiness.jfif" },
    { name: "Tusker Lager", desc: "Premium quality lager.", src: "/images/tusker_lagger.png" },
    { name: "Tusker Malt", desc: "Rich flavor and satisfying.", src: "/images/tusker_malt.jfif" }
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
          <div className="nav-container">
              <a href="#" className="logo">
                  <span className="gold-text">B</span>Special
              </a>
              <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                  <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                  <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                  <li><a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a></li>
                  <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              </ul>
              <div className="hamburger" onClick={toggleMenu}>
                  <span style={isMenuOpen ? {transform: 'translateY(8px) rotate(45deg)'}: {}}></span>
                  <span style={isMenuOpen ? {opacity: '0'} : {}}></span>
                  <span style={isMenuOpen ? {transform: 'translateY(-8px) rotate(-45deg)'} : {}}></span>
              </div>
          </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
              <h1 className="fade-in-up">Premium Spirits & Beverages</h1>
              <p className="fade-in-up delay-1">Your Trusted Wholesale Liquor Distributor.</p>
              <a href="#products" className="btn-primary fade-in-up delay-2">View Our Collection</a>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section-padding">
          <div className="container section-header">
              <h2 className="section-title">Who We Are</h2>
              <p>BSpecial Business Ltd is your premier wholesale distributor for the finest liquors, spirits, and beverages. We pride ourselves on maintaining a rich inventory of world-renowned brands to fulfill your business needs efficiently and reliably.</p>
          </div>
      </section>

      {/* Products Gallery Section */}
      <section id="products" className="products section-padding bg-darker">
          <div className="container">
              <h2 className="section-title text-center">Our Catalog</h2>
              <div className="product-grid">
                  {products.map((product, idx) => (
                      <div className="product-card" key={idx} ref={addToRefs}>
                          <div className="product-img-wrapper">
                              <Image 
                                src={product.src} 
                                alt={product.name} 
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'contain', padding: '20px' }}
                              />
                          </div>
                          <div className="product-info">
                              <h3>{product.name}</h3>
                              <p>{product.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section-padding">
          <div className="container">
              <h2 className="section-title text-center">Wholesale Inquiries</h2>
              <div className="contact-wrapper">
                  <div className="contact-info">
                      <h3>Get in Touch</h3>
                      <p>Interested in stocking our products? We are based at Nyarugenge Market in Kigali and deliver to businesses nationwide.</p>
                      <ul className="contact-details">
                          <li><strong>Location:</strong> Nyarugenge Market, Kigali</li>
                          <li><strong>Email:</strong> bspecial581@gmail.com</li>
                          <li><strong>Phone:</strong> +250 725 082 861</li>
                      </ul>
                  </div>
                  <form className="contact-form" onSubmit={handleFormSubmit}>
                      <div className="form-group">
                          <input type="text" id="name" name="name" placeholder="Your Name or Business Name" required />
                      </div>
                      <div className="form-group">
                          <input type="email" id="email" name="email" placeholder="Email Address" required />
                      </div>
                      <div className="form-group">
                          <textarea id="message" name="message" rows={5} placeholder="Which products are you interested in?" required></textarea>
                      </div>
                      <button type="submit" className="btn-primary" disabled={formStatus.sending}>
                          {formStatus.sending ? "Sending..." : "Send Inquiry"}
                      </button>
                      <div className="form-message">
                         {formStatus.message && <p style={{ color: "var(--accent-gold)", marginTop: "15px" }}>{formStatus.message}</p>}
                      </div>
                  </form>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer>
          <div className="container text-center">
              <p>&copy; <span>{currentYear}</span> BSpecial Business Ltd. All Rights Reserved.</p>
          </div>
      </footer>
    </>
  );
}
