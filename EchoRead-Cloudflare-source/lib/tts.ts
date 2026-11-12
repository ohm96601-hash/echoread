export interface VoiceOption{id:string;name:string;lang:string}
export interface SpeechOptions{rate?:number;accent?:string}
export interface TTSProvider{speak(text:string,options?:SpeechOptions):Promise<void>;stop():void;getVoices():Promise<VoiceOption[]>}
export class BrowserTTSProvider implements TTSProvider{
 private finish:(()=>void)|null=null;
 stop(){if(typeof window==='undefined'||!window.speechSynthesis)return;speechSynthesis.cancel();this.finish?.();this.finish=null}
 async getVoices(){if(!window.speechSynthesis)return [];let voices=speechSynthesis.getVoices();if(!voices.length)await new Promise<void>(resolve=>{const done=()=>{speechSynthesis.removeEventListener('voiceschanged',done);resolve()};speechSynthesis.addEventListener('voiceschanged',done);setTimeout(done,1200)});voices=speechSynthesis.getVoices();return voices.filter(v=>/^en/i.test(v.lang)).map(v=>({id:v.voiceURI,name:v.name,lang:v.lang}))}
 speak(text:string,options:SpeechOptions={}){this.stop();return new Promise<void>((resolve,reject)=>{if(!window.speechSynthesis){reject(Error('当前浏览器不支持语音朗读'));return}const u=new SpeechSynthesisUtterance(text);u.rate=options.rate||1;u.lang=options.accent||'en-US';const vs=speechSynthesis.getVoices();u.voice=vs.find(v=>v.lang===u.lang)||vs.find(v=>/^en/i.test(v.lang))||null;this.finish=resolve;u.onend=()=>{this.finish=null;resolve()};u.onerror=e=>{this.finish=null;if(['canceled','interrupted'].includes(e.error))resolve();else reject(Error('朗读中断，请再次点击播放'))};speechSynthesis.speak(u)})}
}
// Azure is an optional server-generated audio provider. No cloud requests are enabled in V1.1.
export class AzureTTSProvider{readonly enabled=false;async generateAudio():Promise<Blob>{throw Error('尚未启用云端语音，请使用免费浏览器朗读')}}
