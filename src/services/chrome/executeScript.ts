import { TabQueryExecutor } from "./types";

type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: Serializable }
  | Serializable[];

function composeScriptExecutor(
  tabQueryExecutor: TabQueryExecutor,
  world: "MAIN" | "ISOLATED",
) {
  return async function executeScript<Args extends Serializable[], Return>(
    func: (...args: Args) => Return,
    args?: Args,
  ): Promise<Return> {
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
      args,
    });
    if (!results || results.length === 0) {
      throw new Error("Script Executor: No results from script execution");
    }
    return results.map((result) => result.result)[0] as Return;
  };
}

export function executeScriptInMainWorld<Args extends Serializable[], Return>(
  scriptFunc: (...args: Args) => Return,
  ...args: Args
): Promise<Return> {
  const tabQueryExecutor = chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const scriptExecutor = composeScriptExecutor(tabQueryExecutor, "MAIN");
  return scriptExecutor(scriptFunc, args);
}
