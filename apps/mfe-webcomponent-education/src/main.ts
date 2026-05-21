import EducationApp from './components/EducationElement';

// Register the custom element
customElements.define('education-app', EducationApp);

// Mount to root
const root = document.getElementById('root');
if (root) {
  const app = document.createElement('education-app');
  root.appendChild(app);
}
