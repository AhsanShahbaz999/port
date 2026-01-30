import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/assets/logo.ico";
import { useTheme } from "@/hooks/use-theme"; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [prevActiveSection, setPrevActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { label: "Home", href: "#hero", section: "home" },
    { label: "Services", href: "#services", section: "services" },
    { label: "Portfolio", href: "#portfolio", section: "portfolio" },
    { label: "About", href: "#experience", section: "experience" },
    { label: "Testimonials", href: "#skills", section: "skills" },
    { label: "Contact", href: "#contact", section: "contact" }
  ];

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", section: "home" },
        { id: "services", section: "services" },
        { id: "portfolio", section: "portfolio" },
        { id: "experience", section: "experience" },
        { id: "skills", section: "skills" },
        { id: "contact", section: "contact" }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i].section) {
            setPrevActiveSection(activeSection);
            setActiveSection(sections[i].section);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-portfolio-bg/90 dark:bg-portfolio-bg/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
              <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="flex items-center space-x-2 flex-shrink-0"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>

          {/* Navigation */}
          <nav className="hidden xl:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className={`relative transition-colors duration-300 ${
                  activeSection === item.section
                    ? "text-portfolio-accent"
                    : "text-portfolio-text-muted hover:text-portfolio-accent"
                }`}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-portfolio-accent to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: activeSection === item.section ? "100%" : 0
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1],
                    delay: activeSection === item.section ? 0 : 0
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="hidden xl:flex items-center gap-3 flex-shrink-0"
          >
            <Button 
              size="sm"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-2"
              onClick={() => {
                // Create a temporary link to download the CV
                const link = document.createElement('a');
                link.href = '/HexaCode-Portfolio.pdf';
                link.download = 'HexaCode-Portfolio.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
              <Download className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </Button>
            
            {/* Theme Toggle Button */}
            <label id="theme-toggle-button" className="cursor-pointer relative group">
              <input 
                type="checkbox" 
                id="toggle" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only"
              />
              <div className="p-1 rounded-lg bg-portfolio-card border border-border hover:border-portfolio-accent/50 transition-all duration-300 group-hover:shadow-glow">
                <svg viewBox="0 0 69.667 44" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="w-16 h-10">
                <defs>
                  <filter id="container">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="container" />
                    <feComposite in="SourceGraphic" in2="container" operator="atop" />
                  </filter>
                  <filter id="sun-outer">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7" result="sun-outer" />
                    <feComposite in="SourceGraphic" in2="sun-outer" operator="atop" />
                  </filter>
                  <filter id="sun">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" result="sun" />
                    <feComposite in="SourceGraphic" in2="sun" operator="atop" />
                  </filter>
                  <filter id="moon">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7" result="moon" />
                    <feComposite in="SourceGraphic" in2="moon" operator="atop" />
                  </filter>
                  <filter id="cloud">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 10 -4" result="cloud" />
                    <feComposite in="SourceGraphic" in2="cloud" operator="atop" />
                  </filter>
                </defs>
                <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1">
                  <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                    <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667" data-name="container" id="container"></rect>
                  </g>
                  <g transform="translate(2.333 2.333)" id="button">
                    <g data-name="sun" id="sun">
                      <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                        <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2"></circle>
                      </g>
                      <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                        <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3"></path>
                      </g>
                      <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" id="sun-inner"></circle>
                    </g>
                    <g data-name="moon" id="moon">
                      <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                        <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3"></circle>
                      </g>
                      <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
                        <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>
                        <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" data-name="patch"></circle>
                        <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" data-name="patch"></circle>
                        <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" data-name="patch"></circle>
                        <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" data-name="patch"></circle>
                        <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch"></circle>
                      </g>
                    </g>
                  </g>
                  <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                    <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud"></path>
                  </g>
                  <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars">
                    <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>
                    <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star"></path>
                    <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star"></path>
                    <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star"></path>
                    <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star"></path>
                    <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star"></path>
                    <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star"></path>
                    <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star"></path>
                  </g>
                </g>
              </svg>
              </div>
            </label>
          </motion.div>

          {/* Mobile/Tablet Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={toggleMenu}
            className="xl:hidden p-2 text-portfolio-text hover:text-portfolio-accent transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-full z-40"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: `
                  radial-gradient(circle at 40% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
                  rgba(15, 15, 24, 0.85)
                `,
                backdropFilter: 'blur(12px)',
                zIndex: 40
              }}
              onClick={closeMenu}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-80 sm:w-96 md:w-[420px] lg:w-[480px] max-w-[85vw] bg-portfolio-bg/85 backdrop-blur-md border-l border-portfolio-accent/20 p-6 sm:p-8 shadow-xl"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(15, 15, 24, 0.88) 0%,
                    rgba(25, 20, 35, 0.85) 50%,
                    rgba(15, 15, 24, 0.88) 100%
                  )`,
                  boxShadow: `
                    0 20px 40px -10px rgba(139, 92, 246, 0.2),
                    0 0 0 1px rgba(139, 92, 246, 0.08)
                  `
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full pt-16 sm:pt-20 md:pt-24">
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-3 flex-1">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 0.1 }}
                        onClick={closeMenu}
                        className={`relative text-lg sm:text-xl md:text-2xl font-medium py-2 sm:py-2 transition-colors duration-300 inline-block ${
                          activeSection === item.section
                            ? "text-portfolio-accent"
                            : "text-portfolio-text hover:text-portfolio-accent"
                        }`}
                      >
                        <span className="relative inline-block">
                          {item.label}
                          {activeSection === item.section && (
                            <>
                              {/* Glowing underline effect */}
                              <motion.div
                                key={`mobile-underline-glow-${item.section}`}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ 
                                  duration: 0.5, 
                                  ease: [0.16, 1, 0.3, 1]
                                }}
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-portfolio-accent via-cyan-400 to-green-400 origin-center rounded-full"
                                style={{
                                  filter: 'blur(0.5px)',
                                  boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
                                }}
                              />
                              {/* Solid underline */}
                              <motion.div
                                key={`mobile-underline-solid-${item.section}`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ 
                                  duration: 0.4, 
                                  ease: [0.16, 1, 0.3, 1],
                                  delay: 0.1
                                }}
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-portfolio-accent to-cyan-400 origin-center rounded-full"
                              />
                            </>
                          )}
                        </span>
                      </motion.a>
                    ))}
                    
                    {/* Mobile CV Download and Theme Toggle */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * navItems.length + 0.1 }}
                      className="pt-6 sm:pt-8 space-y-4"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base sm:text-lg py-3 sm:py-4"
                        onClick={() => {
                          // Create a temporary link to download the CV
                          const link = document.createElement('a');
                          link.href = '/HexaCode-Portfolio.pdf';
                          link.download = 'HexaCode-Portfolio.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          closeMenu();
                        }}
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Download CV
                      </Button>
                      
                      {/* Mobile Theme Toggle */}
                      <div className="flex justify-center">
                        <label id="theme-toggle-button" className="cursor-pointer relative group">
                          <input 
                            type="checkbox" 
                            id="toggle-mobile" 
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                            className="sr-only"
                          />
                          <div className="p-1 rounded-lg bg-portfolio-card border border-border hover:border-portfolio-accent/50 transition-all duration-300 group-hover:shadow-glow">
                          <svg viewBox="0 0 69.667 44" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="w-16 h-10">
                            <defs>
                              <filter id="container-mobile">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="container" />
                                <feComposite in="SourceGraphic" in2="container" operator="atop" />
                              </filter>
                              <filter id="sun-outer-mobile">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7" result="sun-outer" />
                                <feComposite in="SourceGraphic" in2="sun-outer" operator="atop" />
                              </filter>
                              <filter id="sun-mobile">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" result="sun" />
                                <feComposite in="SourceGraphic" in2="sun" operator="atop" />
                              </filter>
                              <filter id="moon-mobile">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7" result="moon" />
                                <feComposite in="SourceGraphic" in2="moon" operator="atop" />
                              </filter>
                              <filter id="cloud-mobile">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 10 -4" result="cloud" />
                                <feComposite in="SourceGraphic" in2="cloud" operator="atop" />
                              </filter>
                            </defs>
                            <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1">
                              <g filter="url(#container-mobile)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                                <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667" data-name="container" id="container-m"></rect>
                              </g>
                              <g transform="translate(2.333 2.333)" id="button-m">
                                <g data-name="sun" id="sun-m">
                                  <g filter="url(#sun-outer-mobile)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                                    <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2-m"></circle>
                                  </g>
                                  <g filter="url(#sun-mobile)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                                    <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3-m"></path>
                                  </g>
                                  <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" id="sun-inner-m"></circle>
                                </g>
                                <g data-name="moon" id="moon-m">
                                  <g filter="url(#moon-mobile)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                                    <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3-m"></circle>
                                  </g>
                                  <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches-m">
                                    <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>
                                    <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" data-name="patch"></circle>
                                    <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                    <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                    <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" data-name="patch"></circle>
                                    <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch"></circle>
                                  </g>
                                </g>
                              </g>
                              <g filter="url(#cloud-mobile)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
                                <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud-m"></path>
                              </g>
                              <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars-m">
                                <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>
                                <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star"></path>
                                <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star"></path>
                                <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star"></path>
                                <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star"></path>
                                <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star"></path>
                                <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star"></path>
                                <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star"></path>
                              </g>
                            </g>
                          </svg>
                          </div>
                        </label>
                      </div>
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;