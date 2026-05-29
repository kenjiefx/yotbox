export type TabQueryExecutor = Promise<chrome.tabs.Tab[]>;
export type ScriptExecutor = (func: () => unknown) => Promise<unknown>;
