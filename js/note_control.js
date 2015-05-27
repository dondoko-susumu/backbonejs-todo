// js/note_control.js
// [New Note]ボタンのビュー

App.NoteControlView = Backbone.View.extend({

	render: function(){
		var html = $('#noteControlView-template').html();
		this.$el.html(html);
		return this;
	}
});
