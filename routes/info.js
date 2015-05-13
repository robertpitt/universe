/**
 * Export the information routes
 */
module.exports = function(app) {
	console.log("Binding info endpoints");
	/**
	 * Information Endpoint
	 */
	app.get("/info/:site", function(req, res, next){
		/**
		 * This method check's if the site is taken
		 */
		res.sendStatus(404);
	});
}