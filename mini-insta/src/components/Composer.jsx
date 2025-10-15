import { useState } from "react";

export default function Composer({ setPosts, me = "you" }) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  function submit(e) {
    e.preventDefault();
    const url = imageUrl.trim();
    if (!url) return; // basic validation: require a non-empty image URL

    const newPost = {
      id: crypto.randomUUID(),
      author: me,
      avatar: "https://i.pravatar.cc/100?u=" + me,
      imageUrl: url,
      caption: caption.trim(),
      likedByMe: false,
      likeCount: 0,
      comments: [],
    };

    // Prepend new post to the top of the feed
    setPosts(prev => [newPost, ...prev]);

    // Clear the form
    setImageUrl("");
    setCaption("");
  }

  return (
    <form
      onSubmit={submit}
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 8,
        margin: "12px 0",
      }}
    >
      <h3>Create Post</h3>
      <input
        aria-label="Image URL"
        placeholder="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 6 }}
      />
      <input
        aria-label="Caption (optional)"
        placeholder="Caption (optional)"
        value={caption}
        onChange={e => setCaption(e.target.value)}
        style={{ width: "100%" }}
      />
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={!imageUrl.trim()}>
          Share
        </button>
      </div>
    </form>
  );
}
