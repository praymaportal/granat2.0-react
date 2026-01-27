import { Button } from '../button';

export default function App() {
  return (
    <div className="dev-shell">
      <header className="dev-hero">
        <p className="dev-kicker">Granat UI</p>
        <h1>Корпоративная библиотека компонентов</h1>
        <p className="dev-subtitle">
          Стартовая сцена для разработки. Всё написано с нуля, структура как в PrimeReact.
        </p>
        <div className="dev-actions">
          <Button label="Основная кнопка" />
          <Button label="Контрастная" severity="contrast" />
          <Button label="Контур" variant="outline" />
        </div>
      </header>
    </div>
  );
}
