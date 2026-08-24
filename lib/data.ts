export type TabId = "experiences" | "software" | "art";

export interface SoftwareImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface SoftwareProject {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  image: SoftwareImage;
  images: SoftwareImage[];
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  logo: SoftwareImage;
}

export interface ArtPiece {
  id: string;
  title: string;
  date: string | null;
  description: string;
  src: string;
  alt: string;
}

export interface SiteData {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  profile: {
    eyebrow: string;
    name: string;
    aboutLabel: string;
    about: string;
    currentlyLabel: string;
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
    aboutLabel: "About",
    about:
      "I'm a software engineer and artist based in San Francisco. I build tools that feel inevitable — systems designed around clarity and performance. When I'm not writing code, I make abstract digital work exploring color, motion, and emergent structure.",
    currentlyLabel: "Currently",
    currently:
      "Open to senior engineering roles and creative collaborations. Previously led infrastructure at a Series B startup. Available for consulting on distributed systems and generative art installations.",
  },
  theme: {
    lightLabel: "Light",
    darkLabel: "Dark",
  },
  tabs: [
    { id: "experiences", label: "Experiences" },
    { id: "software", label: "Projects" },
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
      logo: {
        id: "acme-infra-logo",
        src: "/images/experiences/acme-logo.jpg",
        alt: "Acme Systems logo",
        title: "Acme Systems",
      },
    },
    {
      id: "nimbus-labs",
      year: "2020–2022",
      title: "Software Engineer",
      company: "Nimbus Labs",
      description:
        "Built the core data pipeline powering real-time analytics for enterprise customers, processing millions of events per day with sub-second latency.",
      tags: ["Python", "Kafka", "Data Engineering"],
      logo: {
        id: "nimbus-labs-logo",
        src: "/images/experiences/nimbus-labs-logo.jpg",
        alt: "Nimbus Labs logo",
        title: "Nimbus Labs",
      },
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
      image: {
        id: "distributed-cache-engine-hero",
        src: "/images/software/distributed-cache-engine-hero.jpg",
        alt: "Hero graphic for the distributed cache engine",
        title: "Distributed Cache Engine",
      },
      images: [
        {
          id: "distributed-cache-engine-1",
          src: "/images/software/distributed-cache-engine-1.jpg",
          alt: "Architecture diagram of the distributed cache engine",
          title: "Architecture Diagram",
        },
        {
          id: "distributed-cache-engine-2",
          src: "/images/software/distributed-cache-engine-2.jpg",
          alt: "Benchmark results for the distributed cache engine",
          title: "Benchmark Results",
        },
        {
          id: "distributed-cache-engine-3",
          src: "/images/software/distributed-cache-engine-3.jpg",
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
      image: {
        id: "neural-style-transfer-hero",
        src: "/images/software/neural-style-transfer-hero.jpg",
        alt: "Hero graphic for the neural style transfer tool",
        title: "Neural Style Transfer",
      },
      images: [
        {
          id: "neural-style-transfer-1",
          src: "/images/software/neural-style-transfer-1.jpg",
          alt: "Live demo of the neural style transfer tool",
          title: "Live Demo",
        },
        {
          id: "neural-style-transfer-2",
          src: "/images/software/neural-style-transfer-2.jpg",
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
      date: "Mar 2024",
      description:
        "A study in folded gradients — warm light bending through a single continuous surface.",
      src: "/images/art/sunset-fold.jpg",
      alt: "Abstract gradient artwork titled Sunset Fold",
    },
    {
      id: "amber-bloom",
      title: "Amber Bloom",
      date: "Feb 2024",
      description:
        "Generative petals rendered from a recursive branching algorithm, tuned for warm color harmony.",
      src: "/images/art/amber-bloom.jpg",
      alt: "Abstract gradient artwork titled Amber Bloom",
    },
    {
      id: "onyx-crane",
      title: "Onyx Crane",
      date: "Feb 2024",
      description: "A silhouette study exploring negative space against a warm gradient field.",
      src: "/images/art/onyx-crane.jpg",
      alt: "Abstract gradient artwork titled Onyx Crane",
    },
    {
      id: "verdant-static",
      title: "Verdant Static",
      date: "Jan 2024",
      description: "Particle noise driven by a Perlin field, biased toward teal and violet.",
      src: "/images/art/verdant-static.jpg",
      alt: "Abstract gradient artwork titled Verdant Static",
    },
    {
      id: "tidal-current",
      title: "Tidal Current",
      date: "Jan 2024",
      description: "Flow-field simulation rendered as layered ribbons of color in motion.",
      src: "/images/art/tidal-current.jpg",
      alt: "Abstract gradient artwork titled Tidal Current",
    },
    {
      id: "deep-marble",
      title: "Deep Marble",
      date: "Jan 2024",
      description: "Fluid dynamics simulation captured mid-diffusion, rendered in cool tones.",
      src: "/images/art/deep-marble.jpg",
      alt: "Abstract gradient artwork titled Deep Marble",
    },
    {
      id: "molten-fiber",
      title: "Molten Fiber",
      date: "Jan 2024",
      description: "Thousands of thin strands simulated under a shared force field.",
      src: "/images/art/molten-fiber.jpg",
      alt: "Abstract gradient artwork titled Molten Fiber",
    },
    {
      id: "violet-arc",
      title: "Background Pattern",
      date: "Jan 2024",
      description: "A minimal arc gradient designed as a tileable background pattern.",
      src: "/images/art/violet-arc.jpg",
      alt: "Abstract gradient artwork titled Background Pattern",
    },
  ],
};