
import { _decorator, Component, Node, game, sys, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataController')
export class DataController extends Component {
   
    public static instance : DataController =  null;

    levelIsBlocked: boolean[] = [];
    playerWin: boolean =  false;
    firstTimeWinning: boolean =  false;
    cookiesEnabled: boolean;
    returningFromDefaultScene: boolean = false;
    levelIndex: number = 0;
    maxLevelIndex: number = 4;

    timeIsRunning: boolean = true;
    
    onLoad(){
        if(DataController.instance != null && DataController.instance != this){
            this.destroy();
        }else{
            DataController.instance = this;
            game.addPersistRootNode(this.node);
        }
        this.cookiesEnabled = navigator.cookieEnabled;
        if(navigator.cookieEnabled){
            if(localStorage.getItem('plumber_playerWin') == null){
                localStorage.setItem('plumber_playerWin', 'false');
            }
            console.log("Coookies enabled, user data will be saved");
        }else{
            this.playerWin = false;
            console.log("Coookies disabled, user data will be erased after close");
        }
        this.setupBlockedLevels();
    }

    public checkIfLevelIsBlocked(index: number): boolean{
        if(this.cookiesEnabled){
            var keyString = 'plumber_level_'+index+'_Blocked';
            var valueOnIndex = localStorage.getItem(keyString.toString());
            if(valueOnIndex == 'true'){
                return true
            }else{
                return false;
            }
        }else{
            if(this.levelIsBlocked[index]){
                return true;
            }else{
                return false;
            }
        }
    }

    public unblockLevel(indexLevel: number){
        if(this.cookiesEnabled){
            var keyString = 'plumber_level_'+indexLevel+'_Blocked';
            localStorage.setItem(keyString.toString(), 'false');
        }else{
            if(this.levelIsBlocked[indexLevel]){
                this.levelIsBlocked[indexLevel] = false;
            }
        }
    }

    setupBlockedLevels(){
        if(this.cookiesEnabled){
            if(localStorage.getItem('plumber_level_0_Blocked') == null){
                localStorage.setItem('plumber_level_0_Blocked', 'false');
                localStorage.setItem('plumber_level_1_Blocked', 'true');
                localStorage.setItem('plumber_level_2_Blocked', 'true');
                localStorage.setItem('plumber_level_3_Blocked', 'true');
                localStorage.setItem('plumber_level_4_Blocked', 'true');
            }
        }else{
            this.levelIsBlocked[0] = false;
            this.levelIsBlocked[1] = true;
            this.levelIsBlocked[2] = true;
            this.levelIsBlocked[3] = true;
            this.levelIsBlocked[4] = true;
        }
    }

    playerWinFunction(){
        if(this.cookiesEnabled){
            localStorage.setItem('plumber_playerWin', 'true');
        }else{
            this.playerWin =  true;
        }
        this.firstTimeWinning = true;
    }

    checkIfPlayerWin():boolean{
        if(this.cookiesEnabled){
            var playerWinData = localStorage.getItem('plumber_playerWin');
            if(playerWinData == 'true'){
                return true
            }else{
                return false;
            }
        }else{
            if(this.playerWin){
                return true;
            }else{
                return false;
            }
        }
    }



}

