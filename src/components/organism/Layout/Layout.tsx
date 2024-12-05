import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Header } from "../../modules";
import { LayoutProps } from "./@types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <BackgroundBeamsWithCollision>
      <div className="w-screen min-h-screen flex items-center justify-between">
        <div className="flex flex-col gap-12 w-full h-auto items-center min-h-screen">
          <Header />
          {children}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};
