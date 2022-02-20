// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gsheets", {
  getData: async () => {
    return await ipcRenderer.invoke("get-data");
  },
  updateData: (dataArray) => ipcRenderer.send("update-data", dataArray),
  deleteRow: (row) => ipcRenderer.send("delete-row", row),
});

contextBridge.exposeInMainWorld("file", {
  save: (estArray) => ipcRenderer.send("save", estArray),
  load: async () => {
    return await ipcRenderer.invoke("load");
  },
  exportCSV: (estArray) => ipcRenderer.send("export", estArray)
})

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
