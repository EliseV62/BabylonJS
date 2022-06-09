// Player
//

'use strict';

//
class Player {

    //
    constructor(id) {
        this._startLoadingTime;
        this.id = id;

        this.modelToLoad = {};
        this.playerDiv = null;

        this._launchInPlayMode = true;
        this._autoLoad = true;

        this.visuOptions = false;
        this.visu = this._initDefaultVisuOptions();

        this.experienceData = {};
        this._initExperienceData();

        this._experienceCommunication = new ExperienceCommunication(this.id);

        this.onLoadBinded = this.onLoad.bind(this);
        this.subscribeOnLoad(this.onLoadBinded);

        this.ExperienceReadyBinded = this.ExperienceReady.bind(this);
        this.subscribeExperienceReady(this.ExperienceReadyBinded);
    }

    //
    _initExperienceData() {
        this.experienceData._type = "";
        this.experienceData._isPlayActif = false;
        this.experienceData._isPaused = false;
    }

    //
    _initParamsObject(id, pathModel, customSplashscreen) {
        if (!customSplashscreen) {
            customSplashscreen = "";
        }
        this.paramsObject = {
            //"debugplayer": true, // Add Automatically callbacks in 3DPlaySyndication.html
            "input": {
                "ID": id,
                // Default loaded file
                "asset": pathModel,
                "showProgressBar": true
            },
            "options": {
                "loading": "autoplay",
                "addProgressBarCallbacks": true,
                "addExperienceCommunication": true,
                "playOptions": {
                    "play": this._launchInPlayMode,
                    /*"progressiveLoading": true,*/
                    "transparentBackground": this.visu.transparentBg
                },
                "splashscreen": customSplashscreen
                //{
                //    "custom": "<div style='width:100% ; height:100%; background-color:lightblue'></</div>",
                //     "waitloading": true,
                //     "logoDisplay": "onOver"
                //}
            },
            "ui": {
                "displayActionBar": false,
                "displayWatermark": true
            },
            "visu": {
                //"hdr": false,
                "useQualityManager": false,
                "clearQM": true,
                "showReferenceAxisSystem": false,
                "defaultLights": this.visu.defaultLights,
                "multiViewer": this.visu.multiViewer
            }
        };
    }

    _initDefaultVisuOptions() {
        let visu = {};
        visu.transparentBg = false;
        visu.preset = "Custom";
        visu.showFPS = false;
        visu.showVisuDebugInfos = false;
        visu.AA = true;
        visu.staticAA = "MSAA"; // MSAA=iterative
        // SSAA is the best choice for dynamic so far but very costly
        visu.dynamicAA = "FXAA"; // "TAA" FPS decrease issue in the time with TAA, so  temporary replace by FXAA
        visu.ssao = true;
        visu.shadow = false; //true; qov:04/16/2021 set to false because very long load time and render issue on "lift" experience
        visu.mirror = false;
        visu.grid = false;
        visu.ground = false;
        visu.groundShadow = false;
        visu.bloom = false;
        visu.oit = false; //true; qov:04/26/2021 set to false by default. Reduces fps, and more particularly on iPad => better to set only when necessary
        visu.triLights = false;
        visu.ssr = false; //qov:2022/01/04 added for debug only
        visu.pixelCulling = 0;
        visu.downsamplingFactor = undefined;
        visu.backFaceCulling = true;
        visu.defaultLights = false;
        visu.multiViewer = false;
        visu.roughnessMapPath = ""; //"../../../../Samples/assets/exterior_scenic_5_rmips.hdr";
        return visu;
    }

    //
    create(pathPlayer, pathModel, transparentBg, customSplashscreen) {
        this.visu.transparentBg = transparentBg;
        this._initParamsObject(this.id, pathModel, customSplashscreen);

        // Model
        this.model = this.getModelName(pathModel);

        // Settings to instantiate the web application
        let playerDiv = document.createElement('iframe');
        playerDiv.classList.add('player');
        this.playerDiv = playerDiv;
        playerDiv.setAttribute('id', this.id);
        playerDiv.allowFullScreen = playerDiv.mozAllowFullScreen = playerDiv.webkitAllowFullScreen = true;
        playerDiv.setAttribute('allowFullScreen', '');

        // Instantiating the web application with all the parameters (webapp + url)

        let params = JSON.stringify(this.paramsObject);
        let src = pathPlayer + "?params=" + encodeURI(params);
        //playerDiv.src = src
        this.modelToLoad.div = playerDiv;
        this.modelToLoad.src = src;

        if (this._autoLoad) {
            this._load();
        }

        return playerDiv;
    }

