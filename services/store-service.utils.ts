// import { injectable } from "inversify";
import { IStoreService } from "../common/store-service.interface";

// @injectable()
class StoreServiceUtils {

    configKey: string;
    accountKey: string;

    constructor() {
        this.configKey = '';
        this.accountKey = '';
    }

    private configKeyCheck() {
        if(!this.configKey) {
            let msg = 'configKey cannot be empty.';
            console.log(msg);
            throw new Error(msg);
        }
    }

    private accountKeyCheck() {
        if(!this.accountKey) {
            let msg = 'accountKey cannot be empty.';
            console.log(msg);
            throw new Error(msg);
        }
    }

    setConfig(config: any): void {
        this.configKeyCheck();
        localStorage.setItem(this.configKey, JSON.stringify(config));
    }

    getConfig() {
        this.configKeyCheck();
        let obj = localStorage.getItem(this.configKey);
        if (!obj) return null;
        return JSON.parse(obj.toString());
    }

    setSessionValue(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    getSessionValue(key: string): string {
        let v = sessionStorage.getItem(key);
        return v ? v.toString() : '';
    }

    removeSessionItem(key: string) {
        sessionStorage.removeItem(key);
    }

    setLocalValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getLocalValue(key: string): string {
        let v = localStorage.getItem(key);
        return v ? v.toString() : '';
    }

    removeLocalItem(key: string) {
        localStorage.removeItem(key);
    }

    getValue(key: string, cacheLocation: string) {
        if(cacheLocation === 'localStorage') {
            return this.getLocalValue(key);
        }
        // sessionStorage
        return this.getSessionValue(key);
    }

    setValue(key: string, value: string, cacheLocation: string) {
        if(cacheLocation === 'localStorage') {
            this.setLocalValue(key, value);
        }
        else {
            this.setSessionValue(key, value);
        }
    }

    removeItem(key: string, cacheLocation: string) {
        if(cacheLocation === 'localStorage') {
            this.removeLocalItem(key);
        }
        else {
            this.removeSessionItem(key);
        }
    }

    getAuthAccount(cacheLocation: string): any {
        this.accountKeyCheck();
        let v = this.getValue(this.accountKey, cacheLocation);
        if(v) {
            return JSON.parse(v);
        }
        return undefined;
    }

    setAuthAccount(account: any, cacheLocation: string) {
        this.accountKeyCheck();
        this.setValue(this.accountKey, JSON.stringify(account), cacheLocation);
    }

    removeAuthAccount(cacheLocation: string) {
        this.accountKeyCheck();
        this.removeItem(this.accountKey, cacheLocation);
    }

}

export default StoreServiceUtils;