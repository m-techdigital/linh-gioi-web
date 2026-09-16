/** Read-only pixel provenance gate. Browser rendering remains a separate visual gate. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const metadata=JSON.parse(await fs.readFile(path.join(root,'apps/web/public/game-art/marketing/native-art-provenance.json'),'utf8'));
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const source=await fs.readFile(path.join(root,metadata.source));assert.equal(digest(source),metadata.sourceSha256);
const assets=[];
for(const item of metadata.items){const p=path.join(root,'apps/web/public',item.path.slice(1)),data=await fs.readFile(p);assert.equal(digest(data),item.sha256,item.id);assets.push({...item,png:data.toString('base64')});}
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();
 const result=await page.evaluate(async({source,assets,config})=>{
  const decode=async(raw)=>{const i=new Image();i.src='data:image/png;base64,'+raw;await i.decode();const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(i,0,0);return{width:c.width,height:c.height,data:ctx.getImageData(0,0,c.width,c.height).data};};
  const original=await decode(source),decoded={};
  for(const a of assets){const d=await decode(a.png);if(d.width!==a.width||d.height!==a.height)throw Error('dimension drift '+a.id);decoded[a.id]=d;}
  const compare=(image,offsetX,offsetY)=>{let opaque=0,mismatched=0;for(let y=0;y<image.height;y++)for(let x=0;x<image.width;x++){const i=(y*image.width+x)*4;if(image.data[i+3]!==255)continue;opaque++;const j=((y+offsetY)*original.width+x+offsetX)*4;if([0,1,2].some(c=>image.data[i+c]!==original.data[j+c]))mismatched++;}return{opaque,mismatched};};
  const crop=config.logo.crop,rect=config.logo.sourceRect,pad=config.logo.pad;
  const comparisons={scene:compare(decoded['hero-artwork'],0,58),mobile:compare(decoded['hero-mobile'],118,58),wordmark:compare(decoded['wordmark-brush'],rect[0]+crop[0]-pad,rect[1]+crop[1]-pad)};
  const scene=decoded['hero-artwork'],regions=[['brand',617,24,422,154],['buttons',478,270,706,65],['counts',401,359,822,41]],transparent=[];
  for(const [name,left,top,width,height]of regions){let remaining=0;for(let y=top;y<top+height;y++)for(let x=left;x<left+width;x++)if(scene.data[(y*scene.width+x)*4+3]!==0)remaining++;transparent.push({name,remaining});}
  const changed={...scene,data:new Uint8ClampedArray(scene.data)};const index=changed.data.findIndex((v,i)=>i%4===3&&v===255);changed.data[index-3]^=1;const negative=compare(changed,0,58);
  return{sourceSize:[original.width,original.height],comparisons,transparent,negativeControlRejected:negative.mismatched===comparisons.scene.mismatched+1};
 },{source:source.toString('base64'),assets,config:metadata.extraction});
 assert.deepEqual(result.sourceSize,[1672,941]);
 for(const [key,value]of Object.entries(result.comparisons)){assert.ok(value.opaque>1000,key);assert.equal(value.mismatched,0,key+' OPAQUE_SOURCE_PIXELS');}
 for(const r of result.transparent)assert.equal(r.remaining,0,r.name+' TRANSPARENT_UI_REGIONS');
 assert.equal(result.negativeControlRejected,true);
 console.log(JSON.stringify({status:'PASS',...result},null,2));
}finally{await browser.close();}
