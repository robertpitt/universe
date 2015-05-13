/**
 * Export the information routes
 */
module.exports = function(app) {
	console.log("Binding deploy endpoints");
	/**
	 * Information Endpoint
	 */
	app.post("/deploy/:site", function(req, res, next){

		/**
		 * If there is a query string it's usually
		 * the meteor --settings contents
		 */
		var settings = req.query ? req.query : {};

		/**
		 * Pipe the contents into a tmp file
		 */
		var out = require("fs").createWriteStream("/tmp/" + req.params.site + ".tar.gz")
		
		// Pass the error to the next handler
		out.on('error', next);

		/**
		 * Pipe the request/in to the out/file
		 */
		req.pipe(out);

		/**
		 * When the file is written, we then respond.
		 */
		req.on("end", function() {
			console.log("Got file, written to FS, sending 200");
			res.status(200);
			res.json({
				url: "https://" + req.params.site
			})
		});
	});
}