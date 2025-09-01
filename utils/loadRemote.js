/**
 * Dynamically loads a remote module using Module Federation.
 * This utility function ensures that the remote module is loaded only once
 * and initializes the shared scope for Module Federation.
 *
 * @param {string} remoteUrl - The URL of the remote entry file (e.g., remoteEntry.js).
 * @param {string} scope - The scope name of the remote application (e.g., "remoteApp").
 * @param {string} module - The exposed module to load (e.g., "./Button").
 * @returns {Promise<any>} - A promise that resolves to the loaded module.
 *
 * Usage:
 * const Button = await loadRemote(
 *   "https://example.com/remoteEntry.js",
 *   "remoteApp",
 *   "./Button"
 * );
 */
export async function loadRemote(remoteUrl, scope, module) {
  /**
   * Check if the remote script is already loaded.
   * If not, dynamically load the remote script by appending it to the document head.
   */
  if (!window[scope]) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = remoteUrl;
      script.onload = resolve; // Resolve the promise when the script is loaded successfully.
      script.onerror = reject; // Reject the promise if there is an error loading the script.
      document.head.appendChild(script); // Append the script to the document head.
    });
  }

  /**
   * Initialize the shared scope for Module Federation.
   * This ensures that shared dependencies (e.g., React) are properly initialized.
   */
  await __webpack_init_sharing__("default");

  /**
   * Get the container (remote application) from the global scope.
   * Initialize the container with the shared scope.
   */
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);

  /**
   * Retrieve the exposed module from the container.
   * The module is returned as a factory function, which is then executed to get the module.
   */
  const factory = await container.get(module);
  return factory(); // Return the loaded module.
}