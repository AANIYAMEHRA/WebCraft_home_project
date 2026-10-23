import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
 
// Public website address, used by the "View Website" button.
// Change this when you deploy the site.
const VIEW_SITE_URL = "http://localhost:5173";
 
const HOME_PATH = "/admin/home";
 
const NAV_ITEMS = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/header", label: "Header CMS" },
    { to: HOME_PATH, label: "Home Page CMS", dropdown: true },
    { to: "/admin/about", label: "About Page CMS" },
    { to: "/admin/footer", label: "Footer CMS" },
];
 
// Sections of the Home page, shown in this order under "Home Page CMS".
// The id must match the id on the section in HomeAdmin.jsx.
const HOME_SECTIONS = [
    { id: "hero", label: "Hero Content" },
    { id: "statistics", label: "Hero Statistics" },
    { id: "what-we-do", label: "What We Do" },
    { id: "why-webcraft", label: "Why Webcraft" },
    { id: "approach", label: "Our Approach" },
    { id: "products", label: "Products" },
    { id: "ai-stack", label: "AI Solutions" },
    { id: "cta", label: "CTA Section" },
];
 
const itemClass =
    "group relative flex items-center gap-3 px-4 py-4 text-[21px] transition-colors";
const subItemClass =
    "group relative flex items-center gap-2 whitespace-nowrap py-2 pl-10 pr-2 text-[15px] transition-colors";
 
// Same look for every item: bold, upright, white.
const hoverLabel = () =>
    "font-bold not-italic text-white [font-family:'Fraunces',Georgia,serif] transition-colors duration-300";
 
// Arrow is always visible.
const arrowClass = () =>
    "ml-auto text-[#6ee7b7] transition duration-300";
 
// Underline is always visible; the open page's underline is brighter.
const underlineClass = (isActive, indented) =>
    `absolute bottom-1 ${indented ? "left-10" : "left-4"} right-4 h-[2px] origin-left scale-x-100 rounded-full bg-[#6ee7b7] transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-40"
    }`;
 
// The label, arrow and hover underline shared by every sidebar item.
// `open` turns the arrow down for dropdown items.
function NavContent({ label, isActive, indented = false, open }) {
    return (
        <>
            <span className={hoverLabel(isActive)}>{label}</span>
            <span
                className={`${arrowClass(isActive)} ${
                    open ? "rotate-90" : ""
                }`}
            >
                →
            </span>
            <span className={underlineClass(isActive, indented)} />
        </>
    );
}
 
