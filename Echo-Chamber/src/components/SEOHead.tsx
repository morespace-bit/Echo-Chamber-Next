// components/SEOHead.tsx
import Head from "next/head";

type SEOHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function SEOHead({
  title = "EchoChamber – A Non-Political Social Media Space",
  description = "EchoChamber is a social platform for non-political, interest-based conversations. Connect with others in a peaceful online space.",
  image = "https://echo-chamber-next.vercel.app/img/Main-logo.png",
  url = "https://echo-chamber-next.vercel.app",
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="echo chamber, social media without politics, peaceful online space, good vibes app, interest based community"
      />
      <meta name="author" content="Nirmal Chhetri" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/img/Main-logo.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
