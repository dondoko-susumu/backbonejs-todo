// js/models.js

// App.Noteモデルの定義
// 1つのメモを表すモデル

App.Note = Backbone.Model.extend({
	defaults:{
		title:'',
		body:''
	 }
});

// App.NoteCollectionコレクションの定義
// 永続化のしくみにLocalStorageを使用

App.NoteCollection = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage('Notes'),
	model: App.Note
});
