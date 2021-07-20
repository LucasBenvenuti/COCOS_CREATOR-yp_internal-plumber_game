
import { _decorator, Component, Node } from 'cc';
import { AudioController } from './AudioController';
import { DataController } from './DataController';
import { PlumberGameController } from './PlumberGameController';
import { SceneController } from './SceneController';
const { ccclass, property } = _decorator;

@ccclass('PlumberLevelController')
export class PlumberLevelController extends Component {
    
    @property(PlumberGameController)
    levelList: PlumberGameController[] = [];

    @property(Number)
    currentLevel: number = 0;

    onLoad() {
        var self = this;

        self.levelList[DataController.instance.levelIndex].node.active = true;
        //PlumberGameController.instance = self.levelList[DataController.instance.levelIndex];

        
        //console.log(PlumberGameController.instance);
    }

    start(){
        console.log("start exist");
        SceneController.instance.startScene();
        AudioController.instance.startGameSound();
     
    }

    startCurrent_timerGoesZero_LevelPlumber() {
        var self = this;

        self.levelList[DataController.instance.levelIndex].startPlumberWhenTimerGoesZero();
    }

    startCurrent_goButton_LevelPlumber() {
        var self = this;

        self.levelList[DataController.instance.levelIndex].startPlumberWithGoButton();
    }
}