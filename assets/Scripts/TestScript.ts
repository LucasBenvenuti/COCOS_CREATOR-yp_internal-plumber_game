
import { _decorator, Component, Node, Button, Color } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { FeedbackController } from './FeedbackController';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('TestScript')
export class TestScript extends Component {

    @property(Node)
    victoryNode: Node;

    @property(Node)
    loseNode: Node;

    @property(Node)
    finishNode: Node;

    @property(Node)
    changeSceneNode: Node;

    @property(Node)
    changeScreenNode: Node;

    @property(FeedbackController)
    feedBackController: FeedbackController;

    

    start () {
        if(AudioController.instance){
            AudioController.instance.startGameSound();
        }
        if(SceneController.instance){
            SceneController.instance.startScene();
        }
    if(ButtonsHelper.instance){
        ButtonsHelper.instance.setButtonsScaleAnim(0.08, 0.75);
        ButtonsHelper.instance.setEventFunction(this.victoryNode, () =>{
            this.winFuntion();
            console.log("Win eVENT");
        }, this)
        ButtonsHelper.instance.setEventFunction(this.changeScreenNode, () =>{   
            this.changeScreen();
            setTimeout(() => {
                this.changeScreenNode.resumeSystemEvents(true);
            }, 1000);
            console.log("Change Screen");
        }, this)
        ButtonsHelper.instance.setEventFunction(this.changeSceneNode, () =>{  
            this.changeScene();
            console.log("Change Scene");
        }, this)
        ButtonsHelper.instance.setEventFunction(this.loseNode, () =>{      
            this.loseFuntion();
            console.log("Lose eVENT");
        }, this)
        ButtonsHelper.instance.setEventFunction(this.finishNode, () =>{      
            this.finishedFuntion();
            console.log("Finished eVENT");
        }, this)
    }
        // [3]
    }

    public playSound(index: number){
            if(AudioController.instance){
                AudioController.instance.playAudioSource(index);
            }

    }

    public winFuntion(){
        this.feedBackController.playerWin();
    }
    public loseFuntion(){
        this.feedBackController.playerLose();
    }
    public finishedFuntion(){
        this.feedBackController.playerFinishGame();
    }

    public changeScreen(){
         //ButtonsHelper.instance.setInputActive(this.changeScreenNode, false);
         if(SceneController.instance){
             SceneController.instance.changeScreenWithColor(new Color(144,144,144,255));      
            }
            
            setTimeout(() => {
            //ButtonsHelper.instance.setInputActive(this.changeScreenNode, true);
                
                
            }, 90);
    }
    public changeScene(){
        // ButtonsHelper.instance.setInputActive(this.changeSceneNode, false);
         if(SceneController.instance){
             SceneController.instance.changeScene('nextScene');      
            }     
            setTimeout(() => {
            //ButtonsHelper.instance.setInputActive(this.changeSceneNode, true);
                
                
            }, 1000);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
