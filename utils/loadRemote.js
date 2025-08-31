// utils/loadRemote.js
export async function loadRemote(remoteUrl, scope, module) {
  // Only load script if not already present
  if (!window[scope]) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = remoteUrl;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  return factory();
}
