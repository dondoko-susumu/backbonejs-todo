// js/app.js

// 名前空間の定義

window.App = {};

// ダミーのNoteモデルを生成する関数
var initializeNotes = function() {
	// ダミーのNoteコレクションを生成する
	var noteCollection = new App.NoteCollection([{
		title:'テスト１',
		body:'テスト１です'
	},{
		title:'テスト２',
		body:'テスト２です'
	}]);

	// 作成したモデルはローカルストレージに保存する
	noteCollection.each(function(note) {
		note.save();
	});

	// この処理で作ったコレクションは一時的な用途であり
	// 必要なのは中身のモデルなのでモデルの配列を返す
	return noteCollection.models;
};

$(function() {
	// NoteCollectionコレクションを初期化する
	// 後で別のjsファイルからも参照するので
	// App名前空間配下に参照を持たせておく
	App.noteCollection = new App.NoteCollection();

	// メモ一覧のビューを表示する領域として
	// App.Containerを初期化する
	// こちらも同様にApp配下に参照を持たせる
	App.mainContainer = new App.Container({
		el: '#main-container'
	});

	// 新規追加欄
	App.headerContainer = new App.Container({
		el: '#header-container'
	});

	// NoteCollectionコレクションのデータを受信する
	// Backbone.LocalStorageを使用しているので
	// ブラウザのローカルストレージから読み込む
	App.noteCollection.fetch().then(function(notes) {

		//もし読み込んだデータが空であれば
		//ダミーデータでコレクションの中身を上書きする
		if (notes.length==0) {
			var models = initializeNotes();
			App.noteCollection.reset(models);
		}

		//ルータの初期化と履歴管理の開始
		App.router = new App.Router();
		Backbone.history.start();
	});
});
