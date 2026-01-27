import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/contexts/NavigationContext";
// Assuming WidgetContext might provide shadowRoot in the future, 
// for now we'll handle it gracefully.
// import { useWidgetContext } from "@/constexts/WidgetContext"; 

import { categoryOrder, categoryConfig } from "./InfiniteCardScroll/CardGrid.constants";

const navLinks = categoryOrder.map(id => ({
    href: `#${id}`,
    label: (categoryConfig as any)[id].label
}));

export const Navbar: React.FC = () => {
    const { navigate, currentPath } = useNavigation();
    const [activeSection, setActiveSection] = useState<string>("");
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Helper to find elements in Shadow DOM or Light DOM
    const findElement = (selector: string) => {
        // Check for shadow root if applicable
        // const shadowRoot = (window as any).widgetShadowRoot; 
        // return shadowRoot ? shadowRoot.querySelector(selector) : document.querySelector(selector);
        return document.querySelector(selector);
    };

    const handleLinkClick = (href: string) => {
        setActiveSection(href);
        setIsOpen(false);

        if (currentPath !== "home") {
            navigate("home");
            setTimeout(() => {
                const el = findElement(href);
                el?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const el = findElement(href);
            el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            if (currentPath !== "home") return;

            const sections = navLinks.map(l => l.href.substring(1));
            let current = "";

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const { top, bottom } = el.getBoundingClientRect();
                    // Adjust threshold as needed
                    if (top <= 150 && bottom >= 150) {
                        current = `#${id}`;
                    }
                }
            }

            if (current && activeSection !== current) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPath, activeSection]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-foreground/5 py-3" : "bg-transparent py-5"}`}>
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick("#home")}>
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">22</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Widgets</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 bg-foreground/5 p-1 rounded-full border border-foreground/5">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(link.href);
                            }}
                            className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeSection === link.href ? "text-primary" : "text-foreground/60"
                                }`}
                        >
                            {link.label}
                            {activeSection === link.href && (
                                <motion.span
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-background rounded-full -z-10 shadow-sm border border-foreground/5"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
                    <div className={`w-6 h-0.5 bg-foreground mt-1.5 transition-all ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-foreground/5 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(link.href);
                                    }}
                                    className={`block text-lg font-medium ${activeSection === link.href ? "text-primary" : "text-foreground/60"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
