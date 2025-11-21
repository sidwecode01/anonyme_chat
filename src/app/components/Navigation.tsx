"use client";

import { motion } from "framer-motion";
import { Home, PlusCircle, Moon, Sun } from "lucide-react";

interface NavigationProps {
  currentView: "feed" | "create";
  setCurrentView: (view: "feed" | "create") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({
  currentView,
  setCurrentView,
  darkMode,
  toggleDarkMode,
}: NavigationProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-card border-r border-border flex-col items-center py-8 gap-8 z-50"
      >
        {/* Logo */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-2xl">🎭</span>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-4 flex-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView("feed")}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              currentView === "feed"
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Home className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView("create")}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              currentView === "create"
                ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <PlusCircle className="w-6 h-6" />
          </motion.button>
        </nav>

        {/* Dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-purple-500" />
          )}
        </motion.button>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 z-50 backdrop-blur-lg"
        style={{ background: "rgba(var(--card), 0.95)" }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView("feed")}
            className={`flex flex-col items-center gap-1 ${
              currentView === "feed" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                currentView === "feed"
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                  : ""
              }`}
            >
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xs">Feed</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView("create")}
            className={`flex flex-col items-center gap-1 ${
              currentView === "create" ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                currentView === "create"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white"
                  : ""
              }`}
            >
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-xs">Créer</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-purple-500" />
              )}
            </div>
            <span className="text-xs">Mode</span>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}
