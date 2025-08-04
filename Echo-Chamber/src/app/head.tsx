import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      {/* Basic Metadata */}
      <title>EchoChamber – A Non-Political Social Media Space</title>
      <meta
        name="description"
        content="EchoChamber is a social platform focused on interest-based, non-political conversations. Connect with others in a peaceful online space."
      />
      <meta
        name="keywords"
        content="echo chamber, social media without politics, peaceful online space, good vibes app, interest based community"
      />
      <meta name="author" content="Nirmal Chhetri" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />

      {/* Favicon */}
      <link rel="icon" href="/img/Main-logo.png" />

      {/* Open Graph / Facebook */}
      <meta
        property="og:title"
        content="EchoChamber – A Non-Political Social Media Space"
      />
      <meta
        property="og:description"
        content="EchoChamber is a vibe-based alternative to traditional social platforms, where people connect through shared interests without political toxicity."
      />
      <meta property="og:url" content="https://echo-chamber-next.vercel.app" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://echo-chamber-next.vercel.app/img/Main-logo.png"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="EchoChamber – A Peaceful Social Media Experience"
      />
      <meta
        name="twitter:description"
        content="Join EchoChamber: a platform for non-political, peaceful conversations driven by shared interests and good vibes."
      />
      <meta
        name="twitter:image"
        content="https://echo-chamber-next.vercel.app/img/Main-logo.png"
      />
      {/* Optional: */}
      {/* <meta name="twitter:creator" content="@yourTwitterHandle" /> */}
    </Head>
  );
}
