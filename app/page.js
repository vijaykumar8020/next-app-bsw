"use client";
import { useEffect, useState } from "react";
import { loadRemote } from "../utils/loadRemote";

export default function Home() {
  const [RemoteButton, setRemoteButton] = useState(null);

  useEffect(() => {
    loadRemote(
      "https://react-app-bsw.vercel.app/remoteEntry.js", // CRA ka remoteEntry
      "remoteApp",
      "./Button"
    )
      .then((mod) => {
        console.log("🔗 Remote module loaded:", mod);
        // ✅ IMPORTANT: function assign karna hai, element nahi
        setRemoteButton(() => mod.default);
      })
      .catch((err) => {
        console.error("Error loading remote:", err);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Next.js 14 (App Router) consuming Remote Button 🚀</h1>
      <p>This button is loaded dynamically from CRA hosted on Vercel:</p>

      {/* ✅ Component hai, to render karna <RemoteButton /> */}
      {RemoteButton ? <RemoteButton /> : <p>Loading remote component...</p>}
    </div>
  );
}
