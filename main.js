const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready', function () {
  //create the window
  mainWindow = new BrowserWindow({});
  //load the html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //quit app when closed
  mainWindow.on('closed', function () {
      app.quit();
  });
  //build top menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //insert the Menu
  Menu.setApplicationMenu(mainMenu);
});


//HANDLE createAddWindow
function createAddWindow() {
    //create the window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping List Item'
    });
    //load the html into window
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
    //Garbage collection window
    addWindow.on('closed', function () {
        addWindow = null;
    });
}
// create main Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Exit',
                accelerator: process.plaform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//it mac add empty object to Menu
if(process.plaform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//add developer tools if not in produnction
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.plaform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(Item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}
