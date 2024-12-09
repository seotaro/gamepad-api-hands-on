'use strict';

const controllers = {};

const BUTTON_COLUMNS = ['No.', 'pressed', 'touched', 'value'];
const AXIS_COLUMNS = ['No.', 'value'];

const BUTTON_COLUMN_STYLES = ['key', 'boolenValue', 'boolenValue', 'realValue'];
const AXIS_COLUMN_STYLES = ['key', 'realValue'];

function onConnect(e) {
  console.log('onConnect', e.gamepad);
  addGamepad(e.gamepad);
}

function onDisconnect(e) {
  console.log('onDisconnect', e.gamepad);
  removeGamepad(e.gamepad);
}

function addGamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  const d = document.createElement('div');
  d.setAttribute('id', 'controller' + gamepad.index);
  d.className = 'controller';

  // header
  {
    const controllerHeader = document.createElement('div');
    controllerHeader.className = 'controllerHeader';

    const t = document.createElement('h1');
    t.appendChild(document.createTextNode(gamepad.id));
    controllerHeader.appendChild(t);

    d.appendChild(controllerHeader);
  }

  // values
  const controllerValues = document.createElement('div');
  controllerValues.className = 'controllerValues';
  {
    // buttons table
    {
      const dd = document.createElement('div');
      dd.className = 'buttons';

      const tbl = document.createElement('table');

      {
        const caption = document.createElement('caption');
        const text = document.createTextNode('buttons');
        caption.appendChild(text);
        tbl.appendChild(caption);
      }

      {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        BUTTON_COLUMNS.forEach((column, index) => {
          const th = document.createElement('th');
          th.className = BUTTON_COLUMN_STYLES[index];

          const text = document.createTextNode(column);
          th.appendChild(text);
          tr.appendChild(th);
        });

        thead.appendChild(tr);
        tbl.appendChild(thead);
      }

      {
        const tbody = document.createElement('tbody');
        console.log(gamepad.buttons);

        for (let i = 0; i < gamepad.buttons.length; i++) {
          const tr = document.createElement('tr');

          BUTTON_COLUMNS.forEach((column, index) => {
            const td = document.createElement('td');
            td.className = BUTTON_COLUMN_STYLES[index];

            if (column === 'No.') {
              const text = document.createTextNode(i);
              td.appendChild(text);
            } else {
              const span = document.createElement('span');
              span.id = `button-${gamepad.index}-${column}-${i}`;
              td.appendChild(span);
            }

            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        }
        tbl.appendChild(tbody);
      }

      dd.appendChild(tbl);
      controllerValues.appendChild(dd);
    }

    // axes table
    {
      const dd = document.createElement('div');
      dd.className = 'axes';

      const tbl = document.createElement('table');

      {
        const caption = document.createElement('caption');
        const text = document.createTextNode('axes');
        caption.appendChild(text);
        tbl.appendChild(caption);
      }

      {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        AXIS_COLUMNS.forEach((column, index) => {
          const th = document.createElement('th');
          th.className = AXIS_COLUMN_STYLES[index];
          const text = document.createTextNode(column);
          th.appendChild(text);
          tr.appendChild(th);
        });

        thead.appendChild(tr);
        tbl.appendChild(thead);
      }

      {
        const tbody = document.createElement('tbody');

        for (let i = 0; i < gamepad.axes.length; i++) {
          const tr = document.createElement('tr');

          AXIS_COLUMNS.forEach((column, index) => {
            const td = document.createElement('td');
            td.className = AXIS_COLUMN_STYLES[index];

            if (column === 'No.') {
              const text = document.createTextNode(i);
              td.appendChild(text);
            } else {
              const span = document.createElement('span');
              span.id = `axis-${gamepad.index}-value-${i}`;
              td.appendChild(span);
            }

            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        }
        tbl.appendChild(tbody);
      }

      dd.appendChild(tbl);
      controllerValues.appendChild(dd);
    }
    d.appendChild(controllerValues);
  }

  document.getElementById('start').style.display = 'none';
  document.body.appendChild(d);

  window.requestAnimationFrame(updateStatus);
}

function removeGamepad(gamepad) {
  const d = document.getElementById('controller' + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scanGamepads();

  for (let key in controllers) {
    const controller = controllers[key];

    // buttons
    for (let i = 0; i < controller.buttons.length; i++) {
      const button = controller.buttons[i];

      BUTTON_COLUMNS
        .filter(column => (column !== 'No.'))
        .forEach(column => {
          const t = document.getElementById(`button-${key}-${column}-${i}`);
          t.innerHTML = Reflect.get(button, column);
        });
    }

    // axes
    for (let i = 0; i < controller.axes.length; i++) {
      const value = controller.axes[i];

      const t = document.getElementById(`axis-${key}-value-${i}`);
      t.innerHTML = value;
    }
  }

  window.requestAnimationFrame(updateStatus);
}

function scanGamepads() {
  const gamepads = navigator.getGamepads();
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

window.addEventListener('gamepadconnected', onConnect);
window.addEventListener('gamepaddisconnected', onDisconnect);
