const path = require('path');
const { app, BrowserWindow } = require('electron');

// Enable safe reuse of renderer processes
app.allowRendererProcessReuse = true;

let pluginName;

switch (process.platform) {
    case "win32":
        pluginName = process.arch === 'x64' ? 'x64/pepflashplayer.dll' : 'x32/pepflashplayer32.dll';
        break;
    default:
        pluginName = 'x64/pepflashplayer.dll';
        break;
}

app.commandLine.appendSwitch("ppapi-flash-path", !app.isPackaged ? path.join(__dirname, "plugins", pluginName) : path.join(process.resourcesPath, "plugins", pluginName));
app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");

async function createMainWindow() {
    const mainWindow = new BrowserWindow({
        icon: path.join(__dirname, 'assets', 'icons', 'icon.png'),
        title: 'SilverAQ',
        fullscreen: false,
        width: 960,
        height: 550,
        frame: true,
        resizable: true,
        maximizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            plugins: true
        }
    });

    await mainWindow.loadURL("https://silveraq.xyz/game");
}

app.whenReady().then(createMainWindow);