export default function AdminLayout() {
    const location = useLocation();
    const [toast, setToast] = useState(null);
 
    // The Home sections dropdown. Closed until Home Page CMS is clicked.
    const onHomePage = location.pathname.startsWith(HOME_PATH);
    const [homeOpen, setHomeOpen] = useState(false);
 
    // Open the dropdown when entering the Home page, close it when leaving.
    useEffect(() => {
        setHomeOpen(onHomePage);
    }, [onHomePage]);
 
    // Listen for messages sent by the pages (see adminToast.js).
    useEffect(() => {
        let timer;
 
        function showToast(event) {
            setToast(event.detail);
            clearTimeout(timer);
            timer = setTimeout(() => setToast(null), 3500);
        }
 
        window.addEventListener("admin-toast", showToast);
        return () => {
            window.removeEventListener("admin-toast", showToast);
            clearTimeout(timer);
        };
    }, []);
 
    // When a sub-section is clicked (URL ends with #section), scroll to it.
    // The page may still be loading its data, so retry for a few seconds.
    useEffect(() => {
        const id = location.hash.slice(1);
        if (!id) return;
 
        let attempts = 0;
        const timer = setInterval(() => {
            const element = document.getElementById(id);
            attempts += 1;
 
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                clearInterval(timer);
            } else if (attempts > 40) {
                clearInterval(timer);
            }
        }, 100);
 
        return () => clearInterval(timer);
    }, [location.pathname, location.hash]);
 
    // The open page's form has id="admin-form". Submitting it runs that page's save.
    function saveCurrentPage() {
        const form = document.getElementById("admin-form");
 
        if (form) {
            form.requestSubmit();
        } else {
            window.dispatchEvent(
                new CustomEvent("admin-toast", {
                    detail: {
                        type: "error",
                        text: "Open a page to save its changes.",
                    },
                })
            );
        }
    }
 
    // Clicking Home Page CMS opens or closes its sections.
    function handleDropdownClick() {
        if (onHomePage && homeOpen) {
            // Closing: also close every section open in the main page.
            window.dispatchEvent(new CustomEvent("home-sections-collapse"));
            setHomeOpen(false);
        } else {
            setHomeOpen(true);
        }
    }
 
    const currentPage =
        NAV_ITEMS.find((item) =>
            item.end
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)
        )?.label ?? "Dashboard";
 
    return (
        <div className="flex min-h-screen bg-[#f5faf8] font-sans text-[#253144]">
            {/* SIDEBAR */}
            <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col overflow-y-auto bg-[#0b2350] px-5 py-8 md:flex">
                <div className="mb-10 px-2">
                    <img
                        src="/logo.svg"
                        alt="Webcraft-IT"
                        className="h-10 w-auto"
                    />
                </div>
 
                <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={itemClass}
                                onClick={
                                    item.dropdown
                                        ? handleDropdownClick
                                        : undefined
                                }
                            >
                                {({ isActive }) => (
                                    <NavContent
                                        label={item.label}
                                        isActive={isActive}
                                        open={
                                            item.dropdown
                                                ? homeOpen
                                                : undefined
                                        }
                                    />
                                )}
                            </NavLink>
 
                            {/* Home page sections, shown only while the dropdown is open */}
                            {item.dropdown && onHomePage && homeOpen && (
                                <div className="mb-2 mt-1 flex flex-col">
                                    {HOME_SECTIONS.map((section) => {
                                        const isActive =
                                            onHomePage &&
                                            location.hash === `#${section.id}`;
 
                                        return (
                                            <Link
                                                key={section.id}
                                                to={`${HOME_PATH}#${section.id}`}
                                                className={subItemClass}
                                            >
                                                <NavContent
                                                    label={section.label}
                                                    isActive={isActive}
                                                    indented
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
 
            <div className="flex min-h-screen flex-1 flex-col md:ml-72">
                {/* TOP NAVBAR */}
                <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-[#d7ebe4] bg-white/90 px-6 py-4 backdrop-blur md:px-10">
                    <h1 className="font-serif text-[28px] font-bold text-[#0c1f3a]">
                        {currentPage}
                    </h1>
 
                    <div className="flex items-center gap-3">
                        <a
                            href={VIEW_SITE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-[#d7ebe4] bg-white px-5 py-2.5 text-[16px] font-semibold text-[#253144] transition hover:border-[#2aa27c] hover:text-[#1f8a86]"
                        >
                            View Website
                        </a>
 
                        <button
                            type="button"
                            onClick={saveCurrentPage}
                            className="rounded-full bg-gradient-to-r from-[#2aa27c] to-[#1f8a86] px-6 py-2.5 text-[16px] font-semibold text-white shadow-md transition hover:brightness-110"
                        >
                            Save Changes
                        </button>
                    </div>
                </header>
 
                <main className="flex-1 px-6 py-12 md:px-10">
                    <Outlet />
                </main>
            </div>
 
            {/* MESSAGE, top right */}
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed right-6 top-24 z-50 rounded-xl px-5 py-4 text-[16px] font-semibold text-white shadow-xl ${
                        toast.type === "success" ? "bg-[#1f8a86]" : "bg-red-600"
                    }`}
                >
                    {toast.text}
                </div>
            )}
        </div>
    );
}