// src/App.jsx
import { useState } from 'react';
import { seedPosts } from './data/posts';
import Navbar from './components/Navbar';
import Composer from "./components/Composer";
import Feed from './components/Feed';
import './App.css';

export default function App() {
  // initialize posts state from your data file
  const [posts, setPosts] = useState(seedPosts);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 680, margin: '0 auto' }}>
        <Composer setPosts={setPosts} />
        <Feed posts={posts} setPosts={setPosts} />
      </main>
    </>
  );
}
