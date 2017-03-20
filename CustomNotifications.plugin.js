//META{"name":"CustomNotifications"}*//

var CustomNotifications = function () {};

(function () {
    var customSound = {
        message: {sound: ""},
        deafen: {sound: ""},
        undeafen: {sound: ""},
        mute: {sound: ""},
        unmute: {sound: ""},
        voiceDisconnected: {sound: ""},
        pttActivate: {sound: ""},
        pttDeactivate: {sound: ""},
        userJoin: {sound: ""},
        userLeave: {sound: ""},
        outgoingRing: {sound: ""},
        incomingRing: {sound: ""}
    };
    customSound["./message1.mp3"] = customSound.message;
    customSound["./deafen.mp3"] = customSound.deafen;
    customSound["./undeafen.mp3"] = customSound.undeafen;
    customSound["./mute.mp3"] = customSound.mute;
    customSound["./unmute.mp3"] = customSound.unmute;
    customSound["./disconnect.mp3"] = customSound.voiceDisconnected;
    customSound["./ptt_start.mp3"] = customSound.pttActivate;
    customSound["./ptt_stop.mp3"] = customSound.pttDeactivate;
    customSound["./user_join.mp3"] = customSound.userJoin;
    customSound["./user_leave.mp3"] = customSound.userLeave;
    customSound["./call_calling.mp3"] = customSound.outgoingRing;
    customSound["./call_ringing.mp3"] = customSound.incomingRing;


    var audioFuncID = 3578;
    var audioFuncEnabled = false;
    var oldAudioLoad;
    var newAudioLoad = function(e) {
        if( audioFuncEnabled && customSound[e] && customSound[e].sound)
            return customSound[e].sound;
        return oldAudioLoad(e);
    };

    CustomNotifications.prototype.start = function () {
        audioFuncEnabled = true;
    };

    CustomNotifications.prototype.load = function () {
        var customSounds = bdPluginStorage.get("CustomNotifications", "customSounds");
        if(customSounds)
        {
            customSound.message.sound = customSounds.message;
            customSound.deafen.sound = customSounds.deafen;
            customSound.undeafen.sound = customSounds.undeafen;
            customSound.mute.sound = customSounds.mute;
            customSound.unmute.sound = customSounds.unmute;
            customSound.voiceDisconnected.sound = customSounds.voiceDisconnected;
            customSound.pttActivate.sound = customSounds.pttActivate;
            customSound.pttDeactivate.sound = customSounds.pttDeactivate;
            customSound.userJoin.sound = customSounds.userJoin;
            customSound.userLeave.sound = customSounds.userLeave;
            customSound.outgoingRing.sound = customSounds.outgoingRing;
            customSound.incomingRing.sound = customSounds.incomingRing;
        }
    };

    CustomNotifications.prototype.unload = function () {
    };

    CustomNotifications.prototype.stop = function () {
        audioFuncEnabled = false;
    };

    CustomNotifications.SettingsChanged = function (e) {
        var id = e.id.substring(3);
        customSound[id].sound = e.value;
        var customSounds = {
            message: customSound.message.sound,
            deafen: customSound.deafen.sound,
            undeafen: customSound.undeafen.sound,
            mute: customSound.mute.sound,
            unmute: customSound.unmute.sound,
            voiceDisconnected: customSound.voiceDisconnected.sound,
            pttActivate: customSound.pttActivate.sound,
            pttDeactivate: customSound.pttDeactivate.sound,
            userJoin: customSound.userJoin.sound,
            userLeave: customSound.userLeave.sound,
            outgoingRing: customSound.outgoingRing.sound,
            incomingRing: customSound.incomingRing.sound
        };
        bdPluginStorage.set("CustomNotifications", "customSounds", customSounds);
    };

    CustomNotifications.prototype.getSettingsPanel = function () {
        var html = `<h1><b>Settings Panel</b></h1><p><i>Url's to the audio files have to use https.</i></p><div style='float: left; width: 49%;'>
        <p>Message:</p><input type='input' style='width: 100%' id='cN.message' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.message.sound}'></input>
        <p>Deafen:</p><input type='input' style='width: 100%' id='cN.deafen' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.deafen.sound}'></input>
        <p>Undeafen:</p><input type='input' style='width: 100%' id='cN.undeafen' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.undeafen.sound}'></input>
        <p>Mute:</p><input type='input' style='width: 100%' id='cN.mute' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.mute.sound}'></input>
        <p>Unmute:</p><input type='input' style='width: 100%' id='cN.unmute' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.unmute.sound}'></input>
        <p>Voice Disconnected:</p><input type='input' style='width: 100%' id='cN.voiceDisconnected' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.voiceDisconnected.sound}'></input></div>
        <div style='float: right; width: 49%;'>
        <p>PTT Activate:</p><input type='input' style='width: 100%' id='cN.pttActivate' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.pttActivate.sound}'></input>
        <p>PTT Deactivate:</p><input type='input' style='width: 100%' id='cN.pttDeactivate' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.pttDeactivate.sound}'></input>
        <p>User Join:</p><input type='input' style='width: 100%' id='cN.userJoin' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.userJoin.sound}'></input>
        <p>User Leave:</p><input type='input' style='width: 100%' id='cN.userLeave' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.userLeave.sound}'></input>
        <p>Outgoing Ring:</p><input type='input' style='width: 100%' id='cN.outgoingRing' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.outgoingRing.sound}'></input>
        <p>Incoming Ring:</p><input type='input' style='width: 100%' id='cN.incomingRing' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='${customSound.incomingRing.sound}'></input></div>`;
        return html;
    };

    CustomNotifications.prototype.getName = function () {
        return "Custom Notifications";
    };

    CustomNotifications.prototype.getDescription = function () {
        return "Allows you to change the sounds for the notifications.";
    };

    CustomNotifications.prototype.getVersion = function () {
        return "1.3";
    };

    CustomNotifications.prototype.getAuthor = function () {
        return "Yoshivb";
    };

    var funcArray = [];
    funcArray[60000] = function(e, t, n) {
        console.log("Searching for audio getter function...");
        for(var index = 1000; index < n.m.length; index++)
        {
            var output = {};
            try{
                n.m[index](output,{},function(){return;});
            }
            catch (e){
                
            }
            if(output.exports && output.exports.keys && typeof output.exports.keys === "function" )
            {
                var keys = output.exports.keys();
                if(keys[0] && keys[0].endsWith && keys[0].endsWith(".mp3"))
                {
                    n.m[index](output,t,n);
                    audioFuncID = index;
                    console.log("Audio getter function found at: " + index.toString());
                    
                    oldAudioLoad = output.exports;
                    n.c[audioFuncID] = {
                        id: audioFuncID,
                        loaded: true,
                        exports: newAudioLoad
                    };
                    break;
                }
            }
        }
        console.warn("Audio getter function not found!");
    };
    webpackJsonp([0], funcArray, [60000]);
})();