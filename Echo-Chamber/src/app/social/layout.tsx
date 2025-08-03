import SocialNavBar from "@/components/social/SocialNavBar";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <SocialNavBar />
      </main>
    </>
  );
}
