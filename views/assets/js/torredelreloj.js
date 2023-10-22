var engageDigitalClickToCallConfig = {
    /** Engage Domain, Get it from the Platform admin */
    engageDomain: 'rtc.engagedigital.ai',

    /** The number to dial to. It should be a proper service number. Creating the service and assigning it to a number can be done through ESMP-UI. */
    callTo: '800333',

    /** Type of call. Valid values are video or audio. */
    callType: 'audio',

    /** Id of the Call Button. Make sure the same id is used in your html call button.*/
    callBtnId: 'btnLlamada',

    /** The text to be displayed in the call button before the establishment of the call*/
    makeCallText: 'Call',

    /** The text to be displayed on call button once the call is established or in the process of connecting. So the user will get the context and can disconnect the call.*/
    disconnectCallText: 'End Call',

    /** Id of the Local Video element. Local video will be rendered here*/
    localVideoId: 'engage-digital-local-video',

    /** Id of the Remote Video element. Remote video will be rendered here*/
    remoteVideoId: 'engage-digital-remote-video',

    /** If this div id is declared in the page, important events will be displayed there. This will help in debugging*/
    alertDivId: 'engage-digital-alert',

    /** If its true click-to-call logs as well as EngageDigital logs will be written to browser console*/
    consoleLog: true,

    /** Join the call with local video muted or not. When it's true caller will join the call with local video muted.*/
    joinWithVideoMuted: false
}

var isEngageDigitalSdkLoaded = window.EngageDigital ? true : false;
var engageClickToCallConfig;

var engageMakeCallBtn;
var engageLocalVideo;
var engageRemoteVideo;

var engageStatusDiv;

var engageDigitalClient;
var engageDigitalSession;

const main = () => {
    if (engageDigitalClickToCallConfig) {
        initializeEngageDigitalClickToCall(engageDigitalClickToCallConfig);
    }
    events()
}

const events = () => {
    $("#template1").click(() => { window.location.href = "./" })
    $("#template").click(() => { window.location.href = "./" })

    //NABVAR

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');
        })
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    })


    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    })

    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    })

    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    })

}


//Funcionalidad llamada

'use strict';

// Note: Some Variable names are purposefully prefixed with 'engage' keyword so as not to collide with Application's global variables.
// Only the variables which may potentially collide with Application global variables are prefixed with engage keyword for better readability.

/**
 * When sdk is not explicitly included in the application using the <script> tag, this will be false.
 * If its false, the sdk will be downloaded from the given engageDomain.
 */



/**
 * When engageDigitalClickToCallConfig object is available do the initialization on the fly.
 * If its not there Application has to call initializeEngageDigitalClickToCall() explicitly with right configuration.
 */


function initializeEngageDigitalClickToCall(engageDigitalClickToCallConfig) {
    engageClickToCallConfig = engageDigitalClickToCallConfig;

    engageLog('Starting');
    engageMakeCallBtn = document.getElementById(engageClickToCallConfig.callBtnId)
    engageMakeCallBtn.innerText = engageClickToCallConfig.makeCallText;
    engageMakeCallBtn.addEventListener('click', callController);
    engageMakeCallBtn.disabled = true;

    engageLocalVideo = document.getElementById(engageClickToCallConfig.localVideoId);
    engageRemoteVideo = document.getElementById(engageClickToCallConfig.remoteVideoId);
    engageStatusDiv = document.getElementById(engageClickToCallConfig.alertDivId);

    if (!engageDigitalClient || !engageDigitalClient.isConnected()) {
        console.log("Entro primer if");
        connectToEngageDigital();
    }
}

function callController() {
    handleCallStateChange(engageCallState);
}

const callInitialState = {
    execute: () => {
        engageLog('Executing callInitialState');
        engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
        engageMakeCallBtn.disabled = false;
    },
    name: 'callInitialState'
}

const callNewState = {
    execute: () => {
        engageLog('Executing callNewState');
        engageMakeCallBtn.textContent = engageClickToCallConfig.disconnectCallText;
        makeCall();
    },
    name: 'callNewState'
}

const callConnectedState = {
    execute: () => {
        engageLog('Executing callConnectedState');
        engageMakeCallBtn.textContent = engageClickToCallConfig.disconnectCallText;
    },
    name: 'callConnectedState'
}

const callDisconnectedState = {
    execute: () => {
        engageLog('Executing callDisconnectedState');
        engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
        engageLog('Is Client Connected ? ' + engageDigitalClient.isConnected());
        if (!engageDigitalClient.isConnected()) {
            engageMakeCallBtn.disabled = true;
        }
    },
    name: 'callDisconnectedState'
}

const callCanBeEndedState = {
    execute: () => {
        engageLog('Executing callCanBeEndedState');
        engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
        disconnectCall();
    },
    name: 'callCanBeEndedState'
}

callInitialState.nextState = callNewState;
callNewState.nextState = callCanBeEndedState;
callConnectedState.nextState = callCanBeEndedState;
callDisconnectedState.nextState = callNewState;
callCanBeEndedState.nextState = callNewState;

