import React from 'react';
import { createRoot } from 'react-dom/client';
import '../resources/core/build/all.css';
import '../resources/core/build/class-tokens-common.css';
import '../resources/core/build/theme-tokens.css';
import '../resources/core/build/border-radius.css';
import '../resources/base/build/styles/main.css';
import '../resources/base/build/styles/typography-v3.css';
import './storybook/storybook.css';
import StorybookApp from './storybook/StorybookApp';

document.documentElement.setAttribute('data-mts-theme', 'light');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <StorybookApp />
  </React.StrictMode>
);
