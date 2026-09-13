document.addEventListener("DOMContentLoaded", () => {
  AudioSys.init();
  Game.init();
  UI.updateMenu();
  UI.showScreen("screen-menu");

  // Prevenir zoom y scroll no deseado en móvil
  document.addEventListener("gesturestart", e => e.preventDefault());
  document.addEventListener("gesturechange", e => e.preventDefault());
});
