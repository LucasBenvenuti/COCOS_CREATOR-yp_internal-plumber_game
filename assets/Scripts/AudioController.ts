
import { _decorator, Component, Node, game, CCFloat, AudioSource, tween, Tween, TweenSystem, find, Button, SystemEventType, Sprite, System, RichText, RichTextComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {

    public static instance : AudioController =  null;
    public static soundOn : boolean =  true;

    @property([CCFloat])
    volumes: number[] = [];

    @property([AudioSource])
    audioSources: AudioSource[] = [];

    @property(AudioSource)
    buttonsAudioSource: AudioSource;

    @property(CCFloat)
    buttonsVolume: number;

    @property(AudioSource)
    backgroundAudioSource: AudioSource;

    @property(AudioSource)
    lowSecRateSound: AudioSource;

    @property(AudioSource)
    winSound: AudioSource;

    @property(CCFloat)
    backgroundVolume: number;

    @property(CCFloat)
    lowSecRateVolume: number;

    @property(CCFloat)
    winSoundVolume: number;

    currentTimeBgAudio: number = 0;
    soundOnNode: Node; 
    soundOffNode: Node; 
    soundOnNodeDefaultMenu: Node; 
    soundOffNodeDefaultMenu: Node;
        currentBackgroundVolume: number = 0; 

    onLoad(){
        if(AudioController.instance != null && AudioController.instance != this){
            this.destroy();
        }else{
            AudioController.instance = this;
            game.addPersistRootNode(this.node);
        }
    }

    start(){
        
    }

    public startGameSound(){
        this.findSoundButtonsNode()
        if(AudioController.soundOn){
            for(let i = 0; i < this.audioSources.length; i++){
                  this.audioSources[i].volume = this.volumes[i];
              }

             this.schedule(this.scheduleFunction, 1 / 100);
              this.buttonsAudioSource.volume = this.buttonsVolume;
              this.lowSecRateSound.volume = this.lowSecRateVolume;
              this.winSound.volume = this.winSoundVolume;
            }else{
                for(let i = 0; i < this.audioSources.length; i++){
                    this.audioSources[i].volume = 0;
                }
                this.buttonsAudioSource.volume = 0;
                this.backgroundAudioSource.volume = 0;
                this.lowSecRateSound.volume = 0;
                this.winSound.volume = 0;
            }
            //this.backgroundAudioSource.currentTime = 0;
            if(!this.backgroundAudioSource.playing){
                this.backgroundAudioSource.currentTime = this.currentTimeBgAudio;
                this.backgroundAudioSource.play();
            }
            this.setButtonsSound();
        }
        
        public toggleGameSound(){
            if(AudioController.soundOn){
                for(let i = 0; i < this.audioSources.length; i++){
                    this.audioSources[i].volume = 0;
                }
                this.buttonsAudioSource.volume = 0;
                this.backgroundAudioSource.volume = 0;
                this.lowSecRateSound.volume = 0;
                this.winSound.volume = 0;
                AudioController.soundOn = false;
            }else{
                for(let i = 0; i < this.audioSources.length; i++){
                    this.audioSources[i].volume = this.volumes[i];
                }
                this.buttonsAudioSource.volume = this.buttonsVolume;
                this.backgroundAudioSource.volume = this.backgroundVolume;
                this.lowSecRateSound.volume = this.lowSecRateVolume;
                this.winSound.volume = this.winSoundVolume;
                AudioController.soundOn = true;
        }
        this.toggleSoundIcons();
    }

    public playButtonSound(){
        if(this.buttonsAudioSource){
            this.buttonsAudioSource.playOneShot(this.buttonsAudioSource.clip);
        }else{
            console.log("Button Audio Source dont exist");
        }
    }

    public playAudioSource(index: number){
        if(this.audioSources[index]){
            this.audioSources[index].playOneShot(this.audioSources[index].clip);
        }else{
            console.log("audiosource" + index + " dont exist");
        }
    }

    public playLowSecTimer(){
        if(this.lowSecRateSound){
            this.lowSecRateSound.play();
        }else{
            console.log("Low sec rate audiosource dont exist");
        }
    }

    public stopLowSecTimer(){
        if(this.lowSecRateSound){
            this.lowSecRateSound.stop();
        }else{
            console.log("Low sec rate audiosource dont exist");
        }
    }

    public playWinSound(){
        if(this.winSound){
            this.winSound.play();
        }else{
            console.log("Low sec rate audiosource dont exist");
        }
    }

    public endSceneSound(){
        this.currentTimeBgAudio =  this.backgroundAudioSource.currentTime;
    }



    public setButtonsSound(){
        find("Canvas")
            ?.getComponentsInChildren(Button)
            .forEach((btn) => {
                btn.node.on(
                    SystemEventType.TOUCH_START,()=>{
                        if(btn.interactable){
                            if(btn.name.includes('LevelSelector')){
                                return;
                            }else{
                                this.playButtonSound();
                            }
                        }
                        
                    },
                    this
                );
            });
    }

    public findSoundButtonsNode(){
        this.soundOffNode = find("Canvas/SoundContainer/SoundOffButton");
        this.soundOnNode = find("Canvas/SoundContainer/SoundOnButton");
        this.soundOnNodeDefaultMenu = find("Canvas/DefaultMenu/MenuDropdownContainer/Cont/SoundContainer/SoundOnButton");
        this.soundOffNodeDefaultMenu = find("Canvas/DefaultMenu/MenuDropdownContainer/Cont/SoundContainer/SoundOffButton");
        this.startSoundIcons();
        this.setToggleFunction();
        
    }

    public startSoundIcons(){
        if(AudioController.soundOn){
            this.soundOnNode.active = true;
            this.soundOffNode.active = false;
            if(this.soundOffNodeDefaultMenu != null){
                this.soundOffNodeDefaultMenu.active = false;
            }
            if(this.soundOnNodeDefaultMenu != null){
                this.soundOnNodeDefaultMenu.active = true;
            }
        }else{            
            this.soundOnNode.active = false;
            this.soundOffNode.active = true;
            if(this.soundOffNodeDefaultMenu != null){
                this.soundOffNodeDefaultMenu.active = true;
            }
            if(this.soundOnNodeDefaultMenu != null){
                this.soundOnNodeDefaultMenu.active = false;
            }
        }
    }

    public toggleSoundIcons(){
        this.soundOffNode.active = !this.soundOffNode.active;
        this.soundOnNode.active = !this.soundOnNode.active;
         if(this.soundOffNodeDefaultMenu != null){
            this.soundOffNodeDefaultMenu.active = !this.soundOffNodeDefaultMenu.active;
        }
        if(this.soundOnNodeDefaultMenu != null){
             this.soundOnNodeDefaultMenu.active = !this.soundOnNodeDefaultMenu.active;
        }
    }

    public setToggleFunction(){
        this.soundOffNode.on(SystemEventType.TOUCH_START, this.toggleGameSound, this);
        this.soundOnNode.on(SystemEventType.TOUCH_START, this.toggleGameSound, this);
        if(this.soundOffNodeDefaultMenu != null){
            this.soundOffNodeDefaultMenu.on(SystemEventType.TOUCH_START, this.toggleGameSound, this);
        }
        if(this.soundOnNodeDefaultMenu != null){
            this.soundOnNodeDefaultMenu.on(SystemEventType.TOUCH_START, this.toggleGameSound, this);
        }
    
    }

        public scheduleFunction()
    {
        var self = this;

        self.addBackgroundVolume(0.00035);
    }

    public addBackgroundVolume(t: number)
    {
        var self = this;
        self.currentBackgroundVolume = self.currentBackgroundVolume + t;

        if(AudioController.soundOn)
        {
            this.backgroundAudioSource.volume = self.currentBackgroundVolume;
        }

        if(self.currentBackgroundVolume >= self.backgroundVolume)
        {
            self.unschedule(self.scheduleFunction);
        }
    }
}


