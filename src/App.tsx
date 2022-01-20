import { useState, useEffect, useRef } from 'react';
import { TrigViz } from './TrigViz';
import draw from './ferris-wheel';
import './App.css';
import { FerrisWheel } from './FerrisWheel';

function App() {
  const frameRate = 60 / 1000;
  const [revolutionsPerMin, setRevolutionsPerMin] = useState(1);
  const [isRunning, setRunning] = useState(false);
  const isRunningRef = useRef(isRunning);
  const [buttonLabel, setButtonLabel] = useState('Start the Ferris Wheel');
  const [time, setTime] = useState(0);
  const [angle, setAngle] = useState(0);
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

  const next = () => {
    console.log(`@next (${isRunning} / ${isRunningRef.current})`);

    // Never sees the updated value to isRunning due to the closure, but the reference doesn't help... 🤔
    // if (!isRunningRef.current) return;

    let t = timeRef.current;
    t += 1 / 10;

    timeRef.current = t;
    setTime(t);

    let step = (360 / 60) * revolutionsPerMin; // 6 degrees per second
    let new_angle = ((t % 60) * step) % 360;
    setAngle(new_angle);

    console.log(`Set angle to ${new_angle}.`);
  };

  useEffect(() => {
    console.log('@useEffect');
    let interval = setInterval(next, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Froggy 🐸 Trig</p>

        <FerrisWheel angle={angle} />

        <p>
          <button type="button" onClick={() => startStopButton()}>
            {buttonLabel}
          </button>
        </p>
        <p>🐸 stats</p>
        <ul>
          <li>Time: {time.toFixed(1)}</li>
          <li>Height: {stats.current}</li>
          <li>Max height: {stats.max}</li>
          <li>Min height: {stats.min}</li>
        </ul>

        <p>
          Revolutions per minute:
          <input
            type="number"
            value={revolutionsPerMin}
            onChange={(evt) => {
              setRevolutionsPerMin(evt.target.valueAsNumber);
            }}
          />
        </p>

        <TrigViz angle={angle} />

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
