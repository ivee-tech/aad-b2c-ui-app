import { StoreService } from './services/store-service';
import config from './assets/config/config.json';
import { AuthService } from './auth/auth-service';
import { AccountInfo } from '@azure/msal-common';

export class App {

    public account: AccountInfo;
    public storeSvc: StoreService;
    public authSvc: AuthService;

    public init() {
        let sConfig = (JSON.stringify(config));
        this.storeSvc = new StoreService();
        this.storeSvc.setConfig(config);
        this.authSvc = new AuthService(this.storeSvc);
        this.authSvc.login('loginPopup', (account) => {
            this.account = account;
            let menuDiv = document.getElementById('menuDiv') as HTMLDivElement;
            menuDiv.classList.remove('hidden');
            this.storeSvc.setAuthAccount(account, config.auth.cacheLocation);
            let accountNameDiv = document.getElementById('accountNameDiv') as HTMLDivElement;
            accountNameDiv.innerText = `Account name: ${account.name}`;
            let claimsDiv = document.getElementById('claimsDiv') as HTMLDivElement;
            this.authSvc.runWithToken((token) => {
                console.log(token);
                let claims = this.authSvc.getClaims(token);
                let s = '';
                for (let prop in claims) {
                    s += `${prop}: ${claims[prop]}<br/>`;
                }
                claimsDiv.innerHTML = s;
            })
        });
    }
}


let app = new App();
(<any>window).getApp = () => {
    return app;
}
(<any>window).getAccount = () => {
    return app.account;
}
(<any>window).editProfile = () => {
    app.authSvc.editProfile("loginPopup");
}
(<any>window).logout = () => {
    app.authSvc.logout();
}