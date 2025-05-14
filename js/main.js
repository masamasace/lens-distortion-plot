// DOMの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
    // ビューワーの初期化
    const viewer = new DistortionViewer();
    
    // コントロールの初期化
    const controls = new DistortionControls(viewer);
    
    // 初期表示
    viewer.update();
});
