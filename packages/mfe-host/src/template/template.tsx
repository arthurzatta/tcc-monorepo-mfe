import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Input,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@tcc/ui-lib";
import { cva } from "class-variance-authority";
import {
  AudioWaveform,
  BellIcon,
  BoxesIcon,
  CalendarIcon,
  CatIcon,
  ChartNoAxesColumnIcon,
  Command,
  DogIcon,
  GalleryVerticalEnd,
  HeadsetIcon,
  HomeIcon,
  ReceiptIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Template = () => {
  return (
    <SidebarProvider>
      <AppSidebar id="sidebar" />
      <SidebarInset className="h-full">
        <header className="sticky top-0 z-50 flex shrink-0 items-center border-b border-gray-300 h-16 px-3 bg-white">
          <Input
            placeholder="Search"
            className="flex w-80 border rounded-sm border-gray-200 bg-gray-100 placeholder:text-gray-400 p-3 shadow-none"
          />
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              className="h-full w-4 border-gray-200 text-black"
            >
              <BellIcon />
            </Button>
            <div className="w-[1px] bg-gray-300 h-full">&nbsp;</div>
            <DropdownMenu>
              <DropdownMenuTrigger className="">
                <DropdownMenuLabel asChild>
                  <div className="flex gap-2 items-center w-full">
                    <div className="rounded-full bg-gray-300 text-black p-2">
                      AZ
                    </div>
                    <div className="flex flex-col items-start gap-0.5 w-full">
                      <div className="text-sm">Arthur Zatta</div>
                      <div className="text-xs text-black/30">Admin</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "",
      items: [{ title: "Dashboard", path: "/", icon: HomeIcon }],
    },
    {
      title: "Clínica",
      items: [
        { title: "Pacientes", path: "/patients", icon: CatIcon },
        { title: "Agendamentos", path: "", icon: CalendarIcon },
        { title: "Lista de Funcionários", path: "", icon: UsersIcon },
      ],
    },
    {
      title: "Finanças",
      items: [
        { title: "Vendas", path: "", icon: ChartNoAxesColumnIcon },
        { title: "Compras", path: "", icon: ReceiptIcon },
      ],
    },
    {
      title: "Outros",
      items: [
        { title: "Inventário", path: "", icon: BoxesIcon },
        { title: "Configurações", path: "", icon: SettingsIcon },
        { title: "Suporte", path: "", icon: HeadsetIcon },
      ],
    },
  ],
};

const sidebarMenuItemCva = cva(
  "flex items-center !rounded-none px-3 h-10 hover:bg-gray-100/20 cursor-pointer font-medium",
  {
    variants: {
      selected: {
        true: "bg-gray-100/30 border-r-2 border-r-gray-50 font-semibold",
        false: "bg-transparent text-white",
      },
      defaultVariants: { selected: false },
    },
  },
);

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { pathname } = useLocation();

  const checkPath = (path: string) => {
    // if (pathname === "/") return true;
    // const pathList = pathname.split("/").filter((step) => step !== "");
    return pathname === path && path !== "";
  };

  const { navMain } = data;

  return (
    <Sidebar {...props} className="bg-[#22331d] text-white !rounded-none">
      <SidebarHeader className="h-15 flex flex-col justify-center items-start px-3 py-4 font-medium text-2xl mb-4">
        <Link to="/" className="flex gap-2 items-center">
          <DogIcon className="size-8" />
          <img src="/logo.png" alt="VetCare" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navMain[0].items.map(({ icon: Icon, ...item }) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={checkPath(item.path)}>
                <Link
                  to={item.path}
                  className={sidebarMenuItemCva({
                    selected: checkPath(item.path),
                  })}
                >
                  <Icon />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {navMain.slice(1).map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel>{group.title.toUpperCase()}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(({ icon: Icon, ...item }) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={checkPath(item.path)}>
                      <Link
                        to={item.path}
                        className={sidebarMenuItemCva({
                          selected: checkPath(item.path),
                        })}
                      >
                        <Icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default Template;
