import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isRunning, setRunning] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Start the Ferris Wheel');
  const [time, setTime] = useState(0);
  const timeRef = useRef(time);
  const [stats, setStats] = useState({ current: 2, min: 1, max: 3 });
  const startStopButton = () => {
    if (isRunning) {
      setRunning(false);
      setButtonLabel('Start');
    } else {
      setRunning(true);
      setButtonLabel('Stop');
    }
  };
  const draw = (t: number) => {
    console.log('@draw t=', t);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  };

  const next = () => {
    console.log('@next');
    let t = timeRef.current;
    t += 1;

    draw(t);

    timeRef.current = t;
    setTime(t);
  };

  useEffect(() => {
    console.log('@useEffect');
    setInterval(next, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Froggy 🐸 Trigonometry</p>

        <canvas id="canvas" width="400" height="400">
          What kind of browser are you sporting there? You need a new one!
        </canvas>
        <p>
          <button type="button" onClick={() => startStopButton()}>
            {buttonLabel}
          </button>
        </p>
        <p>🐸 stats</p>
        <ul>
          <li>Time: {time}</li>
          <li>Height: {stats.current}</li>
          <li>Max height: {stats.max}</li>
          <li>Min height: {stats.min}</li>
        </ul>

        <p>
          <a
            className="App-link"
            href="https://www.wolframalpha.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WolframAlpha
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://www.desmos.com/calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Desmos Graphing Calculator
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
