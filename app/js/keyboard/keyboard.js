function handleKeyboard(){
    const SELECTORS = {
        KEYSYMBOL: document.getElementById('keysymbol'),
        KEYCODE: document.getElementById('keycode'),
        KEYCHARCODE: document.getElementById('charcode')
    };

    window.addEventListener('keydown', function(e){
        const keySymbol = e.key;
        const keyCode = e.keyCode;
        const keyCharCode = keySymbol.charCodeAt();

        function insertKeyData() {
            SELECTORS.KEYSYMBOL.innerHTML = keySymbol;
            SELECTORS.KEYCODE.innerHTML = keyCode;
            SELECTORS.KEYCHARCODE.innerHTML = keyCharCode;
        }

        insertKeyData();
    });
}

function getKeyCode() { 
    console.log('test');
}

module.exports = handleKeyboard;