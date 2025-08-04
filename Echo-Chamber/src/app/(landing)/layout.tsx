import LandingFooter from "@/components/landing/LandingFooter";
import LandingNavbar from "@/components/landing/LandingNavbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <LandingNavbar />
        {children}
        <LandingFooter />
      </main>
    </>
  );
}
