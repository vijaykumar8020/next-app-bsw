"use client";

/**
 * Home component for the Next.js application.
 * This component dynamically loads and renders remote components (Button, Card, HeroBanner)
 * from a Create React App (CRA) hosted on Vercel using Module Federation.
 */

import { useEffect, useState } from "react";
import { loadRemote } from "../utils/loadRemote";

export default function Home() {
  /**
   * State variables to hold the dynamically loaded remote components.
   * - RemoteButton: Holds the Button component loaded from the remote app.
   * - RemoteCard: Holds the Card component loaded from the remote app.
   * - RemoteHeroBanner: Holds the HeroBanner component loaded from the remote app.
   */
  const [RemoteButton, setRemoteButton] = useState(null);
  const [RemoteCard, setRemoteCard] = useState(null);
  const [RemoteHeroBanner, setRemoteHeroBanner] = useState(null);

  useEffect(() => {
    /**
     * Dynamically loads the remote Button component from the remote app.
     * The remote app is hosted on Vercel, and the component is exposed via Module Federation.
     */
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js",
      "remoteApp",
      "./Button"
    ).then((mod) => setRemoteButton(() => mod.default));

    /**
     * Dynamically loads the remote Card component from the remote app.
     */
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js",
      "remoteApp",
      "./Card"
    ).then((mod) => setRemoteCard(() => mod.default));

    /**
     * Dynamically loads the remote HeroBanner component from the remote app.
     */
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