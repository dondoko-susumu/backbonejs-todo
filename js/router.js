// js/router.js

App.Router = Backbone.Router.extend({
	routes: {
		'notes/:id': 'showNoteDetail'
	},

	// ルーティングが受け取った:idパラメータは
	// そのまま引数名idで受け取れる
	showNoteDetail: function(id) {
		var note = App.noteCollection.get(id);
		var noteDetailView = new App.NoteDetailView({
			model: note
		});
		App.mainContainer.show(noteDetailView);
	}
});
