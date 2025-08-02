import EchoChamber from "@/components/landing/EchoChamber";
import HeroPart from "@/components/landing/Hero";
import Who from "@/components/landing/Who";
import WhyJoin from "@/components/landing/WhyJoin";

export const metadata = {
  title: "EchoChamber - Connect & Share in a Safer Space",
  description:
    "EchoChamber is a social media platform focused on non-political, respectful discussions.",
  keywords: [
    "social media",
    "EchoChamber",
    "community",
    "non-political discussions",
    "facebook",
    "instagram",
    "good-vibes",
    "Nepal",
    "non-toxic",
  ],
  openGraph: {
    title: "EchoChamber - Connect & Share in a Safer Space",
    description:
      "EchoChamber is a social media platform focused on non-political, respectful discussions.",
    url: "https://echo-chamber-next.vercel.app/",
    siteName: "EchoChamber",
    images: [
      {
        url: "https://echo-chamber-next.vercel.app/img/Main-logo.png",
        width: 1200,
        height: 630,
        alt: "EchoChamber OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoChamber - Connect & Share in a Safer Space",
    description:
      "EchoChamber is a social media platform focused on non-political, respectful discussions.",
    creator: "@someone",
    images: ["https://echo-chamber-next.vercel.app/img/Main-logo.png"],
  },
};

export default function Homepage() {
  return (
    <>
      <HeroPart />
      <div className="md:px-30">
        <EchoChamber />
        <Who />
        <WhyJoin />
      </div>
    </>
  );
}
