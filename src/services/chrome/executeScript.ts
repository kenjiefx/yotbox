import { TabQueryExecutor } from "./types";

function composeScriptExecutor(
  tabQueryExecutor: TabQueryExecutor,
  world: "MAIN" | "ISOLATED",
) {
  return async function executeScript(func: () => unknown): Promise<unknown> {
    const tabs = await tabQueryExecutor;
    if (!tabs || tabs.length === 0) {
      throw new Error("Script Executor: No active tab found");
    }
    const tabId = tabs[0].id;
    if (!tabId) {
      throw new Error("Script Executor: Active tab has no id");
    }
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      world,
      func,
    });
    if (!results || results.length === 0) {
      throw new Error("Script Executor: No results from script execution");
    }
    return results.map((result) => result.result)[0];
  };
}

export function executeScriptInMainWorld(scriptFunc: () => unknown) {
  const tabQueryExecutor = chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const scriptExecutor = composeScriptExecutor(tabQueryExecutor, "MAIN");
  return scriptExecutor(scriptFunc);
}
