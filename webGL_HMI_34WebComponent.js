var WebComponentScriptPath = document.currentScript.src;

class ExperienceBundle extends HTMLElement {

    static get observedAttributes() {
        return ['model'];
    }

    constructor() {
        super();

        //this.shadow = this.attachShadow({mode: 'open'});

        this.loading = 'autoplay';
        this.displayWatermark = true;
        this.displayActionBar = false;
        this.showReferenceAxisSystem = false;
        this.defaultLights = false;
        this.multiViewer = false;
        this.useQualityManager = false;
        this.clearQM = true;
        this.play = true;
        this.transparentBackground = false;
        this.visuOptionsPreset = "";
        this.showProgressBar = true;
        this.progressiveLoading = false;
        this.addProgressBarCallbacks = false;
        this.addExperienceCommunication = true;
        this.splashScreen = '""';
        this.splashscreenImage = "";
        this.waitloading = false;
        this.logoDisplay = "onHover";
        this.ID = "webGL_HMI_34Player";
        this.model = "../../webGL_HMI_34.dsxmb";
        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('id', "player");
        this.debug = ''; //'"debugplayer": true,';
    }

    connectedCallback() {
        var getCurrentScriptPath = function () {
            var path = WebComponentScriptPath.substring(0, WebComponentScriptPath.lastIndexOf('/'));
            return path;
        };

        var isPathAbsolute = function (path) {
            return /^(?:\/|[a-z]+:\/\/)/.test(path);
        }

        let globalSplashscreenDefined = false;
        let parameterSplashscreenDefined = false;

        var attr;
        if (attr = this.getAttribute('loading')) {
            this.loading = attr;
        }
        if (attr = this.getAttribute('play')) {
            this.play = attr;
        }
        if (attr = this.getAttribute('displayWatermark')) {
            this.displayWatermark = attr;
        }
        if (attr = this.getAttribute('showReferenceAxisSystem')) {
            this.showReferenceAxisSystem = attr;
        }
        if (attr = this.getAttribute('defaultLights')) {
            this.defaultLights = attr;
        }
        if (attr = this.getAttribute('multiViewer')) {
            this.multiViewer = attr;
        }
        if (attr = this.getAttribute('showProgressBar')) {
            this.showProgressBar = attr;
        }
        if (attr = this.getAttribute('progressiveLoading')) {
            this.progressiveLoading = attr;
        }
        if (attr = this.getAttribute('addProgressBarCallbacks')) {
            this.addProgressBarCallbacks = attr;
        }
        if (attr = this.getAttribute('addExperienceCommunication')) {
            this.addExperienceCommunication = attr;
        }
        if (attr = this.getAttribute('transparentBackground')) {
            this.transparentBackground = attr;
        }
        if (attr = this.getAttribute('visuOptionsPreset')) {
            this.visuOptionsPreset = attr;
        }
        if (attr = this.getAttribute('splashScreen')) {
            this.splashScreen = attr;
            globalSplashscreenDefined = true;
        }
        if (attr = this.getAttribute('splashscreenImage')) {
            if (isPathAbsolute(attr)) {
                this.splashscreenImage = "<img  width='100%' height='100%' src='" + attr + "'/>";
            } else {
                this.splashscreenImage = "<img  width='100%' height='100%' src='../../" + attr + "'/>";
            }
            parameterSplashscreenDefined = true;
        }
        if (attr = this.getAttribute('waitloading')) {
            this.waitloading = attr;
            parameterSplashscreenDefined = true;
        }
        if (attr = this.getAttribute('logoDisplay')) {
            this.logoDisplay = attr;
            parameterSplashscreenDefined = true;
        }
        if (attr = this.getAttribute('className')) {
            this.iframe.className = attr;
        }

        if (!globalSplashscreenDefined && parameterSplashscreenDefined) {
            let splashScreenJSON = {
                "custom": this.splashscreenImage,
                "waitloading": this.waitloading,
                "logoDisplay": this.logoDisplay
            }
            this.splashScreen = JSON.stringify(splashScreenJSON);
        }

        var input = this.debug + '"input":{"ID":"' + this.ID + '","asset":"' + this.model + '"' + ',"showProgressBar":' + this.showProgressBar + "}";
        var options = '"options":{"loading":"' + this.loading + '"' + ',"addProgressBarCallbacks":' + this.addProgressBarCallbacks + ',"addExperienceCommunication":' + this.addExperienceCommunication +
            ',"playOptions":{"play":' + this.play + ',"transparentBackground":' + this.transparentBackground + ',"visuOptionsPreset":"' + this.visuOptionsPreset + '","progressiveLoading":' + this.progressiveLoading + ',"webComponent":"' + this.localName + '"}' +
            ',"splashscreen":' + this.splashScreen +
            '}';
        var ui = '"ui":{"displayWatermark":' + this.displayWatermark + ',"displayActionBar":' + this.displayActionBar + '}';
        var visu = '"visu":{"showReferenceAxisSystem":' + this.showReferenceAxisSystem +
            ',"defaultLights":' + this.defaultLights +
            ',"multiViewer":' + this.multiViewer +
            ',"useQualityManager":' + this.useQualityManager +
            ',"clearQM":' + this.clearQM + '}';

        var currentPath = getCurrentScriptPath();
        this.iframe.setAttribute('src', currentPath + "/ExperiencePlayer/3DPlayHelper/3DPlaySyndication.html?params=" +
            encodeURI("{" + input + "," + options + ',' + ui + ',' + visu + "}"));

        //this.shadow.appendChild(this.iframe);
        this.appendChild(this.iframe);
    }

    disconnectedCallback() {
        this.removeChild(this.iframe);
    }

    /*attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'model' && oldValue !== newValue) {
        this.model = newValue;
      }
    }*/
}

customElements.define('bundle-3ds-webgl_hmi_34', ExperienceBundle);
