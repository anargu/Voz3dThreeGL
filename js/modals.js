
$("#modal").iziModal({
  title: 'Dejanos tu feedback',
  subtitle: 'Para seguir mejorando ;)',
  headerColor: '#646eff',
  theme: 'Light',
  fullscreen: true,
  focusInput: false
});
$(document).on('click', '.trigger', function (event) {
  event.preventDefault();
  $('#modal').iziModal('open');
});