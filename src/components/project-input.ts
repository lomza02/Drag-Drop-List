import { inputValidation } from '../utils/validation';
import { Component } from './base-component';
import { projectState } from '../state/project';
import { AutoBinder } from '../decorators/autobinder';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;
  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.configure();
  }

  private getInputs(): [string, string, number] | void {
    const titleValue = this.titleInput.value;
    const descriptionValue = this.descriptionInput.value;
    const peopleValue = this.peopleInput.value;
    if (
      !inputValidation({
        value: titleValue,
        required: true,
        minLength: 1,
      }) ||
      !inputValidation({
        value: descriptionValue,
        required: true,
        minLength: 1,
      }) ||
      !inputValidation({
        value: +peopleValue,
        required: true,
        min: 0,
        max: 100,
      })
    ) {
      alert('Invalid input, please try again!');
      return;
    }
    return [titleValue, descriptionValue, +peopleValue];
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }

  @AutoBinder
  private submitHanlder(e: Event) {
    e.preventDefault();
    const inputs = this.getInputs();
    if (Array.isArray(inputs)) {
      const [title, description, people] = inputs;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHanlder);
  }
  renderContent() {}
}
