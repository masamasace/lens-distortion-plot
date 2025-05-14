// DOMの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
    // ビューワーの初期化
    const viewer = new DistortionViewer();
    
    // コントロールの初期化
    const controls = new DistortionControls(viewer);
    
    // 初期表示
    viewer.update();

    // README.mdファイルの作成
    createReadme();
});

// README.mdファイルの作成
function createReadme() {
    const content = `# レンズひずみ可視化ツール

このWebアプリケーションは、レンズひずみの効果を視覚的に表示するためのツールです。Brown-Conradyモデルを使用して、様々なレンズパラメータがもたらす歪みの効果を確認できます。

## 機能

- グリッドパターンによる歪みの視覚化
- 歪み補正前後の表示
- ベクトル場による歪みの方向と大きさの表示
- リアルタイムパラメータ調整
- 補正後グリッドの透明度調整

## パラメータ

### カメラパラメータ
- f: 焦点距離（ピクセル単位）
- cx, cy: 主点座標（光学軸とセンサー平面の交点）

### アフィン変換パラメータ
- b1: アフィン変換係数
- b2: 非直交性係数

### 歪み係数
- k1, k2, k3, k4: 放射歪曲係数
- p1, p2: 接線歪曲係数

## 使用方法

1. スライダーを使用して各パラメータを調整
2. グリッドの変化をリアルタイムで確認
3. ベクトル場の表示/非表示を切り替え
4. 補正後グリッドの透明度を調整

## 技術情報

- 純粋なJavaScriptで実装
- HTML5 Canvasを使用した描画
- モジュラー設計による保守性の確保

## デプロイ
このアプリケーションはGitHub Pagesでホストできます。

1. このリポジトリをクローン
2. main/masterブランチにプッシュ
3. GitHub PagesでWebサイトを公開

## ライセンス
MITライセンス`;

    // ファイルの作成
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // ダウンロードリンクの作成（開発時のみ）
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
