export type TabId = "experiences" | "projects" | "art";

export interface SoftwareImage {
  id: string;
  fileName: string;
  alt: string;
  title: string;
}

export interface SoftwareProject {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  heroFileName: string;
  screenshots: SoftwareImage[];
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  logoFileName: string;
}

export interface ArtPiece {
  id: string;
  title: string;
  date: string;
  description: string;
  fileName: string;
}

export interface SiteData {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  profile: {
    eyebrow: string;
    name: string;
    about: string;
    currently: string;
  };
  theme: {
    lightLabel: string;
    darkLabel: string;
  };
  tabs: { id: TabId; label: string }[];
  art: {
    intro: string;
    searchPlaceholder: string;
    emptyStateText: string;
  };
  footer: {
    note: string;
    contactLabel: string;
    contactEmail: string;
    copyrightName: string;
  };
  experiences: Experience[];
  softwareProjects: SoftwareProject[];
  artPieces: ArtPiece[];
}

export const siteData: SiteData = {
  meta: {
    siteTitle: "Your Name — Portfolio",
    siteDescription:
      "Software engineer and artist based in San Francisco. Distributed systems, generative art.",
  },
  profile: {
    eyebrow: "Portfolio",
    name: "Your Name",
    about:
      "I'm a software engineer and artist based in San Francisco. I build tools that feel inevitable — systems designed around clarity and performance. When I'm not writing code, I make abstract digital work exploring color, motion, and emergent structure.",
    currently:
      "Open to senior engineering roles and creative collaborations. Previously led infrastructure at a Series B startup. Available for consulting on distributed systems and generative art installations.",
  },
  theme: {
    lightLabel: "Light",
    darkLabel: "Dark",
  },
  tabs: [
    { id: "experiences", label: "Experiences" },
    { id: "projects", label: "Projects" },
    { id: "art", label: "Art Gallery" },
  ],
  art: {
    intro: "Here are some images that I've made in my free time. Still early in my journey, but I am still improving and I hope to continue making more art pieces in the future.",
    searchPlaceholder: "Search artworks...",
    emptyStateText: "No artworks match your search.",
  },
  footer: {
    note: "Thanks for visiting. This portfolio represents a selection of work from 2023–2024 — both the software systems I've built professionally and the art I make in my own time. If you'd like to collaborate, commission a piece, or just talk shop about distributed systems or generative art, reach out at",
    contactLabel: "Get in touch",
    contactEmail: "hello@yourname.dev",
    copyrightName: "Your Name",
  },
  experiences: [
    {
      id: "acme-infra",
      year: "2022–2024",
      title: "Senior Infrastructure Engineer",
      company: "Acme Systems",
      description:
        "Led the platform team responsible for service mesh reliability and deployment tooling across a 200+ service fleet. Cut incident response time by half through better observability tooling.",
      tags: ["Go", "Kubernetes", "Observability"],
      logoFileName: "groveware-logo.png"
    },
    {
      id: "nimbus-labs",
      year: "2020–2022",
      title: "Software Engineer",
      company: "Nimbus Labs",
      description:
        "Built the core data pipeline powering real-time analytics for enterprise customers, processing millions of events per day with sub-second latency.",
      tags: ["Python", "Kafka", "Data Engineering"],
      logoFileName: "symcor-logo-cropped.jpg"
    },
  ],
  softwareProjects: [
    {
      id: "distributed-cache-engine",
      year: "2024",
      title: "Distributed Cache Engine",
      description:
        "A high-performance in-memory caching system with LRU eviction policy and consistent hashing for horizontal scaling. Built for near-zero latency reads under heavy concurrent load.",
      tags: ["Rust", "Distributed Systems", "Networking"],
      heroFileName: "portfolio_form-mcp.png",
      screenshots: [
        {
          id: "distributed-cache-engine-1",
          fileName: "distributed-cache-engine-1.jpg",
          alt: "Architecture diagram of the distributed cache engine",
          title: "Architecture Diagram",
        },
        {
          id: "distributed-cache-engine-2",
          fileName: "distributed-cache-engine-2.jpg",
          alt: "Benchmark results for the distributed cache engine",
          title: "Benchmark Results",
        },
        {
          id: "distributed-cache-engine-3",
          fileName: "distributed-cache-engine-3.jpg",
          alt: "Terminal output while running the distributed cache engine",
          title: "Terminal Output",
        },
      ],
    },
    {
      id: "neural-style-transfer",
      year: "2024",
      title: "Neural Style Transfer",
      description:
        "Real-time artistic style transfer using convolutional neural networks. Supports live webcam input and exports styled video frames at 24fps with configurable style strength.",
      tags: ["Python", "PyTorch", "OpenCV"],
      heroFileName: "neural-style-transfer.png",
      screenshots: [
        {
          id: "neural-style-transfer-1",
          fileName: "neural-style-transfer-1.jpg",
          alt: "Live demo of the neural style transfer tool",
          title: "Live Demo",
        },
        {
          id: "neural-style-transfer-2",
          fileName: "neural-style-transfer-2.jpg",
          alt: "Model pipeline diagram for the neural style transfer tool",
          title: "Model Pipeline",
        }
      ],
    },
  ],
  artPieces: [
    {
      id: "sunset-fold",
      title: "Sunset Fold",
      date: "2024-03-15",
      description:
        "A study in folded gradients — warm light bending through a single continuous surface.",
      fileName: "sunset-fold.jpg"
    },
    {
      id: "amber-bloom",
      title: "Amber Bloom",
      date: "2024-02-24",
      description:
        "Generative petals rendered from a recursive branching algorithm, tuned for warm color harmony.",
      fileName: "amber-bloom.jpg"
    },
    {
      id: "onyx-crane",
      title: "Onyx Crane",
      date: "2024-02-09",
      description: "A silhouette study exploring negative space against a warm gradient field.",
      fileName: "onyx-crane.jpg"
    },
    {
      id: "verdant-static",
      title: "Verdant Static",
      date: "2024-01-23",
      description: "Particle noise driven by a Perlin field, biased toward teal and violet.",
      fileName: "verdant-static.jpg"
    },
    {
      id: "tidal-current",
      title: "Tidal Current",
      date: "2024-01-09",
      description: "Flow-field simulation rendered as layered ribbons of color in motion.",
      fileName: "tidal-current.jpg"
    },
    {
      id: "deep-marble",
      title: "Deep Marble",
      date: "2024-01-02",
      description: "Fluid dynamics simulation captured mid-diffusion, rendered in cool tones.",
      fileName: "deep-marble.jpg"
    },
    {
      id: "molten-fiber",
      title: "Molten Fiber",
      date: "2023-09-18",
      description: "Thousands of thin strands simulated under a shared force field.",
      fileName: "molten-fiber.jpg"
    },
    {
      id: "violet-arc",
      title: "Background Pattern",
      date: "2023-11-04",
      description: "A minimal arc gradient designed as a tileable background pattern.",
      fileName: "violet-arc.jpg"
    },
  ],
};