    //
    createBundle(bundleName, customSplashscreen) {
        let bundle = document.createElement(bundleName);
        bundle.setAttribute('className', 'player');

        if (customSplashscreen) {
            bundle.setAttribute('splashScreen', customSplashscreen);
        }

        let playerDiv = bundle;
        this.playerDiv = bundle;
        playerDiv.allowFullScreen = playerDiv.mozAllowFullScreen = playerDiv.webkitAllowFullScreen = true;
        playerDiv.setAttribute('allowFullScreen', '');

        // Acceptable to measure from that point while the iframe is created just after createBundle (with appendChild(iframe))
        this._startLoadingTime = Date.now();
        performance.mark("EXP_Player_load_start");

        return playerDiv;
    }

    //
    getModelName(pathModel) {
        if (typeof pathModel !== "string") {
            return undefined;
        }

        let model = pathModel;
        let index = model.lastIndexOf('/');
        // Get the filemane
        if (index !== -1 && index < model.length) {
            model = model.substring(index + 1);
        }
        // Remove extension
        index = model.lastIndexOf('.');
        if (index !== -1) {
            model = model.substring(0, index);
        }
        return model;
    }

    //
    _load() {
        this._startLoadingTime = Date.now();
        performance.mark("EXP_Player_load_start");
        if (this.modelToLoad !== undefined) {
            this.modelToLoad.div.src = this.modelToLoad.src;
        } else {
            if (this.onAllReadyCallback) {
                this.onAllReadyCallback();
            }
        }
    }

    //
    onLoad(params) {
        console.log("***** Experience Player ***** : onLoad", params);
    }

    //
    ExperienceReady(params) {
        performance.mark("EXP_Player_ExperienceReady");

        this.canvasId = params.canvasId;

        let type = params.type;
        this._initExperienceLoaded(type);
    }

    //
    setAutoLoad(autoLoad) {
        this._autoLoad = autoLoad;
    }

    //
    setPlayPauseStop(playPauseStop) {
        this.playPauseStop = playPauseStop;
    }

    //
    _initExperienceLoaded(type) {
        this.experienceData._type = type;
        if (type === "2.5D") {
            this._initExperienceLoaded25D();
        } else { // 3D
            this._customizeVisuRender();
            this._initExperienceLoaded3D();
        }
    }

    //
    _sendExperiencePlayReady() {
        performance.mark("EXP_Player_ExperiencePlayReady");

        var event = new Event('ExperiencePlayReady');
        window.dispatchEvent(event);
    }

    // 2.5D
    _initExperienceLoaded25D() {
        if (this._onPlayCB) {
            this._onPlayCB();
        }

        this._sendExperiencePlayReady();
    }

    // 3D
    _initExperienceLoaded3D() {
        if (this._launchInPlayMode) {
            let self = this;
            this.play(function () {

                //
                self._sendExperiencePlayReady();

                self.experienceData._isPlayActif = true;
                self.experienceData._isPaused = false;
                if (self._statusNode) {
                    self._statusNode.textContent = "Status: Play";
                    if (self.version) {
                        self._statusNode.textContent += " / " + getVersionStr(self);
                    }
                }
            });
        }
    }

    // Customize Visu Render
    _customizeVisuRender() {
        this.setTransparentBackground(this.visu.transparentBg);
        if (this.visu.AA) {
            this.setAntiAliasing(this.visu.staticAA, "static");
            this.setAntiAliasing(this.visu.dynamicAA, "dynamic");
        } else {
            this.setAntiAliasing("NoAA");
        }
        this.setOIT(this.visu.oit);
        this.setMirror(this.visu.mirror);
        this.setSSAO(this.visu.ssao);
        this.setShadow(this.visu.shadow);
        this.setGroundShadow(this.visu.groundShadow);
        this.setBloom(this.visu.bloom);
        //this.setPixelCulling(this.visu.pixelCulling);

        let mobile = navigator.userAgent.match(/(Android|iPhone|iPad)/i) ? true : false;
        if (mobile) {
            if (this.visu.roughnessMapPath !== "") {
                this.setRoughnessMap(this.visu.roughnessMapPath);
            }
        }
    }