let engageCallState = callInitialState;

function connectToEngageDigital() {

    //console.log("engageClickToCallConfig:",engageClickToCallConfig);

    const engageDomain = engageClickToCallConfig.engageDomain;

    if (isEngageDigitalSdkLoaded) {
        console.log("Entro if conect engageDigital");
        const userIdentity = Math.random().toString(36).substr(2, 7);

        const config = {
            log: {
                console: { enable: engageClickToCallConfig.consoleLog },
            },
            needRegistration: false
        };

        engageDigitalClient = new window.EngageDigital.EngageDigitalClient(userIdentity, engageDomain, config);
        registerForEngageDigitalClientEvents();
    } else {
        //console.log("Entro else conect engageDigital", engageDomain);
        //Only load for the first time
        loadEngageDigitalSDK(engageDomain);
    }
}

function registerForEngageDigitalClientEvents() {

    /**
     * The Ready event is emitted when the SDK is initialized successfully and is ready
     * for operation. Once this event is received connect() API can be invoked.
     */
    engageDigitalClient.addEventHandler('ready', () => {
        engageDigitalClient.connect();
    });

    engageDigitalClient.addEventHandler('connecting', () => {
        updateStatus('Connecting to Engage Digital...');
    });

    /*
     * This event is being called when connectivity is established for the first time.
     */
    engageDigitalClient.addEventHandler('connected', () => {
        updateStatus('Connected to Engage Digital');
        engageMakeCallBtn.disabled = false;
        handleCallStateChange(callInitialState);
    });

    /*
     * This event is emitted when the Connection with the engage domain is lost
     */
    engageDigitalClient.addEventHandler('disconnected', () => {
        updateStatus('Disconnected from Engage Digital');
        engageLog('Disconnected from Engage Digital during the call state ' + engageCallState.name);
        //Let the Call Disconnect button be enabled when disconnect happens during the call
        if (engageCallState !== callCanBeEndedState) {
            engageMakeCallBtn.disabled = true;
        }
    });

    /*
     * This event is emitted when the sdk tries to re-connect when the already established connection is lost
     */
    engageDigitalClient.addEventHandler('reconnecting', () => {
        //Let the Call Disconnect button be enabled when reconnect happens during the call
        if (engageCallState !== callCanBeEndedState) {
            engageMakeCallBtn.disabled = true;
        }
        updateStatus('Re-connecting to Engage Digital');
    });

    /**
     * Fired when the connection is re-established
     */
    engageDigitalClient.addEventHandler('reconnected', () => {
        engageMakeCallBtn.disabled = false;
        updateStatus('Re-connected to Engage Digital');
    });

    engageDigitalClient.addEventHandler('failed', (error) => {
        callStateHandler(callDisconnectedState);
        updateStatus(JSON.stringify(error));
    });

    engageDigitalClient.addEventHandler('errorinfo', ({ errorMessage }) => {
        updateStatus(errorMessage);
    });

    /**
     * For an incoming/outgoing call this event will be triggered.
     * This event will carry an instance of EngageDigitalSession, on that call related events can be registered.
     * If the new session is for an incoming call EngageDigitalSession's acceptCall() API can be invoked to accept the call.
     */
    engageDigitalClient.addEventHandler('newRTCSession', onNewEngageSession);
}

function disConnectFromEngageDigital() {

    if (engageDigitalClient) {
        engageDigitalClient.disconnect();
        handleCallStateChange(callInitialState);
        updateStatus('Disconnected from Engage Digital');
    }
}

function makeCall() {

    const callToNum = engageClickToCallConfig.callTo;

    try {
        const isVideoCall = engageClickToCallConfig.callType === 'video';

        engageDigitalClient.makeCall(callToNum, {
            mediaConstraints: {
                audio: true,
                video: isVideoCall
            },
            rtcOfferConstraints: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: isVideoCall ? 1 : 0
            },
            joinWithVideoMuted: engageClickToCallConfig.joinWithVideoMuted
        });

    } catch (error) {
        updateStatus('Call: Provide valid phone number');
        engageLog('Error in make call : ' + error.errorMessage);
        handleCallStateChange(callInitialState);
    }
}

