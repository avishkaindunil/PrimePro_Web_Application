// "use client";

// import { Inter } from "next/font/google";
// import "./globals.css";
// import Sidebar, { SidebarItem } from "./components/Sidebar";
// import { useRouter } from "next/navigation";
// import { LayoutDashboard } from "lucide-react";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const router = useRouter();
//   return (
//     <div className="flex">
//       <Sidebar>
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Hello" />
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Ad" />
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="GD" />
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="G" />
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
//       </Sidebar>
//       <main className="flex flex-col overflow-y-scroll h-screen w-full flex-grow p-4">
//         {children}
//       </main>
//     </div>
//   );
// }

export default function RootLayout() {
    return (
        <h1>Root Layout</h1>
    )
}
