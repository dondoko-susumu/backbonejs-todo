// js/router.js

App.Router = Backbone.Router.extend({
	routes: {
		'notes/:id': 'showNoteDetail',
		'new': 'showNewNote',
		'notes/:id/edit': 'showEditNote',
		'notes/search/:query': 'searchNote',
		'*actions': 'defaultRoute'
	},

	defaultRoute: function() {
		this.showNoteList();
		this.navigate('notes'); //hashchangeイベントを発生せずURLの更新だけ行う
	},

	// 引数models:検索フィルターされたリスト
	showNoteList: function(models) {

		// 一覧表示用のコレクションを別途初期化する
		if (!this.filteredCollection) {
			this.filteredCollection = new App.NoteCollection();
		}

		// ContainerでNoteListViewのインスタンスが表示中でないときのみ
		// Containerのビューを初期化する
		if(!App.mainContainer.has(App.NoteListView)) {
			// コレクションを渡して
			// メモ一覧の親ビューを初期化する
			var noteListView = new App.NoteListView({
				collection: this.filteredCollection
			});

			// 表示領域にメモ一覧を表示する
			// App.Containerのshow()は受け取ったビューの
			// render()を実行してDOM要素を自身のelに挿入する
			App.mainContainer.show(noteListView);
		}

		// 検索されたモデルの配列が引数に渡されていればそちらを、
		// そうでなければすべてのモデルを持つ
		// App.noteCollectionインスタンスのモデルの配列を使用する
		models = models || App.noteCollection.models;

		// 一覧表示用のコレクションのreset()メソッドに
		// 採用したほうのモデルの配列を渡す
		this.filteredCollection.reset(models);

		// [New Note]ボタンと検索窓
		this.showNoteControl();
	},

	// [New Note]ボタンと検索窓
	showNoteControl: function() {
		var noteControlView = new App.NoteControlView();

		// submit:formイベントの監視を追加する
		noteControlView.on('submit:form', function(query){
			this.searchNote(query);
			this.navigate('notes/search/'+query);
		},this);

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

	// New
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
	},

	// Edit
	showEditNote: function(id) {

		var self = this;

		//既存のNoteモデルを取得してNoteFormViewに渡す
		var note = App.noteCollection.get(id);
		var noteFormView = new App.NoteFormView({
			model:note
		});

		noteFormView.on('submit:form', function(attrs){
			// submit:formイベントで受け取ったフォームの入力値をNoteモデルに保存する
			note.save(attrs);

			// モデル詳細画面を表示してルートも適切なものに書き換える
			self.showNoteDetail(note.get('id'));
			self.navigate('notes/' + note.get('id'));
		});

		App.mainContainer.show(noteFormView);
	},

	// Search
	searchNote: function(query) {
		var filtered = App.noteCollection.filter(function(note){
			return note.get('title').indexOf(query) !== -1;
		});
		this.showNoteList(filtered);
	}
});
