// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Loader2, MessageCircle } from "lucide-react";
// import PostCard from "../../components/PostCard";

// export default function SinglePostPage() {
//   const { id: postId } = useParams();

//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [loadingPost, setLoadingPost] = useState(true);
//   const [loadingComments, setLoadingComments] = useState(true);
//   const [sending, setSending] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch(`/api/posts/${postId}`);
//         if (!res.ok) throw new Error("Post introuvable");
//         const data = await res.json();
//         setPost(data);
//       } catch (err) {
//         console.error("Erreur fetch post :", err);
//       } finally {
//         setLoadingPost(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const res = await fetch(`/api/posts/${postId}/comments`);
//         console.log("Statut réponse:", res.status);
//         if (!res.ok) throw new Error("Commentaires introuvables");

//         const data = await res.json();
//         console.log("Commentaires récupérés:", data);
//         console.log("Type de data:", typeof data, "Array?", Array.isArray(data));
//         console.log("Nombre de commentaires:", data?.length);
//         setComments(data);
//       } catch (err) {
//         console.error("Erreur fetch comments :", err);
//       } finally {
//         setLoadingComments(false);
//       }
//     };

//     fetchPost();
//     fetchComments();
//   }, [postId]);

//   // 🔹 Envoyer un commentaire
//   const handleSendComment = async () => {
//     if (!newComment.trim()) return;

//     setSending(true);
//     try {
//       const res = await fetch(`/api/posts/${postId}/comments`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (!res.ok) throw new Error("Impossible d'envoyer le commentaire");
//       const saved = await res.json();
//       setComments((prev) => [saved, ...prev]);
//       setNewComment("");
//     } catch (err) {
//       console.error("Erreur commentaire :", err);
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loadingPost) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="animate-spin w-10 h-10 text-muted-foreground" />
//       </div>
//     );
//   }

//   if (!post) {
//     return <p className="text-center text-muted-foreground">Post introuvable.</p>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
//       {/* Post */}
//       <PostCard
//         {...post}
//         reactions={{
//           heart: post.reactions?.heart ?? 0,
//           fire: post.reactions?.fire ?? 0,
//           laugh: post.reactions?.laugh ?? 0,
//           thumbs: post.reactions?.thumbs ?? 0,
//         }}
//       />

//       {/* Section commentaires */}
//       <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
//         <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//           <MessageCircle className="w-5 h-5" />
//           Commentaires
//         </h2>

//         {/* Champ d'ajout */}
//         <div className="flex gap-2 mb-6">
//           <input
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendComment();
//               }
//             }}
//             placeholder="Écrire un commentaire…"
//             className="flex-1 px-4 py-2 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-primary"
//           />

//           <AnimatePresence>
//             {newComment.trim() && (
//               <motion.button
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0, opacity: 0 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={handleSendComment}
//                 disabled={sending}
//                 className="px-4 py-2 rounded-xl bg-primary text-white flex items-center gap-1 disabled:opacity-50"
//               >
//                 {sending ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Send className="w-5 h-5" />
//                 )}
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Liste des commentaires */}
//         <p className="text-xs text-gray-500 mb-2">
//           Debug: {comments.length} commentaire(s) - Loading: {loadingComments.toString()}
//         </p>
//         {loadingComments ? (
//           <div className="flex justify-center py-4">
//             <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
//           </div>
//         ) : Array.isArray(comments) && comments.length > 0 ? (
//           <AnimatePresence>
//             {comments.map((c) => (
//               <motion.div
//                 key={c._id ?? Math.random()}
//                 initial={{ opacity: 0, x: -15 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 15 }}
//                 transition={{ duration: 0.2 }}
//                 className="p-4 bg-muted rounded-xl mb-3 border-l-4 border-primary/20"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
//                     <MessageCircle className="w-4 h-4 text-white" />
//                   </div>
//                   <p className="text-muted-foreground text-xs font-medium">
//                     {new Date(c.createdAt).toLocaleDateString('fr-FR', {
//                       day: 'numeric',
//                       month: 'long',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//                 <p className="text-foreground ml-10">{c.content}</p>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         ) : (
//           <p className="text-sm text-muted-foreground text-center">
//             Aucun commentaire pour le moment.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import PostCard from "../../components/PostCard";

export default function SinglePostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // 🔹 Fetch du post
  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Erreur lors de la récupération du post");
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch des commentaires
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      if (!res.ok) throw new Error("Erreur lors de la récupération des commentaires");
      const data = await res.json();

      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  // 🔹 Envoi d’un commentaire
  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");

      const savedComment = await res.json();
      savedComment.createdAt = new Date(savedComment.createdAt);
      setComments((prev) => [savedComment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post)
    return (
      <p className="text-center py-8 text-muted-foreground">
        Chargement du post…
      </p>
    );

  return (
    <div className="min-h-screen pb-28 bg-linear-to-br from-background via-background to-muted">

      {/* 🔙 Back button */}
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mt-6 mb-3 text-primary hover:opacity-70 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-8">

        {/* 🟣 Post */}
        <PostCard
          _id={post._id}
          content={post.content}
          reactions={post.reactions}
        />

        {/* 🔥 Header Commentaires */}
        <div className="flex items-center gap-2 mt-6">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Commentaires ({comments.length})
          </h2>
        </div>

        {/* 💬 Liste des commentaires */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-muted rounded-md">

          <AnimatePresence>
            {loadingComments ? (
              <p className="text-muted-foreground text-center py-8">
                Chargement des commentaires…
              </p>
            ) : comments.length > 0 ? (
              comments.map((c) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 bg-muted/60 rounded-xl border-l-4 border-primary/40 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-muted-foreground text-xs font-medium">
                      {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="text-foreground ml-10">{c.content}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucun commentaire pour le moment.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📝 Formulaire fixe */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            aria-label="Écrire un commentaire"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire…"
            className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-primary focus:outline-none transition"
          />

          <AnimatePresence>
            {newComment.trim() && (
              <motion.button
                onClick={handleSendComment}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="px-5 py-3 rounded-xl bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-md font-medium"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
