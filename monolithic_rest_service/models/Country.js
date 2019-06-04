module.exports = class Country {
  constructor(name, capital, population, languages, latitude, longitude, cur, flag) {
    this.name = name;
    this.capital = capital;
    this.population = population;
    this.languages = languages,
    this.location = { latitude, longitude},
    this.cur = cur,
    this.flag = flag
  }
};
