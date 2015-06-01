// js/note_list.js
// メモ一覧のビュー

App.NoteListView = Backbone.View.extend({

	tagName: 'table',

	// Bootstrapの装飾を与えるために'table'クラス属性値を指定する
	className: 'table',

	initialize: function(options) {
		// Backbone.Collectionインスタンスを受け取る
		this.collection = options.collection;

		// コレクションのresetイベントに応じてrender()を呼び出す
		this.listenTo(this.collection,'reset',this.render);
	},

	render: function() {

		// this.$el.html()が呼び出される前に古いビューを破棄しておく
		this.removeItemViews();

		// テンプレートから自身のDOM構築を行う
		var template = $('#noteListView-template').html();
		this.$el.html(template);

		// 保持しているコレクションから子ビューを生成してレンダリングする
		this.renderItemViews();
		return this;
	},

	renderItemViews: function() {
		// 子ビューをappend()で挿入する地点を特定する
		var $insertionPoint = this.$('.js-noteListItemView-container');

		// コレクション内のすべてのモデルを取り出して
		// 個々のビューを生成し、親ビューのDOMツリーを挿入する
		// 後で適切に破棄できるように子ビュー参照をitemViewsに保持しておく
		this.itemViews = this.collection.map(function(note){
			var itemView = new App.NoteListItemView({
				model:note
			});
			//console.log(itemView.render().$el.html());

			// $el(JQuery)のままappendするとなぜか２重にtrで囲まれる
			// --> 挿入するhtml先頭が<tr>でなかったら、jqueryのappendメソッドで自動的にtrタグを補完するようだ。
			$insertionPoint.append(itemView.render().$el);
			//$insertionPoint.append(itemView.render().$el.html());
			//console.log($insertionPoint.html());

			return itemView;
		}, this);
	},

	// すべての子ビューを破棄するメソッドを追加する
	removeItemViews: function() {
		// 保持しているすべてのビューのremove()を呼び出す
		_.invoke(this.itemViews,'remove');
	}
});
