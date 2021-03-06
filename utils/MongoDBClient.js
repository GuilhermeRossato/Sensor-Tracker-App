const Connection = require("./Connection.js");
const mongoose = require("mongoose");

/**
 * A mongoose database client wrapper
 *
 * @url https://mongoosejs.com/docs/guide.html
 */
class MongoDBClient extends Connection {
	constructor() {
		super();
		this.client = undefined;
		if (!MongoDBClient.connections) {
			MongoDBClient.connections = {};
		}
	}

	/**
	 * Assyncronously connects to a mongodb url
	 * @param  {String} url  The connection string, starting with the mongodb:// protocol, followed by hostname and optionally a port
	 * @throws Error         When the connections fails
	 */
	async connect(url = false) {
		if (url === false) {
			if (!global.CONN_STRING) {
				await new Promise(resolve => setTimeout(resolve, 4000));
				if (!global.CONN_STRING) {
					throw new Error("Could not determine default CONN_STRING from global variables");
				}
			}
			url = global.CONN_STRING;
		}
		if (MongoDBClient.connections[url]) {
			this.client = MongoDBClient.connections[url];
		} else if (typeof url === "string") {
			this.client = mongoose;
			await this.client.connect(url, { useNewUrlParser: true });
			mongoose.set("useNewUrlParser", true);
			mongoose.set("useFindAndModify", false);
			mongoose.set("useCreateIndex", true);
			MongoDBClient.connections[url] = this.client;
		} else {
			throw new Error("Unexpected connect url parameter");
		}
	}

	/**
	 * Helper function to check if the client is correctly connected
	 * @throws Error  When the client is missing or invalid
	 */
	verifyClient() {
		if (!this.client || !this.client.db) {
			throw new Error("A valid MongoDB Connection is missing. Generate one by calling the 'connect' method.");
		}
	}

	/**
	 * Closes the currenct connection
	 * @return {Promise}  A promise that resolves when the connection finishes closing
	 */
	async disconnect() {
		if (this.client === mongoose) {
			return await mongoose.connection.close();
		}
		this.verifyClient();
		return await this.client.close();
	}

	/**
	 * Alias for disconnect
	 * @return {Promise}  A promise that resolves when the connection finishes closing
	 */
	close() {
		return this.disconnect();
	}

	/**
	 * Helper function to check if the collection exists and is valid
	 * @throws Error  When the collection is missing or invalid
	 */
	verifyCollection() {
		if (!this.collection) {
			throw new Error("A valid Mongo Collection is missing. Generate one by calling the 'section' method.");
		}
	}

	/**
	 * Defines the table in which the next operations will take place, creating it if it does not exist
	 * @param  {string} tableName  The table name or section to be selected
	 */
	async section(tableName) {
		this.verifyClient();
		this.collection = this.client.db(tableName);
	}

	/**
	 * Alias for section method
	 * @param  {string} tableName  The table name or section to be selected
	 */
	db(tableName) {
		return this.section(tableName);
	}

	/**
	 * Alias for section method
	 * @param  {string} tableName  The table name or section to be selected
	 */
	from(tableName) {
		return this.section(tableName);
	}

	/**
	 * Insert one element to the database
	 * @param  {object} data  A object to be saved
	 * @return {Promise}      A promise that resolves the action
	 */
	insert(data) {
		this.verifyCollection();
		return this.client.insert(data);
	}

	/**
	 * Insert an array of elements to the database
	 * @param  {array} dataList  An array of objects to be saved to the database
	 * @return {Promise}         A promise that resolves the action
	 */
	insertMany(dataList) {
		this.verifyCollection();
		return this.collection.insertMany(dataList);
	}

	/**
	 * Find a list of elements, optionally filtering with a given object
	 * @param  {object} data  Optional filter to be used while finding the objects
	 * @return {Promise}      A promise that resolves the action
	 */
	find(data = null) {
		return this.collection.find(data).toArray();
	}

	/**
	 * Delete an element on the database
	 * @param  {object} data  The filter to be used
	 * @return {Promise}       A promise that resolves the action
	 */
	delete(data) {
		return this.collection.deleteOne(data);
	}

	/**
	 * Formalize a section's model to the ORM
	 * @param  {string} sectionName  The name of the database section (table) to be defined
	 * @param  {object} configObject The object describing each column type and properties
	 */
	model(sectionName, configObject) {
		return mongoose.model(sectionName, configObject);
	}
}

module.exports = MongoDBClient;