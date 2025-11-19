"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Assure-toi que ces imports pointent vers les bons chemins dans ton projet
import PostCard from "./components/PostCard";
import CreatePost from "./components/CreatePost";
import Navigation from "./components/Navigation";

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

const initialPosts: Post[] = [
  {
    id: 1,
    content:
      "Qui d'autre pense que les pauses café de Wecode sont les meilleures moments de la journée ? ☕️✨",
    timestamp: "Il y a 5 min",
    reactions: { heart: 24, fire: 12, laugh: 8, thumbs: 15 },
    comments: 5,
    color: "purple",
  },
  {
    id: 2,
    content:
      "Debug pendant 2h pour réaliser que j'avais oublié un point-virgule... La vie de dev 😅",
    timestamp: "Il y a 15 min",
    reactions: { heart: 45, fire: 23, laugh: 67, thumbs: 34 },
    comments: 12,
    color: "blue",
  },
  {
    id: 3,
    content:
      "Ce moment où ton code fonctionne du premier coup et tu ne sais pas pourquoi... suspect 🤔",
    timestamp: "Il y a 1h",
    reactions: { heart: 18, fire: 34, laugh: 42, thumbs: 28 },
    comments: 8,
    color: "yellow",
  },
  {
    id: 4,
    content: "Merci à tous les profs de Wecode ! Vous êtes incroyables 🙏💜",
    timestamp: "Il y a 2h",
    reactions: { heart: 89, fire: 45, laugh: 12, thumbs: 67 },
    comments: 23,
    color: "green",
  },
  {
    id: 5,
    content:
      "Quelqu'un veut former un groupe d'étude pour le prochain projet ? 📚🚀",
    timestamp: "Il y a 3h",
    reactions: { heart: 32, fire: 18, laugh: 5, thumbs: 41 },
    comments: 15,
    color: "pink",
  },
];

const colors = ["purple", "blue", "yellow", "green", "pink"] as const;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentView, setCurrentView] = useState<"feed" | "create">("feed");
  const [darkMode, setDarkMode] = useState(false);

  // Gestion du mode sombre via class Tailwind
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

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
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state for feed */}
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

      {/* Floating particles decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              background:
                i % 3 === 0
                  ? "linear-gradient(135deg, #a855f7, #ec4899)"
                  : i % 3 === 1
                  ? "linear-gradient(135deg, #06b6d4, #22c55e)"
                  : "linear-gradient(135deg, #facc15, #f97316)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
