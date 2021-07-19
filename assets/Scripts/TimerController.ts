
import { _decorator, Component, Node, Label, CCInteger } from 'cc';
import { AudioController } from './AudioController';
import { DataController } from './DataController';
import { FeedbackController } from './FeedbackController';
const { ccclass, property } = _decorator;

@ccclass('TimerController')
export class TimerController extends Component {

    @property(CCInteger)
    startTime: number = 5;
    
    @property(Label)
    timerText: Label;

    @property(FeedbackController)
    feedbackContainer: FeedbackController;

    // timeIsRunning: boolean = true;

    countdownStartBool = false;
    
    start ()
    {
        DataController.instance.timeIsRunning = true;
    }

    update (deltaTime: number) {
        if(DataController.instance.timeIsRunning){
            this.startTime -= deltaTime;
            this.timerText.string = Math.round(this.startTime).toString();

            if (this.startTime <= 5.5 && !this.countdownStartBool) {
                this.countdownStartBool = true;

                AudioController.instance.playLowSecTimer();
            }

            if(this.startTime <= 0){
                this.timerText.string = "0";
                DataController.instance.timeIsRunning = false;
                this.feedbackContainer.playerLose();
            }
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