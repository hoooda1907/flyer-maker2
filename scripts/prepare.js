const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
const mk=d=>fs.mkdirSync(d,{recursive:true}),nm=p=>path.join('node_modules',p);
mk('www/lib');mk('www/fonts');
for(const [s,d] of [['xlsx/dist/xlsx.full.min.js','xlsx.full.min.js'],['html2canvas/dist/html2canvas.min.js','html2canvas.min.js'],['jspdf/dist/jspdf.umd.min.js','jspdf.umd.min.js'],['jszip/dist/jszip.min.js','jszip.min.js']]){
 try{fs.copyFileSync(nm(s),path.join('www/lib',d));console.log('lib ok',d)}catch(e){console.warn('LIB MISSING',s)}}
// Arabic fonts (names must match the FONTS list in www/index.html)
const FONTS=['cairo','tajawal','changa','lemonada','marhey','reem-kufi','aref-ruqaa','amiri','almarai','el-messiri','harmattan','jomhuria','kufam','lalezar','mada','markazi-text','rakkas','scheherazade-new','baloo-bhaijaan-2','katibeh','lateef','mirza','noto-kufi-arabic','noto-naskh-arabic','noto-sans-arabic','ibm-plex-sans-arabic','readex-pro','zain','alexandria','cairo-play','playpen-sans-arabic','aref-ruqaa-ink','blaka','vibes','ruwudu'];
const missing=FONTS.filter(id=>!fs.existsSync(nm('@fontsource/'+id)));
if(missing.length){
 try{execSync('npm install --no-save --no-audit --no-fund '+missing.map(i=>'@fontsource/'+i).join(' '),{stdio:'inherit'})}
 catch(e){for(const id of missing){try{execSync('npm install --no-save --no-audit --no-fund @fontsource/'+id,{stdio:'ignore'})}catch(_){console.warn('not installable:',id)}}}}
let css='';
for(const id of FONTS){let done=false;
 for(const w of ['700','400']){
  try{const src=fs.readFileSync(nm(`@fontsource/${id}/${w}.css`),'utf8');let n=0;
   for(const blk of src.split('@font-face').slice(1)){
    const m=blk.match(/url\(\.?\/?(files\/[^)]+?\.woff2)\)/);
    if(!m||!/-(arabic|latin)-\d+-normal\.woff2$/.test(m[1]))continue;
    const f=path.basename(m[1]);fs.copyFileSync(nm(`@fontsource/${id}/${m[1]}`),path.join('www/fonts',f));n++;
    css+='@font-face'+blk.replace(/url\([^)]*\.woff2\)/,`url(${f})`).replace(/,\s*url\([^)]*\.woff\)\s*format\('woff'\)/,'').replace(/font-weight:\s*\d+;?/,'font-weight:100 900;');}
   if(n){console.log('font ok',id,w);done=true;break}}catch(e){}}
 if(!done)console.warn('FONT MISSING',id)}
fs.writeFileSync('www/fonts/fonts.css',css);
