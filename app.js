'use strict';

const controllers = {};

const BUTTON_COLUMNS = ['No.', 'pressed', 'touched', 'value'];
const AXIS_COLUMNS = ['No.', 'value'];

function onConnect(e) {
  addGamepad(e.gamepad);
}

function onDisconnect(e) {
  removeGamepad(e.gamepad);
}

function addGamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  const d = document.createElement('div');
  d.setAttribute('id', 'controller' + gamepad.index);

  // title
  {
    const t = document.createElement("h1");
    t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
    d.appendChild(t);
  }

  // buttons table
  {
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

      BUTTON_COLUMNS.forEach(column => {
        const th = document.createElement('th');
        const text = document.createTextNode(column);
        th.appendChild(text);
        tr.appendChild(th);
      });

      thead.appendChild(tr);
      tbl.appendChild(thead);
    }

    {
      const tbody = document.createElement('tbody');

      for (let i = 0; i < gamepad.buttons.length; i++) {
        const tr = document.createElement('tr');

        BUTTON_COLUMNS.forEach(column => {
          const td = document.createElement('td');

          if (column === 'No.') {
            const text = document.createTextNode(i);
            td.appendChild(text);
          } else {
            const span = document.createElement('span');
            span.id = "button-" + column + "-" + i;
            td.appendChild(span);
          }

          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
    }

    tbl.setAttribute("border", "1");

    d.appendChild(tbl);
  }

  // axes table
  {
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

      AXIS_COLUMNS.forEach(column => {
        const th = document.createElement('th');
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

        AXIS_COLUMNS.forEach(column => {
          const td = document.createElement('td');

          if (column === 'No.') {
            const text = document.createTextNode(i);
            td.appendChild(text);
          } else {
            const span = document.createElement('span');
            span.id = "axis-" + column + "-" + i;
            td.appendChild(span);
          }

          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
    }

    tbl.setAttribute("border", "1");
    d.appendChild(tbl);
  }

  document.getElementById("start").style.display = "none";
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
          const t = document.getElementById('button-' + column + '-' + i);
          t.innerHTML = Reflect.get(button, column);
        });
    }

    // axes
    for (let i = 0; i < controller.axes.length; i++) {
      const value = controller.axes[i];

      const t = document.getElementById("axis-value-" + i);
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

window.addEventListener("gamepadconnected", onConnect);
window.addEventListener("gamepaddisconnected", onDisconnect);
