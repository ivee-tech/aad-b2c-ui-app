import { StoreService } from './services/store-service';
import config from './assets/config/config.json';
import { AuthService } from './auth/auth-service';

export class App {

    public init() {
        let sConfig = (JSON.stringify(config));
        let storeSvc: StoreService = new StoreService();
        storeSvc.setConfig(config);
        let authSvc = new AuthService(storeSvc);
        authSvc.login('loginPopup', (account) => {
            storeSvc.setAuthAccount(account, config.auth.cacheLocation);
            let accountNameDiv = document.getElementById('accountNameDiv') as HTMLDivElement;
            accountNameDiv.innerText = `Account name: ${account.name}`;
            let claimsDiv = document.getElementById('claimsDiv') as HTMLDivElement;
            authSvc.runWithToken((token) => {
                console.log(token);
                let claims = authSvc.getClaims(token);
                let s = '';
                for(let prop in claims) {
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
