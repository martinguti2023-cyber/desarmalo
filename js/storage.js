const Storage = {
  KEY: "desarmalo_v1",

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaults();
      return { ...this.defaults(), ...JSON.parse(raw) };
    } catch (e) {
      return this.defaults();
    }
  },

  defaults() {
    return {
      bestTime: null,
      bestScore: 0,
      maxLevel: 1,
      objectsCompleted: 0,
      totalErrors: 0,
      bestStreak: 0,
      currentStreak: 0,
      lastPlayed: null
    };
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage", e);
    }
  },

  update(partial) {
    const data = this.load();
    Object.assign(data, partial);
    this.save(data);
    return data;
  },

  recordSuccess(time, score, errors, difficulty) {
    const data = this.load();
    data.objectsCompleted += 1;
    data.totalErrors += errors;
    data.lastPlayed = Date.now();

    if (data.bestTime === null || time < data.bestTime) {
      data.bestTime = time;
    }
    if (score > data.bestScore) {
      data.bestScore = score;
    }
    if (difficulty > data.maxLevel) {
      data.maxLevel = difficulty;
    }

    if (errors === 0) {
      data.currentStreak += 1;
      if (data.currentStreak > data.bestStreak) {
        data.bestStreak = data.currentStreak;
      }
    } else {
      data.currentStreak = 0;
    }

    this.save(data);
    return data;
  },

  recordFail() {
    const data = this.load();
    data.currentStreak = 0;
    data.lastPlayed = Date.now();
    this.save(data);
    return data;
  }
};
