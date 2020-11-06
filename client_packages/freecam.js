let isEnabled       = false;
const localPlayer   = mp.players.local;
const camera        = mp.cameras.new("gameplay");

const KEY_FORWARD = 87; // W
const KEY_BACK = 83; // A
const KEY_LEFT = 65; // S
const KEY_RIGHT = 68; // D
const KEY_UP = 33; // Page Up
const KEY_DOWN = 34; // Page Down
const KEY_FAST = 16; // LShift
const KEY_SLOW = 18; // Alt

const SPEED_NORMAL = 1;
const SPEED_SLOW = 0.15;
const SPEED_FAST = 4;


function freecamToggle(){
    isEnabled = !isEnabled;
    localPlayer.setInvincible(isEnabled);
    localPlayer.freezePosition(isEnabled);
    localPlayer.setAlpha(isEnabled ? 0 : 255);
    localPlayer.setCollision(!isEnabled, !isEnabled);
}

mp.events.add('render', () => {
    if( !isEnabled ) return;

    let { position } = localPlayer;
    const direction = camera.getDirection();

    let speed = freecamGetSpeed();

    if (mp.keys.isDown(KEY_FORWARD) === true) {
        position.x += direction.x * speed;
        position.y += direction.y * speed;
        position.z += direction.z * speed;
    } else if (mp.keys.isDown(KEY_BACK) === true) {
        position.x -= direction.x * speed;
        position.y -= direction.y * speed;
        position.z -= direction.z * speed;
    }

    if (mp.keys.isDown(KEY_LEFT) === true) {
        position.x += (-direction.y) * speed;
        position.y += direction.x * speed;
    } else if (mp.keys.isDown(KEY_RIGHT) === true) {
        position.x -= (-direction.y) * speed;
        position.y -= direction.x * speed;
    }

    if (mp.keys.isDown(KEY_UP) === true) {;
        position.z += speed;
    } else if (mp.keys.isDown(KEY_DOWN) === true) {
        position.z -= speed;
    }

    localPlayer.position = position;
});

function freecamGetSpeed(){

    if (mp.keys.isDown(KEY_FAST) === true) {
        return SPEED_FAST;
    } else if (mp.keys.isDown(KEY_SLOW) === true) {
        return SPEED_SLOW;
    }

    return SPEED_NORMAL;
}