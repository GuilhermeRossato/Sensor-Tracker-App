/**
 * Interface to be used as template for future connection classes
 */
class Connection {
	unimplemented() {
		throw new Error("Unimplemented");
	}
	async connect(connectionString) {
		return this.unimplemented();
	}
	async disconnect() {
		return this.unimplemented();
	}
	async section(sectionName) {
		return this.unimplemented();
	}
	async insert(data) {
		return this.unimplemented();
	}
	async insertMany(dataList) {
		return this.unimplemented();
	}
	async find(data) {
		return this.unimplemented();
	}
	async delete(data) {
		return this.unimplemented();
	}
}

module.exports = Connection;