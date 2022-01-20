// Visualize the trigonometric values
//
// Based on Henrique Müller's outstanding CodePen example @ https://codepen.io/hbmuller/pen/wKRGMd

function toRad(deg: number) {
  return (deg / 180) * Math.PI;
}

type TrigVizProps = {
  angle: number;
};

export function TrigViz(props: TrigVizProps) {
  let angle = props.angle;
  let originX = 200;
  let originY = 100;
  let radius = 100;
  let largeArc = angle > 180 ? 1 : 0;
  let sweep = false;
  let arcToX = 200;
  let arcToY = 100;

  var a = toRad(angle);
  arcToX = originX + radius * Math.sin(a);
  arcToY = originY + radius - radius * Math.cos(a);

  let arcPathString = `M${originX} ${originY} A ${radius} ${radius}, 0, ${largeArc}, 1, ${arcToX} ${arcToY}`;

  return (
    <svg width="640" height="480">
      <rect
        x="100"
        y="100"
        width="200"
        height="200"
        stroke="#5577aa"
        fill="transparent"
      />
      <path
        d="M200 100 L200 300 M100 200 L300 200"
        stroke="#5577aa"
        fill="transparent"
      />
      <text
        x="200"
        y="90"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="white"
      >
        0º
      </text>
      <text x="310" y="205" fontFamily="sans-serif" fontSize="15" fill="white">
        90º
      </text>
      <text
        x="200"
        y="320"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="white"
      >
        180º
      </text>
      <text
        x="90"
        y="205"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="end"
        fill="white"
      >
        360º
      </text>
      // Arc
      <path
        d={`M${originX} ${originY} A ${radius} ${radius}, 0, ${largeArc}, 1, ${arcToX} ${arcToY}`}
        fill="transparent"
        stroke="white"
        id="my-arc-01"
      />
      // Sin
      <path d="M100 350 L300 350" stroke="#5577aa" fill="transparent" />
      <path
        d={`M200 350 L${arcToX} 350`}
        stroke="white"
        id="line-sin"
        fill="transparent"
      />
      <text
        x="200"
        y="370"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="white"
      >
        Sin
      </text>
      <text x="310" y="355" fontFamily="sans-serif" fontSize="15" fill="white">
        1
      </text>
      <text
        x="90"
        y="355"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="end"
        fill="white"
      >
        -1
      </text>
      // Cos
      <path d="M350 100 L350 300" stroke="#5577aa" fill="transparent" />
      <path
        d={`M350 200 L 350 ${arcToY}`}
        stroke="white"
        id="line-cos"
        fill="transparent"
      />
      <text x="360" y="205" fontFamily="sans-serif" fontSize="15" fill="white">
        Cos
      </text>
      <text
        x="350"
        y="90"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="white"
      >
        1
      </text>
      <text
        x="350"
        y="320"
        fontFamily="sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="white"
      >
        -1
      </text>
      // Triangle
      <path
        d={`M200 200 L${arcToX} ${arcToY} L${arcToX} 200 L200 200`}
        stroke="#6688cc"
        strokeWidth="2"
        id="triangle-1"
        fill="transparent"
      />
      <path
        d={`M${arcToX} ${arcToY} L200 ${arcToY} L200 200`}
        stroke="#6688cc"
        strokeWidth="2"
        id="triangle-2"
        fill="transparent"
      />
    </svg>
  );
}
