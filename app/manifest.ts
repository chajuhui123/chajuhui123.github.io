import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JOY DEVLOG",
    short_name: "Joy",
    description: "학습을 넘어, 기술의 가치와 이유를 함께 고민해보아요",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
