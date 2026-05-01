import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/useAuth";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create Playlist", url: "/create-playlist", icon: Sparkles },
];

const DashboardSidebar = () => {
  const {handleLogout} = useAuth();
  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 z-40 flex-col glass border-r border-white/10 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">MixMatch</span>
        </div>

        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 px-4 py-2 flex justify-around items-center">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Sair</span>
        </button>
      </nav>
    </>
  );
};

export default DashboardSidebar;
