import Dexie,{type Table} from 'dexie';
export type Mode='reading'|'listening'|'practice'|'vocabulary';
export interface Article{id:string;title:string;originalText:string;createdAt:number;updatedAt:number;lastSentenceId?:string;lastMode:Mode}
export interface Sentence{id:string;articleId:string;order:number;english:string;chinese?:string;translationStatus:'pending'|'completed'|'failed';practiced:boolean;updatedAt:number;favorite?:boolean}
export interface Settings{speechRate:number;preferredAccent:'en-US'|'en-GB';showTranslation:boolean;repeatCount:number;pauseDuration:number;autoNext:boolean;autoPlayOnSelect:boolean;ttsProvider:'browser'|'azure'}
export const defaults:Settings={speechRate:1,preferredAccent:'en-US',showTranslation:true,repeatCount:2,pauseDuration:1,autoNext:false,autoPlayOnSelect:false,ttsProvider:'browser'};
class DB extends Dexie{articles!:Table<Article>;sentences!:Table<Sentence>;preferences!:Table<{id:string;value:Settings}>;words!:Table<{id:string;word:string;example:string}>;constructor(){super('EchoRead');this.version(1).stores({articles:'id,updatedAt',sentences:'id,articleId,[articleId+order]',preferences:'id',words:'id,word'})}}
export const db=new DB();
