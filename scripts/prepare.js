const fs=require('fs'),path=require('path');
const mk=d=>fs.mkdirSync(d,{recursive:true}),nm=p=>path.join('node_modules',p);
mk('www/lib');mk('www/fonts');
for(const [s,d] of [['xlsx/dist/xlsx.full.min.js','xlsx.full.min.js'],['html2canvas/dist/html2canvas.min.js','html2canvas.min.js'],['jspdf/dist/jspdf.umd.min.js','jspdf.umd.min.js']]){
 try{fs.copyFileSync(nm(s),path.join('www/lib',d));console.log('lib ok',d)}catch(e){console.warn('LIB MISSING',s)}}
let css='';
for(const id of ['cairo','tajawal','changa','lemonada','marhey','reem-kufi','aref-ruqaa','amiri']){
 try{const src=fs.readFileSync(nm(`@fontsource/${id}/700.css`),'utf8');
  for(const blk of src.split('@font-face').slice(1)){
   const m=blk.match(/url\(\.?\/?(files\/[^)]+?\.woff2)\)/);
   if(!m||!/-(arabic|latin)-700-normal\.woff2$/.test(m[1]))continue;
   const f=path.basename(m[1]);fs.copyFileSync(nm(`@fontsource/${id}/${m[1]}`),path.join('www/fonts',f));
   css+='@font-face'+blk.replace(/url\([^)]*\.woff2\)/,`url(${f})`).replace(/,\s*url\([^)]*\.woff\)\s*format\('woff'\)/,'');
  }console.log('font ok',id)}catch(e){console.warn('FONT MISSING',id,e.message)}}
fs.writeFileSync('www/fonts/fonts.css',css);
