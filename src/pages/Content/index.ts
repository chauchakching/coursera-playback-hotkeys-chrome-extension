import hotkeyjs from 'hotkeys-js';

const playbackMsgDOMClassname = 'new-playback-rate-text';

const getPlaybackMsgDOM = () =>
  document.querySelector(`.${playbackMsgDOMClassname}`);

async function run() {
  console.log('run()');
  let cleanUpTimer: ReturnType<typeof setTimeout>;

  function showPlaybackRate() {
    const container = document.querySelector('.rc-VideoControlsContainer');

    if (container) {
      const newDiv = document.createElement('div');
      newDiv.textContent =
        document.querySelector(`.playback-rate-text`)?.textContent ?? '--';
      newDiv.className = playbackMsgDOMClassname;

      // Insert the new div as the first child of the container
      if (getPlaybackMsgDOM()) {
        getPlaybackMsgDOM()?.remove();
      }
      container.prepend(newDiv);

      if (cleanUpTimer) {
        clearTimeout(cleanUpTimer);
      }
      cleanUpTimer = setTimeout(function () {
        getPlaybackMsgDOM()?.remove();
      }, 1000);
    } else {
      console.log('Video container not loaded yet');
    }
  }

  console.log('going to register hotkeys...');
  hotkeyjs('shift+,', () => {
    (
      document.querySelector(
        '.playback-rate-change-controls .cif-minus'
      ) as HTMLElement
    ).click();
    setTimeout(() => {
      showPlaybackRate();
    }, 0);
  });
  hotkeyjs('shift+.', () => {
    (
      document.querySelector(
        '.playback-rate-change-controls .cif-plus'
      ) as HTMLElement
    ).click();
    setTimeout(() => {
      showPlaybackRate();
    }, 0);
  });
}

window.onload = () => {
  run();
};
