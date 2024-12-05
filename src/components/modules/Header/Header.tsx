import { Link, useLocation } from "react-router-dom";
import { routes } from "./utils";

export const Header = () => {
  const location = useLocation();

  return (
    <div className="w-full flex gap-2 justify-between items-center p-7 px-8">
      <p className="text-[1.7rem] jetbrains-mono">
        <span className="khula-extrabold text-[#00FF99]">{`{`} </span>
        Pablo
        <span className="khula-extrabold text-[#00FF99]"> {`}`}</span>
      </p>

      <div className="flex gap-16 items-center flex-1 max-w-96">
        {routes.map((route) => {
          const isActive = location.pathname === route.path; // Verificar se a rota está ativa
          return (
            <Link
              key={route.id}
              to={route.path}
              className="flex gap-2 flex-col place-items-center min-h-10"
            >
              <span className="inter text-base">{route.label}</span>
              {isActive && (
                <div className="flex w-2 h-2 rounded-lg bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
