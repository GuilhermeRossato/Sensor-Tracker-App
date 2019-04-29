const PushBullet = require("pushbullet");

describe("Pushbullet API", function() {
	var pusher;
	it("Should be able to generate pusher", function() {
		pusher = new PushBullet(process.env.PUSHBULLET_ACCESS_TOKEN);
	});

	var devices;
	it("Should list devices", async function() {
		devices = await pusher.devices();
	});

	it("Should send to all devices", async function() {
		for (var deviceId in devices) {
			var device = devices[deviceId];
			var iden = device.iden;
			await pusher.note(iden, "Hello World", "This is a text");
		}
	});
});