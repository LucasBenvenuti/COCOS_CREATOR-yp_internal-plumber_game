
import { _decorator, Component, Node, PageView, AnimationComponent, CCInteger, RichText, Button, find, SystemEventType, Label } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
const { ccclass, property } = _decorator;

@ccclass('TutorialController')
export class TutorialController extends Component {

    @property(PageView)
    pageView: PageView;

    @property(Node)
    rightButton: Node;
        
    @property(Node)
    leftButton: Node;


    openButtonNode: Node;
    openButton: Button;
    
    closeButtonNode: Node;
    closeButton: Button;
    
    soundOnButtonNode: Node;
    soundOnButton: Button;

    soundOffButtonNode: Node;
    soundOffButton: Button;


    pageIndexTextNode: Node;
    pageIndexText: Label;
    
    lastPageIndex: number;
    currentPageIndex: number;
    tutorialAnimation: AnimationComponent;

    onLoad(){
        this.tutorialAnimation = this.node.getComponent(AnimationComponent);
        this.pageIndexTextNode = find("Canvas/TutorialContainer/TutorialArea/PageIndexText");
        this.closeButtonNode = find("Canvas/TutorialContainer/CloseTutorialButton");
        this.openButtonNode = find("Canvas/DefaultMenu/MenuDropdownContainer/Cont/TutorialButton");
        console.log(this.openButtonNode);
        this.pageIndexText = this.pageIndexTextNode.getComponent(Label);
        this.leftButton.active = false;
        this.rightButton.active = true;
        this.currentPageIndex = 0;
    }
    
    start(){
    //     if(ButtonsHelper.instance){
    //         ButtonsHelper.instance.setEventFunction(this.openButtonNode, () =>{
    //         this.showTutorial();
    //     }, this)
    //     ButtonsHelper.instance.setEventFunction(this.closeButtonNode, () =>{
    //         this.hideTutorial();
    //     }, this)
    //     ButtonsHelper.instance.setEventFunction(this.rightButton, () =>{
    //         this.scrollToRight();
    //     }, this)
    //     ButtonsHelper.instance.setEventFunction(this.leftButton, () =>{
    //         this.scrollToLeft();
    //     }, this)
    // }
    this.node.active = false;
    }

    scrollToRight(){
            if(!this.leftButton.active){
                this.leftButton.active = true;
            }
            this.lastPageIndex = this.pageView.getPages().length - 1;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if(this.currentPageIndex != this.lastPageIndex){
                if(this.currentPageIndex + 1 === this.lastPageIndex){
                    this.rightButton.active = false;
                }
                this.pageView.scrollToPage(this.currentPageIndex + 1, 0.5);
                this.updatePageIndexText();
            }else{
                console.log("You are on the last page of tutorial, cant scroll to right!");
            }
            this.rightButton.resumeSystemEvents(true);

    }
    
    scrollToLeft(){
            if(!this.rightButton.active){
                this.rightButton.active = true;
            }
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if(this.currentPageIndex != 0){
                if(this.currentPageIndex - 1 === 0){
                    this.leftButton.active = false;
                }
                this.pageView.scrollToPage(this.currentPageIndex - 1, 0.5);
                this.updatePageIndexText();
            }else{
                console.log("You are on the first page of tutorial, cant scroll to left!");
            }
            this.leftButton.resumeSystemEvents(true);
    }
    
    hideTutorial(){
            var self = this;
            console.log("Deu Hide");
            this.closeButtonNode.pauseSystemEvents(true);
            self.closeButton = self.closeButtonNode.getComponent(Button);
            self.closeButton.interactable = false;
            self.tutorialAnimation.play('hideTutorial');
            self.scheduleOnce(() =>{
                self.node.active = false;
                self.resetTutorial();
                this.openButtonNode.resumeSystemEvents(true);
                self.closeButton.interactable = true;
            }, 0.5);

    }
    
    showTutorial(){
        console.log("show");
        setTimeout(() => {
            var self =  this;
            self.openButtonNode.pauseSystemEvents(true);
            self.openButton = self.openButtonNode.getComponent(Button);
            self.openButton.interactable = false;
            self.node.active = true;
            self.tutorialAnimation.play('showTutorial');
            self.scheduleOnce(() =>{
                self.openButton.interactable = true;     
                self.closeButtonNode.resumeSystemEvents(true);
            }, 0.5);
        }, 80);
    }

    resetTutorial(){
        this.leftButton.active = false;
        this.rightButton.active = true;
        this.pageView.scrollToPage(0, 0.5);
        this.updatePageIndexText();  
    }

    updatePageIndexText(){
        var lastIndex = this.pageView.getPages().length;
        var currentIndex = this.pageView.getCurrentPageIndex() + 1;
        this.pageIndexText.string =  currentIndex.toString() + "/" + lastIndex.toString();;
    }

    playButtonsAudioSource(){
        if(AudioController.instance){            
            AudioController.instance.playButtonSound();
        }else{
            console.log("Audio Controller dont exist.");
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
