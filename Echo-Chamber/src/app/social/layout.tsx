import SEOHead from "@/components/SEOHead";
import SocialNavBar from "@/components/social/SocialNavBar";
import { UserProvider } from "@/lib/context/UserContext";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <SEOHead />
      </head>
      <main>
        <UserProvider>
          <SocialNavBar />

          {children}
        </UserProvider>
      </main>
    </>
  );
}
