export function composeTabQuery(options: {
  active: boolean;
  currentWindow: boolean;
}) {
  return function executeTabQuery() {
    return chrome.tabs.query({
      active: options.active,
      currentWindow: options.currentWindow,
    });
  };
}
