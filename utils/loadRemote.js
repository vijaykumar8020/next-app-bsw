// utils/loadRemote.js
export async function loadRemote(remoteUrl, scope, module) {
    // RemoteEntry inject karna
    await new Promise((resolve, reject) => {
      if (document.getElementById(`remote-${scope}`)) return resolve();
  
      const script = document.createElement("script");
      script.src = remoteUrl;
      script.id = `remote-${scope}`;
      script.type = "text/javascript";
      script.async = true;
  
      script.onload = () => {
        console.log(`Remote loaded: ${scope}`);
        resolve();
      };
  
      script.onerror = (err) => {
        reject(new Error(`Failed to load remote: ${remoteUrl}`));
      };
  
      document.head.appendChild(script);
    });
  
    // Container init
    await __webpack_init_sharing__("default");
    const container = window[scope];
    if (!container) throw new Error(`Container ${scope} not found`);
    await container.init(__webpack_share_scopes__.default);
  
    // Module load
    const factory = await container.get(module);
    const Module = factory();
  
    return Module;
  }
  