    // TODO: Move to inherited player class
    stopAndLoad(iPath) {

        // TODO: move to Inspector with new event 'ExperienceLoad'
        // Clear inspector
        if (this._inspectorPanel) {
            //
            if (this._inspectorPanel._inspector) {
                this._inspectorPanel._inspector.stopUpdateManager();
            }
            //
            if (this._inspectorPanel.panels) {
                Object.keys(this._inspectorPanel.panels).forEach(panelTitle => {
                    this._inspectorPanel.panels[panelTitle].innerHTML = "";
                });
            }
        }

        if (this.experienceData._type === "2.5D") {
            this.load(iPath, this.paramsObject.options);
        } else {
            // Stop play of 3D experience
            if (this.experienceData._isPlayActif || this.experienceData._isPaused) {
                let self = this;
                this.stop(function () {
                    if (self._statusNode) {
                        self._statusNode.textContent = "Status: Stop";
                        if (self.version) {
                            self._statusNode.textContent += " / " + getVersionStr(self);
                        }
                    }
                    self.load(iPath, self.paramsObject.options);
                });
            } else {
                this.load(iPath, this.paramsObject.options);
            }
        }
    }

    //-----------------------------------------------------
    subscribeOnLoad(eventBack) {
        this._experienceCommunication.bind('onLoad', eventBack);
    }
    unsubscribeOnLoad(eventBack) {
        this._experienceCommunication.unbind('onLoad', eventBack);
    }

    //-----------------------------------------------------
    subscribeExperienceReady(eventBack) {
        this._experienceCommunication.bind('ExperienceReady', eventBack);
    }
    unsubscribeExperienceReady(eventBack) {
        this._experienceCommunication.unbind('ExperienceReady', eventBack);
    }

    //-----------------------------------------------------
    subscribeExperiencePlayReady(eventBack) {
        this._experienceCommunication.bind('onPlay', eventBack);
        this._onPlayCB = eventBack; // for 2.5D
    }
    unsubscribeExperiencePlayReady(eventBack) {
        this._experienceCommunication.unbind('onPlay', eventBack);
    }


    //-----------------------------------------------------
    //                      Load
    //-----------------------------------------------------
    load(path, options) {
        this._startLoadingTime = Date.now();
        performance.mark("EXP_Player_load_start");

        this._initExperienceData();

        let model = this.getModelName(path);
        if (model !== undefined) {
            this.model = model;
        }

        let params = {
            "path": path,
            "options": options
        }
        this._experienceCommunication.trigger('load', params);
    }

    //-----------------------------------------------------
    //                Play - Pause - Stop
    //-----------------------------------------------------

    play(eventBack) {
        this._experienceCommunication.trigger('play');
        this._experienceCommunication.bindOnce('onPlay', eventBack)
    }
    pause(eventBack) {
        this._experienceCommunication.trigger('pause');
        this._experienceCommunication.bindOnce('onPause', eventBack)
    }
    stop(eventBack) {
        this._experienceCommunication.trigger('stop');
        this._experienceCommunication.bindOnce('onStop', eventBack)
    }

    //-----------------------------------------------------
    //                      2.5D
    //-----------------------------------------------------

    // Play a variant given by index
    play25DVariant(index) {
        let params = {
            index: index
        };
        this._experienceCommunication.trigger('play25DVariant', params);
    }

    // Get array of variant names
    get25DVariants(eventBack) {
        this._experienceCommunication.trigger('get25DVariants');
        this._experienceCommunication.bindOnce('onGet25DVariants', eventBack)
    }

    // Get the number of variants
    get25DVariantsNumber(eventBack) {
        this._experienceCommunication.trigger('get25DVariantsNumber');
        this._experienceCommunication.bindOnce('onGet25DVariantsNumber', eventBack)
    }

    // Set visibility of immersive help
    showImmersiveHelp(show) {
        let params = {
            show: show
        };
        this._experienceCommunication.trigger('showImmersiveHelp', params);
    }

    // Set visibility of variant GUI
    showVariantGUI(show) {
        let params = {
            show: show
        };
        this._experienceCommunication.trigger('showVariantGUI', params);
    }

    //-----------------------------------------------------
    //                        3D
    //
    // *** Limitation **** apply for current scenario only
    //-----------------------------------------------------
    // Play an act given by name
    playActByName(name) {
        let params = {
            "name": name
        };
        this._experienceCommunication.trigger('playAct', params);
    }

    // Get array of Acts names
    getActs(eventBack) {
        this._experienceCommunication.trigger('getActs');
        this._experienceCommunication.bindOnce('onGetActs', eventBack)
    }

