"use client";
import { useEffect, useState } from "react";
import { loadRemote } from "../utils/loadRemote";

export default function Home() {
  const [RemoteButton, setRemoteButton] = useState(null);
  const [RemoteCard, setRemoteCard] = useState(null);
  const [RemoteHeroBanner, setRemoteHeroBanner] = useState(null);

  useEffect(() => {
    // Load Button
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js",
      "remoteApp",
      "./Button"
    ).then((mod) => setRemoteButton(() => mod.default));
    // Load Card
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js",
      "remoteApp",
      "./Card"
    ).then((mod) => setRemoteCard(() => mod.default));
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js",
      "remoteApp",
      "./HeroBanner"
    ).then((mod) => setRemoteHeroBanner(() => mod.default));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Next.js 14 (App Router) consuming Remote Components 🚀</h1>
      <p>This button is loaded dynamically from CRA hosted on Vercel:</p>
      <div>
        {RemoteButton ? (
          <RemoteButton />
        ) : (
          <p>Loading remote Button component...</p>
        )}
      </div>
      <br />
      <div>
        {RemoteCard ? <RemoteCard /> : <p>Loading remote Card component...</p>}
      </div>
      <br />
      <div>
        {RemoteHeroBanner ? <RemoteHeroBanner /> : <p>Loading remote Hero Banner component...</p>}
      </div>
    </div>
  );
}
