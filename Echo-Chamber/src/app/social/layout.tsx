import SocialNavBar from "@/components/social/SocialNavBar";
import { UserProvider } from "@/lib/context/UserContext";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <UserProvider>
          <SocialNavBar />

          {children}
        </UserProvider>
      </main>
    </>
  );
}
