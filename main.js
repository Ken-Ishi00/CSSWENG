// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { google } = require("googleapis");
const keys = require("./keys.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected");
  }
});

async function gsget(cl) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const opt = {
    spreadsheetId: "1jq8w8X7Sc1aSuWRNMP4d6XHJrsPsF7c1ocV_zOrXfgY",
    range: "Data",
  };

  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values || [];

  return dataArray;
}

async function gsupdate(cl, dataArray) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const updateOptions = {
    spreadsheetId: "1jq8w8X7Sc1aSuWRNMP4d6XHJrsPsF7c1ocV_zOrXfgY",
    range: "Data",
    valueInputOption: "USER_ENTERED",
    resource: { values: dataArray },
  };

  gsapi.spreadsheets.values.update(updateOptions);
}

async function gsdelete(cl, index) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  let batchUpdateRequest = {
    requests: [
      {
        deleteDimension: {
          range: {
            dimension: "ROWS",
            startIndex: index,
            endIndex: index + 1,
          },
        },
      },
    ],
  };

  gsapi.spreadsheets.batchUpdate({
    spreadsheetId: "1jq8w8X7Sc1aSuWRNMP4d6XHJrsPsF7c1ocV_zOrXfgY",
    resource: batchUpdateRequest,
  });
}

ipcMain.handle("get-data", async (event, arg) => {
  const dataArray = await gsget(client);
  return dataArray;
});

ipcMain.on("update-data", (event, arg) => {
  gsupdate(client, arg);
});

ipcMain.on("delete-row", (event, arg) => {
  gsdelete(client, arg);
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 750,
    minWidth: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.maximize();
  mainWindow.show();

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
