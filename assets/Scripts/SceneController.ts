import {
    _decorator,
    Component,
    Node,
    game,
    Sprite,
    CCFloat,
    Color,
    tween,
    easing,
    director,
    Vec3,
    AnimationComponent,
    find,
    color,
    BlockInputEvents,
} from "cc";
import { AudioController } from "./AudioController";
const { ccclass, property } = _decorator;

@ccclass("SceneController")
export class SceneController extends Component {
    public static instance: SceneController = null;

    @property(Sprite)
    fadeSprite: Sprite = null!;

    @property(AnimationComponent)
    sceneAnimation: AnimationComponent;

    @property(BlockInputEvents)
    blockInputEvents: BlockInputEvents;

    @property(String)
    preloadSceneName: string = "";

    onLoad() {
        var self = this;

        if (
            SceneController.instance != null &&
            SceneController.instance != self
        ) {
            self.destroy();
        } else {
            SceneController.instance = self;
            game.addPersistRootNode(self.node);
        }
        self.blockInputEvents.enabled = true;

        //PUT HERE GAME SCENE NAME
        director.preloadScene(self.preloadSceneName, function () {
            console.log(self.preloadSceneName + ' scene Preloaded!');
        });

        //se tiver troca de cena é necessário ter um fade screen canvas e fazer o find antes de usar o animation
        //self.sceneAnimation =
          //  find("FadeSceneCanvas").getComponent(AnimationComponent);
        //self.fadeSprite = self.sceneAnimation.node.getComponentInChildren(Sprite);
    }

    public startScene() {
        var self = this;
        console.log("Start Scene");
        self.sceneAnimation = find("FadeSceneCanvas").getComponent(AnimationComponent);
        self.blockInputEvents = find("FadeSceneCanvas").getComponentInChildren(BlockInputEvents);
        self.sceneAnimation.play("fadeOutScene");
        self.blockInputEvents.enabled = false;
    }
    
    public changeScene(sceneName: string) {
        var self = this;

        AudioController.instance.endSceneSound();

        self.sceneAnimation= find("FadeSceneCanvas").getComponent(AnimationComponent);
        self.blockInputEvents = find("FadeSceneCanvas").getComponentInChildren(BlockInputEvents);
        self.sceneAnimation.play("fadeInScene");
        self.blockInputEvents.enabled = true;
        AudioController.instance.endSceneSound();
        self.scheduleOnce(() => {
            director.loadScene(sceneName, () => {
                self.sceneAnimation = find("FadeSceneCanvas").getComponent(AnimationComponent);
                self.blockInputEvents = find("FadeSceneCanvas").getComponentInChildren(BlockInputEvents);
                self.blockInputEvents.enabled = false;
            });
        }, 1);
    }

    //para transições que não precisam de mudança de cena, com a variavel cor para a transição
    public changeScreenWithColor(color: Color) {
        var self = this;
        self.sceneAnimation= find("FadeSceneCanvas").getComponent(AnimationComponent);
        self.blockInputEvents = find("FadeSceneCanvas").getComponentInChildren(BlockInputEvents);
        self.fadeSprite = self.sceneAnimation.getComponentInChildren(Sprite);
        self.fadeSprite.color = color;
        self.sceneAnimation.play("fadeInScene");
        self.blockInputEvents.enabled = true;
        self.scheduleOnce(() => {
            self.sceneAnimation.play("fadeOutScene");
            self.scheduleOnce(() => {
                self.fadeSprite.color = new Color(0, 0, 0, 255);
                        self.blockInputEvents.enabled = false;
            }, 0.6);
        }, 1);
    }
    
    //para transições que não precisam de mudança de cena
    public changeScreen() {
        var self = this;
        self.sceneAnimation= find("FadeSceneCanvas").getComponent(AnimationComponent);
        self.blockInputEvents = find("FadeSceneCanvas").getComponentInChildren(BlockInputEvents);
        self.sceneAnimation.play("fadeInScene");
        self.blockInputEvents.enabled = true;
        self.scheduleOnce(() => {
            self.sceneAnimation.play("fadeOutScene");
                self.blockInputEvents.enabled = false;
        }, 0.5);
    }
}
