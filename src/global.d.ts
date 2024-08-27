interface Window {
    location: any;
    myProp: number;
  }
  
declare var window: Window;
  
interface LocalStorage {
setItem(arg0: string, token: string): unknown;
getItem(arg0: string): unknown;
location: any;
}
  
declare var localStorage: LocalStorage;
