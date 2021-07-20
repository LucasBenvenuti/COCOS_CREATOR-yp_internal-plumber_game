
import { _decorator, Component, Node, Label, Sprite, SpriteFrame, AnimationComponent, game, Scene, director, CCString } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
import { DataController } from './DataController';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('FeedbackController')
export class FeedbackController extends Component {
    @property(Label)
    feedbackBalloonText: Label;
    
    @property(Label)
    feedbackTitleText: Label;

    @property(Label)
    feedbackContentText: Label;

    @property(Node)
    feedbackContainer: Node;

    @property(Node)
    feedbackNextButton: Node;

    @property(Node)
    feedbackResetButton: Node;
    
    @property(Node)
    feedbackBackButton: Node;
    
    @property(Sprite)
    feedbackSmileSprite: Sprite;

    @property([SpriteFrame])
    feedbackSmileSpriteFrame: SpriteFrame[] = [];

    @property(Node)
    starsContainer: Node;

    @property(CCString)
    menuSceneString: string;

    @property(CCString)
    restartSceneString: string;

    @property(CCString)
    nextSceneString: string;

    start(){
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setEventFunction(this.feedbackBackButton, ()=>{
                this.goToMenuScene();
            }, this)
            ButtonsHelper.instance.setEventFunction(this.feedbackNextButton, ()=>{
                this.goToNextLevel();
            }, this)
            ButtonsHelper.instance.setEventFunction(this.feedbackResetButton, ()=>{
                this.resetScene();
            }, this)
        }


        this.node.active = false;
    }


    public playerWin(){
        var self = this;
        if(DataController.instance){
            var nextIndex = DataController.instance.levelIndex + 1;
            console.log(nextIndex);
            DataController.instance.unblockLevel(nextIndex);
        }else{
            console.log("Data controller doesnt exist");
        }

        DataController.instance.timeIsRunning = false;

        self.feedbackTitleText.string = "Parabéns!";
        self.feedbackContentText.string = "Você encontrou o caminho.";
        self.feedbackBalloonText.string = "Show!";
        self.feedbackSmileSprite.spriteFrame = this.feedbackSmileSpriteFrame[0];
        self.starsContainer.active = true;
        var animation = self.feedbackContainer.getComponent(AnimationComponent);
        self.node.active = true;
        animation.play('fadeInScene');

        AudioController.instance.stopLowSecTimer();
        AudioController.instance.playWinSound();
    }
    
    public playerLose(){
        var self = this;

        DataController.instance.timeIsRunning = false;

        self.feedbackNextButton.active = false;
        self.starsContainer.active = false;
        self.feedbackTitleText.string = "Que pena!";
        self.feedbackContentText.string = "Dessa vez não deu, mas não desista.";
        self.feedbackBalloonText.string = "Oh não!";
        self.feedbackSmileSprite.spriteFrame = this.feedbackSmileSpriteFrame[2];
        var animation = self.node.getComponent(AnimationComponent);
        self.node.active = true;
        animation.play('fadeInScene');

        AudioController.instance.stopLowSecTimer();
        AudioController.instance.playAudioSource(2);
    }
    
    public playerFinishGame(){
        var self = this;
        self.feedbackNextButton.active = false;
        self.starsContainer.active = true;
        self.feedbackTitleText.string = "Parabéns!";
        self.feedbackContentText.string = "Você terminou todas as fases.";
        self.feedbackBalloonText.string = "Incrível!";
        self.feedbackSmileSprite.spriteFrame = this.feedbackSmileSpriteFrame[1];
        var animation = self.node.getComponent(AnimationComponent);
        self.node.active = true;
        animation.play('fadeInScene');

        AudioController.instance.stopLowSecTimer();
        AudioController.instance.playWinSound();
    }

    public goToMenuScene(){
        console.log("Back BTN");
        if(SceneController.instance){
            if(DataController.instance){
                  DataController.instance.returningFromDefaultScene = true;
            }
            SceneController.instance.changeScene(this.menuSceneString);
        }else{
            console.log("Scene Controller Doest exist!");
        }
    }
    
    public goToNextLevel(){
        console.log("Next BTN");
        if(SceneController.instance){
            if(DataController.instance){
                DataController.instance.levelIndex++;
            }else{
                console.log("Data controller doesnt exist");
            }
            SceneController.instance.changeScene(this.nextSceneString);
        }else{
            console.log("Scene Controller Doest exist!");
        }
    }
    
    public resetScene(){
        console.log("Reset BTN");
        if(SceneController.instance){
            SceneController.instance.changeScene(this.restartSceneString);
        }else{
            console.log("Scene Controller Doest exist!");
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
