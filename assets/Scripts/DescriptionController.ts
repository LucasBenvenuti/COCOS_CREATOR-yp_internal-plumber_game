
import { _decorator, Component, Node, PageView, AnimationComponent, CCInteger, RichText, Button, find, SystemEventType } from 'cc';
import { AudioController } from './AudioController';
import { ButtonsHelper } from './ButtonsHelper';
const { ccclass, property } = _decorator;

@ccclass('DescriptionController')
export class DescriptionController extends Component {

    openButtonNode: Node;
    openButton: Button;
    
    closeButtonNode: Node;
    closeButton: Button;
    
    descriptionAnimation: AnimationComponent;

    onLoad(){
        this.descriptionAnimation = this.node.getComponent(AnimationComponent);

        this.openButtonNode = find("Canvas/DefaultMenu/MenuDropdownContainer/Cont/DescriptionButton");
        this.closeButtonNode = find("Canvas/DescriptionContainer/CloseDescriptionButton");
    }

    start(){
        if(ButtonsHelper.instance){
            ButtonsHelper.instance.setEventFunction(this.openButtonNode, () =>{
            this.showDescription();
        }, this)
        ButtonsHelper.instance.setEventFunction(this.closeButtonNode, () =>{
            this.hideDescription();
        }, this)
    }
    this.node.active = false;
    
    }
    
    hideDescription(){
        setTimeout(()=>{
            var self = this;
            this.closeButtonNode.pauseSystemEvents(true);
            self.closeButton = self.closeButtonNode.getComponent(Button);
            self.closeButton.interactable = false;
            self.descriptionAnimation.play('hideTutorial');
            self.scheduleOnce(() =>{
                self.node.active = false;
                this.openButtonNode.resumeSystemEvents(true);
                self.closeButton.interactable = true;
            }, 0.5);
        },80);
    }
    
    showDescription(){
        console.log("show");
        setTimeout(() => {
            var self =  this;
            self.openButtonNode.pauseSystemEvents(true);
            self.openButton = self.openButtonNode.getComponent(Button);
            self.openButton.interactable = false;
            self.node.active = true;
            self.descriptionAnimation.play('showTutorial');
            self.scheduleOnce(() =>{
                self.openButton.interactable = true;     
                self.closeButtonNode.resumeSystemEvents(true);
            }, 0.5);
        }, 80);
    }




     
}


