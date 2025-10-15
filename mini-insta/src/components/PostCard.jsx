// src/components/PostCard.jsx
import { useCallback } from "react";
import CommentSection from "./CommentSection";
import Commenting from "./Commenting";

export default function PostCard({ post, setPosts }) {
  // Toggle like for this post
  const toggleLike = useCallback(() => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== post.id) return p;
        const likedByMe = !p.likedByMe;
        const likeCount = p.likeCount + (likedByMe ? 1 : -1);
        return { ...p, likedByMe, likeCount };
      })
    );
  }, [post.id, setPosts]);

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
        margin: "12px 0",
        background: "white",
      }}
      aria-label={`post by ${post.author}`}
    >
      {/* Header */}
      <header
        style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}
      >
        <img
          src={post.avatar}
          alt={`${post.author} avatar`}
          width="36"
          height="36"
          style={{ borderRadius: "50%" }}
        />
        <strong>@{post.author}</strong>
      </header>

      {/* Photo */}
      <img
        src={post.imageUrl}
        alt={post.caption || `Photo by ${post.author}`}
        style={{ width: "100%", display: "block" }}
      />

      {/* Body */}
      <div style={{ padding: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={toggleLike}
            aria-pressed={post.likedByMe}
            aria-label={post.likedByMe ? "Unlike" : "Like"}
            title={post.likedByMe ? "Unlike" : "Like"}
          >
            {post.likedByMe ? "❤️" : "🤍"} Like
          </button>
          <span>{post.likeCount} likes</span>
        </div>

        {post.caption && (
          <p style={{ marginTop: 8 }}>
            <strong>@{post.author}</strong> {post.caption}
          </p>
        )}

        {/* Comments Section */}
        <CommentSection comments={post.comments ?? []} />
        <Commenting postId={post.id} setPosts={setPosts} />
      </div>
    </article>
  );
}
