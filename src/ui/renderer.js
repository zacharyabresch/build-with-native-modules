import jQuery from 'jquery';
import { ipcRenderer } from 'electron';

const $ = jQuery;

$(() => {
  console.log('ready!');

  $('#triggerBtn').on('click', (event) => {
    event.preventDefault();
    ipcRenderer.send('trigger-clicked', 'poops');
  });
});
