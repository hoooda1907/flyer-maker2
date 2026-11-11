const {app,BrowserWindow}=require('electron');const path=require('path');
app.whenReady().then(()=>{const w=new BrowserWindow({width:1200,height:900,autoHideMenuBar:true,webPreferences:{webSecurity:false}});w.loadFile(path.join(__dirname,'../www/index.html'))});
app.on('window-all-closed',()=>app.quit());