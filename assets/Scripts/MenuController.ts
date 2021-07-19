
import { _decorator, Component, Node, Color } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { DataController } from './DataController';
import { MenuToggleBehavior } from './MenuToggle_Behaviour';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
  @property(Node)
  defaultMenuPlayButton: Node;

  @property(Node)
  closeButtonNode: Node;

  @property(Node)
  defaultMenu: Node;

  @property(Node)
  levelSelector: Node;

  
  @property(Node)
  soundContainer: Node;

    start(){
        if(SceneController.instance){
            SceneController.instance.startScene();
        }else{
            console.log("Scene Controller doenst exist");
        }
        if(AudioController.instance){
            AudioController.instance.startGameSound();
        }else{
            console.log("Audio Controller doenst exist");
        }
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setButtonsScaleAnim(0.08, 0.75);
            ButtonsHelper.instance.setEventFunction(this.defaultMenuPlayButton, () =>{
                this.showLevelSelector();
            }, this)
            ButtonsHelper.instance.setEventFunction(this.closeButtonNode, () =>{
                this.showMenu();
            }, this)
        }else{
            console.log("Buttons helper doenst exist");
        }
        if(!DataController.instance.returningFromDefaultScene){
            this.levelSelector.active = false;
            this.soundContainer.active = false;
        }else{
            this.levelSelector.active = true;
            this.soundContainer.active = true;
        }
    }

    public showLevelSelector(){
        if(SceneController.instance){
            SceneController.instance.changeScreenWithColor(new Color(255,255,255,255));
            MenuToggleBehavior.instance.forceMenuCloseTime();
            setTimeout(() => {
                this.defaultMenu.active = false;
                this.soundContainer.active = true;
                this.levelSelector.active = true;
            }, 500);
        }
    }

    public showMenu(){
        if(SceneController.instance){
            SceneController.instance.changeScreenWithColor(new Color(0,0,0,255));
            setTimeout(() => {
                this.defaultMenu.active = true;
                this.soundContainer.active = false;
                this.levelSelector.active = false;
            }, 500);
        }
    }
}



