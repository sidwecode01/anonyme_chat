"use client";

import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

interface CreatePostProps {
  onPost: (content: string) => void;
}

export default function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);

    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#06b6d4", "#facc15", "#22c55e", "#ec4899"],
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onPost(content);
    setContent("");
    setIsPosting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-6 shadow-xl backdrop-blur-sm mb-6"
      style={{
        background: "var(--card)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3>Partage tes pensées anonymement 🎭</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Qu'est-ce qui te passe par la tête ? 🤔"
          className="w-full p-4 rounded-2xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none resize-none transition-all"
          rows={4}
          maxLength={500}
        />

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-muted-foreground">
            {content.length}/500
          </span>

          <motion.button
            type="submit"
            disabled={!content.trim() || isPosting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isPosting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Publier 🎉</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
