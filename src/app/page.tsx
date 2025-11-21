"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

import PostCard from "./components/PostCard";
import CreatePost from "./components/CreatePost";
import Navigation from "./components/Navigation";
import Particles from "./components/Particles"; // ✅ import du composant corrigé

interface Post {
  id: number;
  content: string;
  timestamp: string;
  reactions: {
    heart: number;
    fire: number;
    laugh: number;
    thumbs: number;
  };
  comments: number;
  color: string;
}

const colors = ["purple", "blue", "yellow", "green", "pink"] as const;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentView, setCurrentView] = useState<"feed" | "create">("feed");
  const [darkMode, setDarkMode] = useState(false);

  // 🔹 Charger les posts depuis ton API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des posts :", error);
      }
    };
    fetchPosts();
  }, []);

  // 🔹 Gestion du mode sombre
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  // 🔹 Création d’un nouveau post
  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      content,
      timestamp: "À l'instant",
      reactions: { heart: 0, fire: 0, laugh: 0, thumbs: 0 },
      comments: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setPosts((prev) => [newPost, ...prev]);

    // Optionnel : envoie aussi vers ton API
    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    }).catch((err) => console.error("Erreur lors de l'ajout du post :", err));

    setCurrentView("feed");
  };

  const toggleDarkMode = () => setDarkMode((v) => !v);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content */}
      <main className="md:ml-20 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Wecode Confessions
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-8 h-8 text-secondary" />
              </motion.div>
            </div>
            <p className="text-muted-foreground">
              Partage tes pensées, tes galères et tes victoires de manière
              anonyme ! 🎭
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {currentView === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CreatePost onPost={handleNewPost} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Posts Feed */}
          <AnimatePresence mode="wait">
            {currentView === "feed" && (
              <motion.div
                key="feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* <PostCard {...post} /> */}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {currentView === "feed" && posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="mb-2">Aucun post pour le moment</h3>
              <p className="text-muted-foreground mb-6">
                Sois le premier à partager quelque chose !
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("create")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Créer un post 🎉
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>

      {/* ✅ Particles corrigés */}
      <Particles />
    </div>
  );
}
