class DistortionControls {
    constructor(viewer) {
        this.viewer = viewer;
        this.initializeControls();
    }

    // コントロールの初期化
    initializeControls() {
        // パラメータ入力の初期化
        this.initializeParameterControls();
        
        // 表示設定の初期化
        this.initializeDisplayControls();
    }

    // パラメータコントロールの初期化
    initializeParameterControls() {
        const params = [
            'f', 'cx', 'cy',        // カメラパラメータ
            'b1', 'b2',             // アフィン変換パラメータ
            'k1', 'k2', 'k3', 'k4', // 放射歪曲係数
            'p1', 'p2'              // 接線歪曲係数
        ];

        params.forEach(param => {
            const input = document.getElementById(param);
            const value = document.getElementById(`${param}-value`);
            
            if (input && value) {
                // 初期値を表示
                value.textContent = input.value;
                
                // イベントリスナーを設定
                input.addEventListener('input', (e) => {
                    const newValue = parseFloat(e.target.value);
                    value.textContent = newValue;
                    
                    // パラメータの更新
                    const params = {};
                    params[param] = newValue;
                    this.viewer.updateParams(params);
                });
            }
        });
    }

    // 表示設定コントロールの初期化
    initializeDisplayControls() {
        // ベクトル場表示の切り替え
        const vectorField = document.getElementById('showVectorField');
        if (vectorField) {
            vectorField.addEventListener('change', (e) => {
                this.viewer.setVectorFieldVisibility(e.target.checked);
            });
        }

        // 補正後グリッドの透明度設定
        const opacity = document.getElementById('correctedOpacity');
        if (opacity) {
            opacity.addEventListener('input', (e) => {
                this.viewer.setCorrectedOpacity(parseFloat(e.target.value));
            });
        }
    }

    // パラメータの取得
    getCurrentParams() {
        const params = {};
        ['f', 'cx', 'cy', 'b1', 'b2', 'k1', 'k2', 'k3', 'k4', 'p1', 'p2'].forEach(param => {
            const input = document.getElementById(param);
            if (input) {
                params[param] = parseFloat(input.value);
            }
        });
        return params;
    }

    // パラメータの設定
    setParams(params) {
        Object.entries(params).forEach(([param, value]) => {
            const input = document.getElementById(param);
            const valueDisplay = document.getElementById(`${param}-value`);
            if (input && valueDisplay) {
                input.value = value;
                valueDisplay.textContent = value;
            }
        });
        this.viewer.updateParams(params);
    }
}