function onNewEngageSession(session) {

    engageLog('Got newRTCSession event direction is %s', session.getDirection());

    engageDigitalSession = session;

    /**
     * Can play some media file indicates call is ringing state
     */
    engageDigitalSession.addEventHandler('ringing', () => {
        updateStatus('Call: Ringing');
    });

    /**
      * Call is connected, can use this event to update the status of call in UI
      */
    engageDigitalSession.addEventHandler('connected', () => {
        updateStatus('Call: Connected');
        handleCallStateChange(callConnectedState);
    });

    /**
      * Call is disconnected by the client, can use this event to update the status of call in UI
      */
    engageDigitalSession.addEventHandler('disconnected', () => {
        updateStatus('Call: DisConnected');

        handleCallStateChange(callDisconnectedState);
        clearVideoElements();
    });

    /**
      * Call is disconnected by the remote user, can use this event to update the status of call in UI
      */
    engageDigitalSession.addEventHandler('peerdisconnected', () => {
        updateStatus('Call: Remote party disconnected');
        handleCallStateChange(callDisconnectedState);
        clearVideoElements();
    });

    /**
     * Call is failed 
     */
    engageDigitalSession.addEventHandler('failed', () => {
        updateStatus('Call: Failed');
        clearVideoElements();
        handleCallStateChange(callDisconnectedState);
    });

    /**
     * On this event attach your local stream to the local video element
     */
    engageDigitalSession.addEventHandler('localstream', ({ stream }) => {
        handleLocalStream(stream);
    });

    engageDigitalSession.addEventHandler('localvideoadded', ({ stream }) => {
        handleLocalStream(stream);
    });

    engageDigitalSession.addEventHandler('localvideoremoved', ({ stream }) => {
        handleLocalStream(stream);
    });

    /**
      * On this event attach remote party's stream to the remote video element
      */
    engageDigitalSession.addEventHandler('remotestream', ({ stream }) => {
        updateStatus('Call: Got Remote video');
        handleRemoteStream(stream);
    });

    engageDigitalSession.addEventHandler('remotevideoadded', ({ stream }) => {
        engageLog('Got remotevideoadded event');

        handleRemoteStream(stream);
    });

    engageDigitalSession.addEventHandler('remotevideoremoved', ({ stream }) => {
        engageLog('Got remotevideoremoved event');

        engageRemoteVideo.srcObject = null;
        engageRemoteVideo.srcObject = stream;
    });

    /**
     * Its an Incoming call, need to invoke acceptCall API on EngageDigitalSession.
     */
    if (engageDigitalSession.getDirection() === 'incoming') {
        handleIncomingCall();
    }

}

function handleLocalStream(stream) {
    updateStatus('Call: Got local Video');
    engageLocalVideo.srcObject = null;
    engageLocalVideo.srcObject = stream;
}

function handleRemoteStream(remoteStream) {

    const videoTracks = remoteStream.getVideoTracks();

    /**
     * Disabling of video tracks in the beginning is required when local offers video and remote doesn't,
     * so that remote audio is available. Once the remote starts streaming video, onloadedmetadata event
     * handler will be invoked and remote video will also be available.
     */
    //Disabling the video tracks by default.
    if (videoTracks.length > 0) {
        for (let i = 0; i < videoTracks.length; ++i) {
            videoTracks[i].enabled = false;
        }
    }

    //Once video is available, video track will be enabled.
    engageRemoteVideo.onloadedmetadata = function () {
        for (let i = 0; i < videoTracks.length; ++i) {
            videoTracks[i].enabled = true;
        }
    };

    engageRemoteVideo.srcObject = null;
    engageRemoteVideo.srcObject = remoteStream;
}

function handleIncomingCall() {

    updateStatus('Incoming call....')
    engageDigitalSession.acceptCall({

        mediaConstraints: {
            audio: true,
            video: engageDigitalSession.isIncomingCallWithVideo(),
        },
        joinWithVideoMuted: false,
    });
}

function disconnectCall() {
    if (engageDigitalSession) {
        engageDigitalSession.disconnectCall();
    }
}

function handleCallStateChange(toCallState) {
    engageLog('Current state ' + engageCallState.name);
    toCallState.execute();
    engageCallState = toCallState.nextState;
    engageLog('Next state ' + engageCallState.name);
}

function clearVideoElements() {
    engageLocalVideo.srcObject = null;
    engageRemoteVideo.srcObject = null;
}

function updateStatus(status) {
    if (engageStatusDiv) {
        engageStatusDiv.innerText = status;
    }
    engageLog(status);
}

function loadEngageDigitalSDK(engageDomain) {

    console.log("engageDomain:", engageDomain);

    updateStatus('Loading Engage Digital sdk...')

    const sdkScriptElement = document.createElement('script');

    sdkScriptElement.type = 'text/javascript';
    sdkScriptElement.async = false;
    sdkScriptElement.src = 'https://' + engageDomain + '/engageDigital.js'

    console.log("paso despues de crear elemento:", sdkScriptElement);

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(sdkScriptElement, firstScriptTag);

    sdkScriptElement.addEventListener('load', () => {
        isEngageDigitalSdkLoaded = true;
        updateStatus('Engage Digital sdk is loaded');
        connectToEngageDigital();
    });

    sdkScriptElement.addEventListener('error', () => {
        updateStatus(`Failed to load ${sdkScriptElement.src}. Is the given domain proper?`);
    });

}

window.addEventListener('unload', function (e) {
    engageDigitalClient.disconnect();
    e.preventDefault();
});

function engageLog(logStmt) {
    if (engageClickToCallConfig.consoleLog) {
        console.log(logStmt);
    }
}

$(main);