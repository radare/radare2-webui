/* TODO
 * - add timestamp
 * - support tabs and console
 */
var statusLog = [];
var Mode = {
	LINE: 0,
	HALF: 1,
	FULL: 2
};
var statusMode = Mode.LINE;
var statusTimeout = null;

function getStatusbarBody() {
	var msg = '<div class>';
	msg += '<a href="javascript:statusToggle()">[v]</a>&nbsp;';
	msg += '<a href="javascript:statusFullscreen()">[^]</a>&nbsp;';
	msg += '<a href="javascript:statusFullscreen()">[$]</a>';
	msg += '<hr size="1" width="100%" />';
	msg += '</div>';
	return msg + statusLog.join('<br />');
}

function statusMessage(x, t) {
	var statusbar = document.getElementById('statusbar');
	if (x) {
		statusLog.push(x);
	}
	if (statusMode === Mode.LINE) {
		statusbar.innerHTML = x;
		if (statusTimeout !== null) {
			clearTimeout(statusTimeout);
			statusTimeout = null;
		}
		if (t !== undefined) {
			statusTimeout = setTimeout(function() {
				statusMessage('&nbsp;');
			}, t * 1000);
		}
	} else {
		statusbar.innerHTML = getStatusbarBody();
	}
}

function statusToggle() {
	var statusbar = document.getElementById('statusbar');
	if (statusMode == Mode.HALF) {
		statusMode = Mode.LINE;
		statusbar.style.overflow = 'hidden';
		statusbar.innerHTML = '&nbsp;';
		try {
			statusbar.parentNode.classList.remove('half');
			statusbar.parentNode.classList.remove('full');
		} catch (e) {
		}
	} else {
		statusbar.innerHTML = getStatusbarBody();
		statusbar.style.overflow = 'scroll';
		statusMode = Mode.HALF;
		try {
			statusbar.parentNode.classList.remove('full');
		} catch (e) {
		}
		statusbar.parentNode.classList.add('half');
	}
}

function statusFullscreen() {
	var statusbar = document.getElementById('statusbar');
	if (statusMode == Mode.FULL) {
		statusbar.style.overflow = 'scroll';
		statusMode = Mode.HALF;
		try {
			statusbar.parentNode.classList.remove('full');
		} catch (e) {
		}
		statusbar.parentNode.classList.add('half');
	} else {
		statusMode = Mode.FULL;
		statusbar.style.overflow = 'scroll';
		statusbar.innerHTML = getStatusbarBody();
		try {
			statusbar.parentNode.classList.remove('half');
		} catch (e) {
			/* do nothing */
		}
		statusbar.parentNode.classList.add('full');
	}
}

function statusInitialize() {
	var statusbar = document.getElementById('statusbar');
	statusbar.innerHTML = '';
	statusbar.parentNode.addEventListener('click', function() {
		if (statusMode == Mode.LINE) {
			statusToggle();
		}
	});
	statusMessage('Loading webui...', 2);
}

statusInitialize();