
import { _decorator, Component, Node } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { DataController } from './DataController';
import { FeedbackController } from './FeedbackController';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    // [1]
    // dummy = '';

    @property(Node)
    backNode: Node;

    @property(Node)
    winNode: Node;

    @property(Node)
    loseNode: Node;

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
            ButtonsHelper.instance.setEventFunction(this.winNode, () =>{ 
                if(DataController.instance.levelIndex != DataController.instance.maxLevelIndex){
                    this.feedBackController.playerWin();
                } else{
                    this.feedBackController.playerFinishGame();
                }
        }, this);
        ButtonsHelper.instance.setEventFunction(this.loseNode, () =>{  
            this.feedBackController.playerLose();
        }, this);
        ButtonsHelper.instance.setEventFunction(this.backNode, () =>{  
          if(SceneController.instance){
              if(DataController.instance){
                  DataController.instance.returningFromDefaultScene = true;
                  SceneController.instance.changeScene('sampleScene');
              }
          }else{
              console.log("Scene Controller doesnt exist");
          }
        }, this);
    }
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