    // Get the number of Acts
    getActsNumber(eventBack) {
        this._experienceCommunication.trigger('getActsNumber');
        this._experienceCommunication.bindOnce('onGetActsNumber', eventBack)
    }

    // Play a scene given by name
    playSceneByName(name) {
        let params = {
            "name": name
        };
        this._experienceCommunication.trigger('playScene', params);
    }

    // Get array of scenes names
    getScenes(eventBack) {
        this._experienceCommunication.trigger('getScenes');
        this._experienceCommunication.bindOnce('onGetScenes', eventBack)
    }

    // Get the number of scenes
    getScenesNumber(eventBack) {
        this._experienceCommunication.trigger('getScenesNumber');
        this._experienceCommunication.bindOnce('onGetScenesNumber', eventBack)
    }

    // Play an act of a scene given by names
    playActOfSceneByName(sceneName , actName) {
        let params = {
            "sceneName": sceneName,
            "actName": actName
        };
        this._experienceCommunication.trigger('playActOfScene', params);
    }

    // Get array of scenes and Acts by names
    getActsFromScene(name, eventBack) {
        let params = {
            "name": name
        };
        this._experienceCommunication.trigger('getActsFromScene', params);
        this._experienceCommunication.bindOnce('onGetActsFromScene' + name, eventBack)
    }

    // Play a permanent act given by name
    playPermanentActByName(name) {
        let params = {
            "name": name
        };
        this._experienceCommunication.trigger('playPermanentAct', params);
    }

    // Get array of permanent acts names
    getPermanentActs(eventBack) {
        this._experienceCommunication.trigger('getPermanentActs');
        this._experienceCommunication.bindOnce('onGetPermanentActs', eventBack)
    }

    // Get the number of permanent acts
    getPermanentActsNumber(eventBack) {
        this._experienceCommunication.trigger('getPermanentActsNumber');
        this._experienceCommunication.bindOnce('onGetPermanentActsNumber', eventBack)
    }

    //
    highlight(id, mode) {
        let params = {
            "id": id,
            "mode": mode
        };
        this._experienceCommunication.trigger('highlight', params);
    }

    //
    show(id, mode) {
        let params = {
            "id": id,
            "mode": mode
        };
        this._experienceCommunication.trigger('show', params);
    }

    //-----------------------------------------------------
    //                     Visu options
    //-----------------------------------------------------
    showFPS(show) {
        let params = {
            "show": show
        };
        this._experienceCommunication.trigger('showFPS', params);
    }
    showVisuDebugInfos(show) {
        let params = {
            "show": show
        };
        this._experienceCommunication.trigger('showVisuDebugInfos', params);
    }
    setTransparentBackground(transparentBg) {
        let params = {
            "transparentBackground": transparentBg
        };
        this._experienceCommunication.trigger('setTransparentBackground', params);
    }
    setVisuOptionsPreset(preset) {
        let params = {
            "preset": preset
        };
        this._experienceCommunication.trigger('setVisuOptionsPreset', params);
    }
    setVisuOptionsAdvanced(options) {
        let params = {
            "options": options
        };
        this._experienceCommunication.trigger('setVisuOptionsAdvanced', params);
    }
    setAntiAliasing(aa, mode) {
        let params = {
            "aa": aa,
            "mode": mode
        };
        this._experienceCommunication.trigger('setAntiAliasing', params);
    }
    setOIT(oit, mode) {
        let params = {
            "oit": oit,
            "mode": mode
        };
        this._experienceCommunication.trigger('setOIT', params);
    }
    setSSAO(ssao, mode) {
        let params = {
            "ssao": ssao,
            "mode": mode
        };
        this._experienceCommunication.trigger('setSSAO', params);
    }
    setShadow(shadow, mode) {
        let params = {
            "shadow": shadow,
            "mode": mode
        };
        this._experienceCommunication.trigger('setShadow', params);
    }
    setMirror(mirror, mode) {
        let params = {
            "mirror": mirror,
            "mode": mode
        };
        this._experienceCommunication.trigger('setMirror', params);
    }
    setGroundShadow(groundShadow, mode) {
        let params = {
            "groundShadow": groundShadow,
            "mode": mode
        };
        this._experienceCommunication.trigger('setGroundShadow', params);
    }
    setBloom(bloom, mode) {
        let params = {
            "bloom": bloom,
            "mode": mode
        };
        this._experienceCommunication.trigger('setBloom', params);
    }
    setPixelCulling(pixelCulling, mode) {
        let params = {
            "pixelCulling": pixelCulling,
            "mode": mode
        };
        this._experienceCommunication.trigger('setPixelCulling', params);
    }
    setRoughnessMap(path) {
        let params = {
            "path": path
        };
        this._experienceCommunication.trigger('setRoughnessMap', params);
    }
    setTriLights(triLights) {
        let params = {
            "triLights": triLights
        };
        this._experienceCommunication.trigger('setTriLights', params);
    }
    setLightParameters(intensity, lightIndex, color) {
        let params = {
            "intensity": intensity,
            "lightIndex": lightIndex,
            "color": color
        };
        this._experienceCommunication.trigger('setLightParameters', params);
    }
    setDirectionalLight(latitude, longitude, color, intensity) {
        let params = {
            "latitude": latitude,
            "longitude": longitude,
            "color": color,
            "intensity": intensity
        };
        this._experienceCommunication.trigger('setDirectionalLight', params);
    }
    setAmbientLight(color) {
        let params = {
            "color": color
        };
        this._experienceCommunication.trigger('setAmbientLight', params);
    }

