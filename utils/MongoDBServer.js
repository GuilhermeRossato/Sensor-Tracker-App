const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * A wrapper for the volatile (in-memory) MongoDB Server that does not persist after being stopped
 */
class MongoDBServer {
	construct() {
		this.mongoUri = undefined;
		this.uri = undefined;
		this.port = undefined;
		this.dbPath = undefined;
		this.dbName = undefined;
		this.getInstanceInfo = this._getInstanceInfo;
	}
	async start(debug = false) {
		this.mongoServer = new MongoMemoryServer({
			debug: debug
		});
		if (this.mongoServer.waitUntilRunning) {
			await this.mongoServer.waitUntilRunning();
		}

		this.mongoUri = await this.mongoServer.getConnectionString();
		this.uri = await this.mongoServer.getConnectionString();
		this.port = await this.mongoServer.getPort();
		this.dbPath = await this.mongoServer.getDbPath();
		this.dbName = await this.mongoServer.getDbName();
		this.getInstanceInfo = this.mongoServer.getInstanceInfo.bind(this.mongoServer);
	}
	async stop() {
		await this.mongoServer.stop();
		this.mongoUri = undefined;
		this.uri = undefined;
		this.port = undefined;
		this.dbPath = undefined;
		this.dbName = undefined;
		this.getInstanceInfo = this._getInstanceInfo;
	}
	_getInstanceInfo() {
		return {}
	}
}

module.exports = MongoDBServer;