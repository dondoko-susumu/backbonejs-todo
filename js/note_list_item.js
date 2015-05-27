// js/note_list_item.js
// メモ一覧の項目のビュー

App.NoteListItemView = Backbone.View.extend({

	tagName: 'tr',

	initialize: function() {
		// モデルのdestroyイベントを監視して
		// Backbone.Viewのremove()メソッドを呼び出す
		this.listenTo(this.model,'destroy',this.remove);
	},

	// [Delete]ボタンを監視して
	// onClickDelete()メソッドを呼び出す
	events:{
		'click .js-delete':'onClickDelete'
	},

	render: function(){
		var template = $('#noteListItemView-template').html();
		var compiled = _.template(template);
		var html = compiled(this.model.attributes);
		//console.log(html);
		this.$el.html(html);
		//console.log(this.$el.html());
		return this;
	},

	onClickDelete: function(){
		// モデルを削除する
		this.model.destroy();
	}
});
