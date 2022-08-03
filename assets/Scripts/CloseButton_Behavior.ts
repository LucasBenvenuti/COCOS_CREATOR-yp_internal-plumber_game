
import { _decorator, Component, Node } from 'cc';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('CloseButtonBehavior')
export class CloseButtonBehavior extends Component {

    returnToPlatform()
    {
        var self = this;
        if(!SceneController.instance)
            return;
            
        SceneController.instance.sceneAnimation.play("fadeInScene");
        SceneController.instance.enabled = true;

        self.scheduleOnce(()=>{
            window.location.href = "https://jogos.agrinhoms.com.br/plataforma/index.html";
        }, 0.6);
    }

}
