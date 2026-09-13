const Share = {
  async shareResult(objectName, time, errors) {
    const timeStr = Scoring.formatTime(time);
    const text = `Armé una ${objectName.toLowerCase()} en ${timeStr} segundos 😎\n¿Podés hacerlo más rápido?\n\nDESARMALO`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "DESARMALO",
          text: text
        });
        return true;
      } catch (e) {}
    }

    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return "copied";
    }
  }
};