    //-----------------------------------------------------
    //                        Others
    //-----------------------------------------------------

    // GetInfos
    getInfos(infos, eventBack) {
        let params = {
            "infos": infos
        };
        this._experienceCommunication.trigger('getInfos', params);
        this._experienceCommunication.bindOnce('onGetInfos_' + infos, eventBack);
    }

    // Console
    _getConsoleMessages(eventBack) {
        this._experienceCommunication.trigger('getConsoleMessages');
        this._experienceCommunication.bind('onGetConsoleMessages', eventBack);
    }
}

//-----------------------------------------------------------------------------
// ExperienceCommunication
//-----------------------------------------------------------------------------
class ExperienceCommunication {

    //
    constructor(playerID) {
        this._playerID = playerID;
        this.subscriptions = {};
        this.oneTimeSubscriptions = {};

        this.runEventListener();
    }

    runEventListener() {
        let _this = this;
        window.addEventListener('message',
            function (e) {
                //Filter messages to accept only messages from child frame/s
                let shouldListen = false;
                /*for (let i = 0, len = window.frames.length; i < len; i++) {
                    if (window.frames[i] === e.source) {
                        shouldListen = true;
                        break;
                    }
                }*/
                if (e && e.data && e.data.protocol === "ExperienceCommunication") {
                    if (_this._playerID === e.data.playerID) {
                        shouldListen = true;
                    }
                }

                if (!shouldListen) return;

                let action = e.data.action;
                let params = e.data.params;

                if (_this.oneTimeSubscriptions.hasOwnProperty(action)) {
                    // call once and unsubscribe
                    _this.oneTimeSubscriptions[action].forEach(function (callback) {
                        callback(params);
                    });

                    _this.oneTimeSubscriptions[action].length = 0;
                }

                if (_this.subscriptions.hasOwnProperty(action)) {
                    _this.subscriptions[action].forEach(function (callback) {
                        callback(params);
                    });
                }
            }, false);
    }

    bind(eventName, handler) {
        if (!this.subscriptions.hasOwnProperty(eventName)) {
            this.subscriptions[eventName] = [];
        }

        this.subscriptions[eventName].push(handler);
    }
    bindOnce(eventName, handler) {
        if (!this.oneTimeSubscriptions.hasOwnProperty(eventName)) {
            this.oneTimeSubscriptions[eventName] = [];
        }

        this.oneTimeSubscriptions[eventName].push(handler);
    }
    unbind(eventName, handler) {
        if (!this.subscriptions.hasOwnProperty(eventName)) return;

        let subscriptionIndex = this.subscriptions[eventName].indexOf(handler);
        if (subscriptionIndex > -1) {
            this.subscriptions[eventName].splice(subscriptionIndex, 1);
        }
    }
    trigger(eventName, params) {

        let message = {
            "protocol": "ExperienceCommunication",
            "playerID": this._playerID,
            "action": eventName,
            "params": params
        };

        if (window.top !== window) {
            //Send message to parent window
            window.parent.postMessage(message, '*');
            //Send message to the parent's children
            for (let i = 0, len = window.parent.frames.length; i < len; i++) {
                window.parent.frames[i].postMessage(message, '*');
            }
        }

        //Send message to child iframes of the current window
        for (let i = 0, len = window.frames.length; i < len; i++) {
            window.frames[i].postMessage(message, '*');
        }
    }
}
