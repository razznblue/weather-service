class CronJobInterval {
  constructor(name, expression) {
    this.name = name;
    this.expression = expression;
  }

  getName() {
    return this.name;
  }

  getExpression() {
    return this.expression;
  }
}

export default CronJobInterval;