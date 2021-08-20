
import { _decorator, Component, Node, SystemEventType, Button, Sprite, Color, tween, Vec3 } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { DataController } from './DataController';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('LevelSelector')
export class LevelSelector extends Component {

    @property([Node])
    levelContainer : Node[] = [];

    @property([Button])
    levelButton : Button[] = [];

    @property([Button])
    lockedButtons : Button[] = [];

    blockedSpriteNode: Node[] = [];

    @property(Node)
    rightBtn : Node;

    @property(Node)
    leftBtn : Node;

    levelContainerIndex : number = 0
    
    onLoad(){
        this.levelContainer[0].active = true;
        this.levelContainer[1].active = false;
        this.levelContainer[2].active = false;
        this.leftBtn.active = false;
        this.rightBtn.active = true;
    }

    start(){

        this.leftBtn.on(SystemEventType.TOUCH_START, this.clickLeftButton, this);
        this.rightBtn.on(SystemEventType.TOUCH_START, this.clickRightButton, this);
        if(ButtonsHelper.instance){
        //     ButtonsHelper.instance.setEventFunction(this.leftBtn, () =>{
        //     this.clickLeftButton();
        //     console.log("Left");
        // }, this);
        //     ButtonsHelper.instance.setEventFunction(this.rightBtn, () =>{
        //     this.clickRightButton();
        //     console.log("Right");
        // }, this);

        for(let i = 0; i < this.levelButton.length; i++){
            ButtonsHelper.instance.setEventFunction(this.levelButton[i].node, () =>{
                    var levelIndex = Number(i);
                    if(DataController.instance.checkIfLevelIsBlocked(levelIndex)){
                        console.log("This level is blocked.");
                    }else{
                        DataController.instance.levelIndex = levelIndex;
                        var selectedLevelButton = this.levelButton[levelIndex];
                        selectedLevelButton.interactable = false;
                        if(SceneController.instance){
                            SceneController.instance.changeScene('Tests');
                            this.scheduleOnce(()=>{
                                selectedLevelButton.interactable = true;
                            },1);
                        }else{
                            console.log("Scene Controller dont exist");
                        }
                    }
            console.log("Click Level");
        }, this);
        }
        }

         for(let i = 0; i < this.levelButton.length; i++){
                this.blockedSpriteNode[i] = this.levelButton[i].node.children[0];
        }      
        this.checkBlockedLevels();
    }

    public checkBlockedLevels(){
        for(let i = 0; i < this.levelButton.length; i++){
            if(DataController.instance.checkIfLevelIsBlocked(i)){
                this.blockedSpriteNode[i].active = true;
                this.levelButton[i].interactable = false;
                var levelSprite = this.levelButton[i].node.getComponent(Sprite);
                levelSprite.color =  new Color(188, 188, 188, 255);                  
            }else{
                this.blockedSpriteNode[i].active = false;      
                this.levelButton[i].interactable = true;                  
            }
        }
    }
    
    clickRightButton(){
        this.playTurningPageAudioSource();
        setTimeout(()=>{
            if(!this.leftBtn.active){
                this.leftBtn.active = true;
            }
            if(this.levelContainerIndex === 0){
                this.levelContainer[0].active = false;
                this.levelContainer[1].active = true;
                this.levelContainer[2].active = false;
            } else if(this.levelContainerIndex === 1)
            {
                this.levelContainer[0].active = false;
                this.levelContainer[1].active = false;
                this.levelContainer[2].active = true;   
                this.rightBtn.active = false;
            }
            this.levelContainerIndex++;
        }, 80);

    }
    
    clickLeftButton(){
        this.playTurningPageAudioSource();
        setTimeout(()=>{
            if(!this.rightBtn.active){
                this.rightBtn.active = true;
            }
            if(this.levelContainerIndex === 1){
                this.levelContainer[0].active = true;
                this.levelContainer[1].active = false;
                this.levelContainer[2].active = false;
                this.leftBtn.active = false;
            } else if(this.levelContainerIndex === 2)
            {
                this.levelContainer[0].active = false;
                this.levelContainer[1].active = true;
                this.levelContainer[2].active = false;   
            }
            this.levelContainerIndex--;
        }, 80);

    }

    //colocar o index do som de troca de paginas
    playTurningPageAudioSource(){
        if(AudioController.instance){            
            AudioController.instance.playAudioSource(0);
        }else{
            console.log("Audio Controller dont exist.");
        }
    }

    playLockedLevelAudioSource(event, customEventData){
        var self = this;
        let index = parseInt(customEventData);

        tween(self.lockedButtons[index].node.children[0]).to(0.15, {
            eulerAngles: new Vec3(0,0, 17) 
        }, {
            easing: "bounceInOut",
            onStart: ()=> {
                // self.lockedButtons[index].interactable = false;

                if(AudioController.instance){            
                    AudioController.instance.playAudioSource(5);
                }else{
                    console.log("Audio Controller dont exist.");
                }
            },
            onComplete: ()=> {
                tween(self.lockedButtons[index].node.children[0]).to(0.125, {
                    eulerAngles: new Vec3(0,0, -8) 
                }, {
                    easing: 'bounceInOut',
                    onStart: ()=> {
                    },
                    onComplete: ()=> {
                        tween(self.lockedButtons[index].node.children[0]).to(0.125, {
                            eulerAngles: new Vec3(0,0, 3) 
                        }, {
                            easing: "bounceInOut",
                            onStart: ()=> {
                            },
                            onComplete: ()=> {
                                tween(self.lockedButtons[index].node.children[0]).to(0.1, {
                                    eulerAngles: new Vec3(0,0, 0) 
                                }, {
                                    easing: "bounceInOut",
                                    onStart: ()=> {
                                    },
                                    onComplete: ()=> {
                                        self.lockedButtons[index].interactable = true;
                                    }
                                }).start();
                            }
                        }).start();
                    }
                }).start();
            }
        }).start();
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
