import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    /* Next 16 only honours quality values listed here; anything else is
       silently served at the 75 default. Every quality prop in the codebase
       was therefore doing nothing. These are the values the components
       actually ask for: 55 for the 120px face thumbnails in JourneyScroll,
       68 for the sponsor gallery frame, 70 for the use-case photography. */
    qualities: [55, 68, 70, 75],
  },
};

export default nextConfig;
