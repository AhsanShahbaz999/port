import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import TradingAppImage from "@/assets/Daraz-Image.png";
import dashboardImage from "@/assets/neighborhood-community.webp";
import dreamlensImage from "@/assets/dreamlens.png";
import trailtribeImage from "@/assets/trailtribe.png";

const Portfolio = () => {
  const projects = [
    {
  id: 1,
  title: "Decentralized Exchange (DEX) Platform",
  category: "DeFi Application",
  description: "A fully decentralized exchange platform built on Ethereum with automated market maker (AMM) functionality, liquidity pools, yield farming, and seamless token swapping. Features include staking rewards, governance tokens, and comprehensive analytics dashboard.",
  image: TradingAppImage,
  tags: ["Solidity", "React", "Web3.js", "Ethereum", "DeFi", "Smart Contracts"],
  links: {
    github: "https://github.com/HexaCode/dex-platform", // optional
    live: "https://hexacode-dex.vercel.app" // optional
  }
},

   {
  id: 3,
  title: "NFT Marketplace & Minting Platform",
  category: "Web3 Application",
  description: "A complete NFT marketplace ecosystem with minting capabilities, auctions, royalties management, and cross-chain support. Built with smart contracts for secure ownership tracking, creator earnings, and seamless wallet integrations for Ethereum and Polygon networks.",
  image: dashboardImage,
  tags: ["Solidity", "Next.js", "Ethers.js", "IPFS", "NFT", "ERC-721"],
  links: {
    github: "https://github.com/HexaCode/nft-marketplace", // optional
    live: "https://hexacode-nft.vercel.app" // optional
  }
}

    // {
    //   id: 3,
    //   title: "Dream Interpretation Website",
    //   category: "Web Application",
    //   description: "AI-powered dream interpretation platform combining mystical wisdom with modern technology.",
    //   image: dreamlensImage,
    //   tags: ["UX Strategy", "User Journey", "Prototyping", "Interface Design"],
    //   links: {
    //   }
    // },
    // {
    //   id: 4,
    //   title: "TrailTribe Adventure Platform",
    //   category: "Web Application",
    //   description: "Community-driven hiking and outdoor adventure platform connecting nature enthusiasts worldwide.",
    //   image: trailtribeImage,
    //   tags: ["User Experience", "Interaction Design", "Design Systems", "Responsive Design"],
    //   links: {
    //   }
    // }
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-portfolio-bg">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-portfolio-text mb-4">
            Our Recent Works
          </h2>
          <p className="text-sm sm:text-base text-portfolio-text-muted max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
            Here are some of our recent blockchain projects showcasing expertise in DeFi, Web3, and smart contract development
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <Card className="bg-portfolio-card border-border hover:border-portfolio-accent/50 transition-all duration-300 overflow-hidden hover:shadow-glow rounded-xl">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl will-change-transform"
                    loading="lazy"
                  />
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <Badge variant="secondary" className="text-xs sm:text-sm mb-2">
                      {project.category}
                    </Badge>
                    <h3 className="text-lg sm:text-xl font-semibold text-portfolio-text mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-portfolio-text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex}
                        variant="outline" 
                        className="text-xs px-2 py-1 text-portfolio-text-muted border-border hover:border-portfolio-accent/50 transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;