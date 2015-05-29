// js/router.js

App.Router = Backbone.Router.extend({
	routes: {
		'notes/:id': 'showNoteDetail',
		'new': 'showNewNote',
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

		// [New Note]ボタンと検索窓
		this.showNoteControl();
	},

	// [New Note]ボタンと検索窓
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
	},

	showNewNote: function() {

		var self = this;

		// テンプレートの<%= title %>などの出力を空文字列で
		// 空欄にしておくため、新規に生成したNoteモデルを渡して
		// NoteFormViewを初期化する
		var noteFormView = new App.NoteFormView({
			model: new App.Note()
		});

		noteFormView.on('submit:form', function(attrs) {
			// submit:formイベントで受け取ったフォームの
			// 入力値をNoteCollectionコレクションのcreate()に
			// 渡してNoteモデルの新規作成と保存を行う
			App.noteCollection.create(attrs);

			// モデル一覧を表示してルートを#notesに戻す
			self.showNoteList();
			self.navigate('notes');
		});

		App.mainContainer.show(noteFormView);

		// [New Note]ボタンはこの画面では必要ないので
		// ビューを破棄しておく
		App.headerContainer.empty();
	}
});
