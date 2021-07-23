
import { _decorator, Component, Node, ParticleSystemComponent } from 'cc';
import { DataController } from './DataController';
import { FeedbackController } from './FeedbackController';
const { ccclass, property } = _decorator;

@ccclass('Truck')
export class Truck extends Component {
 
    @property(ParticleSystemComponent)
    truckParticles: ParticleSystemComponent;

    @property(FeedbackController)
    feedBackController: FeedbackController;

    public playParticles(){
        this.truckParticles.play();
    }

    public stopParticles(){
        
        this.truckParticles.node.active = false;
    }

    public playerWin(){
        if(DataController.instance.levelIndex != DataController.instance.maxLevelIndex){    
              this.feedBackController.playerWin();
        }else{
            this.feedBackController.playerFinishGame();
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
