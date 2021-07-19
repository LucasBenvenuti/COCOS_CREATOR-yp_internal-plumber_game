
import { _decorator, Component, Node } from 'cc';
import { PlumberGameController } from './PlumberGameController';
const { ccclass, property } = _decorator;

@ccclass('PlumberLevelController')
export class PlumberLevelController extends Component {
    
    @property(PlumberGameController)
    levelList: PlumberGameController[] = [];

    @property(Number)
    currentLevel: number = 0;

    onLoad() {
        var self = this;

        self.levelList[self.currentLevel].node.active = true;
    }

    startCurrent_timerGoesZero_LevelPlumber() {
        var self = this;

        self.levelList[self.currentLevel].startPlumberWhenTimerGoesZero();
    }

    startCurrent_goButton_LevelPlumber() {
        var self = this;

        self.levelList[self.currentLevel].startPlumberWithGoButton();
    }
}