  "use client";

  import { motion } from "framer-motion";
  import { Heart, MessageCircle, Smile, ThumbsUp, Zap } from "lucide-react";
  import { useState } from "react";
  import { useRouter } from "next/navigation";


  interface PostCardProps {
    _id: number;
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

  const colorVariants: Record<string, string> = {
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-400",
    yellow: "from-yellow-400 to-orange-400",
    green: "from-green-400 to-emerald-500",
    pink: "from-pink-500 to-rose-400",
  };

  // const emojis = ["❤️","😂"];
  const emojis = ["❤️", "🔥", "😂", "👍"];

  
  export default function PostCard({
    _id,
    content,
    timestamp,
    reactions,
    // comments,
    color,
  }: PostCardProps) {
    const [localReactions, setLocalReactions] = useState(reactions);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const [showEmojiBurst, setShowEmojiBurst] = useState(false);
    const router = useRouter();

    const handleReaction = (type: keyof typeof reactions, emoji: string) => {
      setLocalReactions((prev) => ({
        ...prev,
        [type]: selectedReaction === type ? prev[type] - 1 : prev[type] + 1,
      }));
      setSelectedReaction(selectedReaction === type ? null : type);
      setShowEmojiBurst(true);
      setTimeout(() => setShowEmojiBurst(false), 600);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, var(--card) 0%, var(--card) 100%)`,
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Gradient accent */}
        <div
          className={`absolute top-0 left-0 w-2 h-full bg-linear-to-br ${colorVariants[color]}`}
        />

        {/* Emoji burst animation */}
        {showEmojiBurst && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                transition={{ duration: 0.6 }}
                className="absolute text-2xl"
              >
                {emojis[Math.floor(Math.random() * emojis.length)]}
              </motion.div>
            ))}
          </div>
        )}

        {/* Anonymous badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xl">🎭</span>
          </div>
          <div>
            <p className="font-semibold">Anonymous</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>

        {/* Content */}
        <p className="mb-6 text-foreground/90">{content}</p>

        {/* Reactions */}
        <div className="flex items-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("heart", "❤️")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              selectedReaction === "heart"
                ? "bg-linear-to-br from-pink-500 to-rose-500 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={selectedReaction === "heart" ? "currentColor" : "none"}
            />
            <span className="text-sm">{localReactions?.heart ?? 0}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("fire", "🔥")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              selectedReaction === "fire"
                ? "bg-linear-to-br from-orange-500 to-red-500 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <Zap
              className="w-4 h-4"
              fill={selectedReaction === "fire" ? "currentColor" : "none"}
            />
            <span className="text-sm">{localReactions?.fire ?? 0}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("laugh", "😂")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              selectedReaction === "laugh"
                ? "bg-linear-to-br from-yellow-400 to-orange-400 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <Smile
              className="w-4 h-4"
              fill={selectedReaction === "laugh" ? "currentColor" : "none"}
            />
            <span className="text-sm">{localReactions?.laugh ?? 0}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("thumbs", "👍")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              selectedReaction === "thumbs"
                ? "bg-linear-to-br from-blue-500 to-cyan-400 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <ThumbsUp
              className="w-4 h-4"
              fill={selectedReaction === "thumbs" ? "currentColor" : "none"}
            />
            <span className="text-sm">{localReactions?.thumbs ?? 0}</span>
          </motion.button>

          <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-muted text-muted-foreground">
            <MessageCircle 
            onClick={() => router.push(`/posts/${_id}`)}
            className="w-8 h-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out" />
            {/* <span className="text-sm ">{comments ? comments : 0}</span> */}
          </div>
        </div>
      </motion.div>
    );
  }
