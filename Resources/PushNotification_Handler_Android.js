/**
 * @author Activate
 */

exports.pushNotification = function(global) {
	var network = require('/lib/xhr'), gcm = require('com.activate.gcm');
	//gcm = require('com.activate.gcm');

	function deviceTokenSuccessRegister() {
		gcm.registerC2dm({
			success : deviceTokenSuccess,
			error : deviceTokenError,
			callback : receivePush
		});
	};
	deviceTokenSuccessRegister();

	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		global.regId = e.registrationId;
		global.devise_type = "android";
	//	alert(global.regId + "..." + global.devise_type);
		Ti.API.info(global.regId + "..." + global.devise_type);
		/*	var regId = e.registrationId;
		 var Param = {
		 "device_id" : regId,
		 "devise_type" : "android"
		 };
		 network.APIHANDLER("POST", {
		 success : function(e) {
		 var response = JSON.parse(e);
		 //alert(response);
		 //alert("Sucessfully registered for Push Notification")
		 },
		 error : function(e) {

		 var dialog = Ti.UI.createAlertDialog({
		 cancel : 1,
		 buttonNames : ['Try Again', 'Cancel'],
		 message : 'Device Push Notification registration service got failed, Would you like to retry?',
		 title : 'IEC'
		 });
		 dialog.addEventListener('click', function(e) {
		 if (e.index === e.source.cancel) {
		 } else {
		 deviceTokenSuccess("");
		 }
		 });
		 dialog.show();
		 }
		 }, Param, "c/devize/" + data.userId + ".json");*/

	};

	function deviceTokenError(e) {
		deviceTokenSuccessRegister();
		//	alert(e)
	};

	function receivePush(e) {
		
		
		alert("xzbxbzbxc");
		alert('JS message event: ' + JSON.stringify(e));

		var intent = Ti.Android.createIntent({
			flags : Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK,
			className : 'com.equinix.EqxibxMapApp.ShrinksyncActivity',
			packageName : 'com.test.APPP'
		});
		intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
		//
		// Create a PendingIntent to tie together the Activity and Intent
		var pending = Titanium.Android.createPendingIntent({
			intent : intent,
			flags : Titanium.Android.FLAG_UPDATE_CURRENT
		});
		//
		// Create the notification
		var notification = Titanium.Android.createNotification({
			contentTitle : 'test_pr',
			contentText : "New Message",
			contentIntent : pending
		});
		//
		// // Send the notification.
		Titanium.Android.NotificationManager.notify(1, notification);

	};

};
