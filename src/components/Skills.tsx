import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Sikanderimage from "@/assets/Sikander.jpeg";

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: -999999, right: 999999 }); // Unlimited constraints
  const [containerWidth, setContainerWidth] = useState(0);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const motionRef = useRef(null);
  const singleSetWidth = useRef(0);

  // Detect if device is mobile or tablet
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobileOrTablet(width < 1280); // xl breakpoint
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Calculate drag constraints based on screen size
  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        singleSetWidth.current = testimonials.length * 320 + (testimonials.length - 1) * 24;
        setContainerWidth(containerWidth);
        // No constraints - infinite scroll
        setDragConstraints({ left: -999999, right: 999999 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const skills = [
  {
    name: "Solidity",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg",
    level: 95
  },
  {
    name: "Rust",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg",
    level: 90
  },
  {
    name: "Solana",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    level: 88
  },
  {
    name: "Web3.js",
    icon: "https://raw.githubusercontent.com/ethereum/web3.js/1.x/assets/logo/web3js.jpg",
    level: 92
  },
  {
    name: "Ethers.js",
    icon: "https://seeklogo.com/images/E/ethers-logo-D5B86204D8-seeklogo.com.png",
    level: 90
  },
  {
    name: "Zero-Knowledge",
    icon: "https://avatars.githubusercontent.com/u/43478726?s=200&v=4",
    level: 85
  }
];


const testimonials = [
  {
    id: 1,
    name: "Umar Draz",
    role: "CTO | DeFi Protocol Labs",
    avatar: "https://media.licdn.com/dms/image/v2/C4D03AQGqVXcdLI7pFg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1638276600144?e=1762992000&v=beta&t=h4G-Zh6KG6i5fmkl6YnCN65VwcavD9myAajMh0ehnAM",
    rating: 5,
    text: "HexaCode quickly adapted to our blockchain project requirements and consistently delivered secure, efficient smart contracts. Their expertise in Solidity and DeFi protocols made them an invaluable part of our development team."
  },
  {
    id: 2,
    name: "Sikandar Hasnain",
    role: "Head of Security | Blockchain Ventures",
    avatar: Sikanderimage,
    rating: 5,
    text: "Working with HexaCode was a great experience. They showed strong understanding of blockchain architecture and collaborated seamlessly during smart contract audits and deployment. Their contributions significantly improved our protocol's security and performance."
  },
  {
    id: 3,
    name: "Sajid Mehmood",
    role: "Founder | NFT Marketplace Hub",
    avatar: "https://media.licdn.com/dms/image/v2/C5103AQGhkqa3uLgARQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1576780087999?e=2147483647&v=beta&t=nBdlqVsYlxIkIp8ItrW9ocp0lVEdns6H4Jz0pDGLIDw",
    rating: 5,
    text: "HexaCode demonstrated excellent technical capability and commitment throughout our NFT marketplace project. They were proactive in resolving blockchain integration challenges and showed exceptional expertise in Web3 development."
  },
  {
    id: 4,
    name: "Mujtaba Hassan",
    role: "Lead Architect | DeFi Solutions",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_ZvDSkt64DJA7z6ZyztqhxQo8s_lAC_93g&s",
    rating: 4,
    text: "HexaCode showed a clear understanding of DeFi protocols and actively participated in tokenomics design discussions. Their ability to link smart contract functionality with user requirements was impressive."
  },
  {
    id: 5,
    name: "Awais Ahmed",
    role: "Product Lead | Solana Ecosystem",
    avatar: "https://media.licdn.com/dms/image/v2/C5103AQFVwivlDEr86Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1534183688326?e=2147483647&v=beta&t=Ge5EPydKQFVhEnN1HIIWGjSNTryT3VJ5SiC5AYlHyIA",
    rating: 5,
    text: "It was a pleasure working alongside HexaCode. They were supportive, motivated, and always ready to help with complex blockchain challenges. Their collaboration and communication made our Solana development experience exceptional."
  }
];


  // Auto-scroll animation variants with infinite loop logic
const scrollVariants = {
  animate: {
    x: [currentPosition, currentPosition - (singleSetWidth.current || 3000)],
  },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    duration: 30,
    ease: "linear",
  },
  hover: {
    transition: {
      duration: 0.5,
    },
  },
};

  // Function to normalize position for infinite loop
  const normalizePosition = (position) => {
    if (singleSetWidth.current === 0) return position;
    
    // Reset position when it goes beyond one full set
    const normalizedPos = position % (-singleSetWidth.current);
    return normalizedPos > 0 ? normalizedPos - singleSetWidth.current : normalizedPos;
  };

  return (
    <section id="skills" className="py-20 px-6 bg-portfolio-bg">
      <div className="container mx-auto">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-portfolio-text mb-4">
              Our Expertise
            </h2>
            <p className="text-portfolio-text-muted max-w-2xl mx-auto">
              Mastery in cutting-edge blockchain technologies and Web3 frameworks 
              that power the decentralized future
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                <Card className="bg-portfolio-card border-border hover:border-portfolio-accent/50 transition-all duration-300 p-6 text-center hover:shadow-glow">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="h-12 mb-4 flex items-center justify-center"
                  >
                    <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                  </motion.div>
                  
                  <h3 className="text-portfolio-text font-medium mb-3">
                    {skill.name}
                  </h3>
                  
                  {/* Skill Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-portfolio-text-muted">Level</span>
                      <span className="text-portfolio-accent font-medium">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-portfolio-bg rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gradient-primary h-2 rounded-full"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-portfolio-text mb-4">
              Client Testimonials
            </h2>
            <p className="text-portfolio-text-muted max-w-2xl mx-auto">
              Trusted by leading blockchain projects and Web3 innovators worldwide.
            </p>
          </div>

          <div className="overflow-hidden touch-pan-x" ref={containerRef}>
            <motion.div 
              ref={motionRef}
              className="flex gap-6"
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              dragMomentum={false}
              animate={animationEnabled && !isHovered && !isDragging ? scrollVariants.animate : undefined}
              onMouseEnter={() => {
                setIsHovered(true);
                setAnimationEnabled(false);
                // Clear any existing timeout
                if (resumeTimeoutRef.current) {
                  clearTimeout(resumeTimeoutRef.current);
                  resumeTimeoutRef.current = null;
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                // Capture current position when mouse leaves
                if (motionRef.current) {
                  const transform = motionRef.current.style.transform;
                  const match = transform.match(/translateX\(([^)]+)\)/);
                  if (match) {
                    const xValue = parseFloat(match[1]);
                    const normalizedPos = normalizePosition(xValue);
                    setCurrentPosition(normalizedPos);
                  }
                }
                // Set delay for all devices (desktop gets same treatment)
                resumeTimeoutRef.current = setTimeout(() => {
                  setAnimationEnabled(true);
                }, 5000); // 5 second delay for desktop too
              }}
              onTouchStart={() => {
                setIsHovered(true);
                setAnimationEnabled(false);
                // Clear any existing timeout
                if (resumeTimeoutRef.current) {
                  clearTimeout(resumeTimeoutRef.current);
                  resumeTimeoutRef.current = null;
                }
              }}
              onTouchEnd={() => {
                setIsHovered(false);
                // Capture current position when touch ends
                if (motionRef.current) {
                  const transform = motionRef.current.style.transform;
                  const match = transform.match(/translateX\(([^)]+)\)/);
                  if (match) {
                    const xValue = parseFloat(match[1]);
                    const normalizedPos = normalizePosition(xValue);
                    setCurrentPosition(normalizedPos);
                  }
                }
                // Set delay for all devices
                resumeTimeoutRef.current = setTimeout(() => {
                  setAnimationEnabled(true);
                }, 5000); // 5 second delay for all devices
              }}
              onDragStart={() => {
                setIsDragging(true);
                setAnimationEnabled(false);
                // Clear any existing timeout
                if (resumeTimeoutRef.current) {
                  clearTimeout(resumeTimeoutRef.current);
                  resumeTimeoutRef.current = null;
                }
              }}
              onDragEnd={() => {
                setIsDragging(false);
                // Capture current position when drag ends
                if (motionRef.current) {
                  const transform = motionRef.current.style.transform;
                  const match = transform.match(/translateX\(([^)]+)\)/);
                  if (match) {
                    const xValue = parseFloat(match[1]);
                    const normalizedPos = normalizePosition(xValue);
                    setCurrentPosition(normalizedPos);
                  }
                }
                // Set delay for all devices
                resumeTimeoutRef.current = setTimeout(() => {
                  setAnimationEnabled(true);
                }, 5000); // 5 second delay for all devices
              }}
              onDoubleClick={() => {
                // Double click to re-enable auto-scroll animation
                setAnimationEnabled(true);
              }}
              style={{ 
                width: `${testimonials.length * 5 * 320 + (testimonials.length * 5 - 1) * 24}px`, // 5 copies for seamless infinite scroll
                cursor: isHovered || isDragging ? 'grab' : 'default'
              }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {/* Render 5 copies of testimonials for true infinite scroll */}
              {Array.from({ length: 5 }, (_, setIndex) => 
                testimonials.map((testimonial) => (
                  <Card 
                    key={`set-${setIndex}-${testimonial.id}`}
                    className="bg-portfolio-card border-border hover:border-portfolio-accent/50 transition-all duration-300 p-6 sm:p-8 hover:shadow-glow h-[350px] sm:h-[400px] flex flex-col w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0"
                  >
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-portfolio-text-muted leading-relaxed flex-grow text-sm sm:text-base">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 mt-auto border-t border-border">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="min-w-0">
                        <h4 className="text-portfolio-text font-semibold truncate text-sm sm:text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-portfolio-text-muted text-xs sm:text-sm truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ).flat()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
