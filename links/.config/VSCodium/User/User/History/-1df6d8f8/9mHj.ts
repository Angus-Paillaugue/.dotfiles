export class Input {
  #question: string = '';
  constructor(question: string) {
    this.#question = question;
  }

  ask() {
    console.log(this.#question);
  }

  getAnswer() {
    return 'Answer';
  }
}
