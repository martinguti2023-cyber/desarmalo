const Scoring = {
  calculate(timeTaken, timeLimit, errors, pieces, difficulty, streak = 0) {
    const base = 800 + difficulty * 150;
    const speedRatio = Math.max(0, (timeLimit - timeTaken) / timeLimit);
    const speedBonus = Math.round(speedRatio * 600 * (1 + difficulty * 0.15));
    const precisionBonus = Math.max(0, 300 - errors * 80);
    const piecesBonus = pieces * 25;

    let total = base + speedBonus + precisionBonus + piecesBonus;

    const streakMult = 1 + Math.min(streak, 8) * 0.08;
    total = Math.round(total * streakMult);

    return {
      total,
      base,
      speedBonus,
      precisionBonus,
      piecesBonus,
      streakMult: Math.round(streakMult * 100) / 100
    };
  },

  formatTime(seconds) {
    return seconds.toFixed(2).replace(".", ",");
  }
};
