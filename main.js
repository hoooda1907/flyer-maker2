const {app,BrowserWindow}=require('electron');const path=require('path');
app.whenReady().then(()=>{const w=new BrowserWindow({width:1200,height:900,title:'RMT Flyer Maker',icon:path.join(__dirname,'../build/icon.png'),autoHideMenuBar:true,webPreferences:{webSecurity:false}});w.removeMenu();w.loadFile(path.join(__dirname,'../www/index.html'))});
app.on('window-all-closed',()=>app.quit());