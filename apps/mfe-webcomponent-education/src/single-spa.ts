import { emitMfeError, emitMfeState } from "@my-portal/utils";
import EducationApp from './components/EducationElement';

let domElement: HTMLElement | null = null;
let appRoot: HTMLElement | null = null;

export async function bootstrap() {
  if (!customElements.get('education-app')) {
    customElements.define('education-app', EducationApp);
  }
  return Promise.resolve();
}

export async function mount(props: { domElementGetter: () => HTMLElement }) {
  emitMfeState('mfe-webcomponent-education', 'loading', 'Preparing Web Components education page...');
  try {
    domElement = props.domElementGetter();
    if (!domElement) throw new Error('Missing dom element for education MFE');
    domElement.innerHTML = '';
    appRoot = document.createElement('education-app');
    domElement.appendChild(appRoot);
    emitMfeState('mfe-webcomponent-education', 'ready', 'Web Components education page is ready.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    emitMfeError('mfe-webcomponent-education', message);
    return Promise.reject(error);
  }
  return Promise.resolve();
}

export async function unmount() {
  if (domElement && appRoot) {
    domElement.removeChild(appRoot);
    appRoot = null;
  }
  return Promise.resolve();
}
