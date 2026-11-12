import {spawn} from 'node:child_process';
const a=process.argv.slice(2),value=(flag,fallback)=>a.includes(flag)?a[a.indexOf(flag)+1]:fallback;
const p=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname',value('--host','0.0.0.0'),'--port',value('--port','3000')],{stdio:'inherit'});p.on('exit',code=>process.exit(code||0));
