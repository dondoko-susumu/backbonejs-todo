// js/router.js

App.Router = Backbone.Router.extend({
	routes: {
		'notes/:id': 'showNoteDetail',
		'*actions': 'defaultRoute'
	},

	defaultRoute: function() {
		this.showNoteList();
		this.navigate('notes'); //hashchangeイベントを発生せずURLの更新だけ行う
	},

	showNoteList: function() {

		// コレクションを渡して
		// メモ一覧の親ビューを初期化する
		var noteListView = new App.NoteListView({
			collection: App.noteCollection
		});

		// 表示領域にメモ一覧を表示する
		// App.Containerのshow()は受け取ったビューの
		// render()を実行してDOM要素を自身のelに挿入する
		App.mainContainer.show(noteListView);

		// [New Note]ボタン
		this.showNoteControl();
	},

	// [New Note]ボタン
	showNoteControl: function() {
		var noteControlView = new App.NoteControlView();
		App.headerContainer.show(noteControlView);
	},

	// ルーティングが受け取った:idパラメータは
	// そのまま引数名idで受け取れる
	showNoteDetail: function(id) {
		var note = App.noteCollection.get(id);
		var noteDetailView = new App.NoteDetailView({
			model: note
		});
		App.mainContainer.show(noteDetailView);

		//[New Note]ボタンは消したいのでビュー破棄しておく
		App.headerContainer.empty();
	}
});
