function I(cmd: string) {
  return ({ width = 24, height = 24, color = "currentColor" }) => {
    return (
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={color}
        viewBox="0 0 24 24"
      >
        <path d={cmd} />
      </svg>
    );
  }
}

export const Brush = I("M0 21.398c5.504.456 3.533-5.392 8.626-5.445l2.206 1.841c.549 6.645-7.579 8.127-10.832 3.604zm16.878-8.538c1.713-2.687 7.016-11.698 7.016-11.698.423-.747-.515-1.528-1.17-.976 0 0-7.887 6.857-10.213 9.03-1.838 1.719-1.846 2.504-2.441 5.336l2.016 1.681c2.67-1.098 3.439-1.248 4.792-3.373z");
export const Eraser = I("M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z");
export const Rect = I("M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5z");
export const Circle = I("M12 0c-6.623 0-12 5.377-12 12s5.377 12 12 12 12-5.377 12-12-5.377-12-12-12zm0 22c-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10 5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10z");
export const Line = I("M0 10h24v4h-24z");
export const Eyedropper = I("M18.896 7.104c-.682.6-.753 1.638-.153 2.324l-1.239 1.083-5.416-6.198 1.239-1.082c.599.684 1.638.753 2.32.154l3.246-2.776c.47-.407 1.048-.609 1.625-.609 1.38 0 2.482 1.128 2.482 2.471 0 .73-.322 1.393-.854 1.858l-3.25 2.775zm-6.943 3.896h-2.5l3.562-3.123-1.085-1.24-7.339 6.387c-1.189 1.033-.368 1.831-1.348 3.195-.133.186-.21.372-.231.55-.066.54.325.995.817 1.056.194.023.41-.015.616-.137 1.55-.912 2.178.117 3.396-.947l7.34-6.384-1.081-1.241-2.147 1.884zm-9.106 7.5c-.535 2.053-1.847 2.335-1.847 3.684 0 1.003.834 1.816 1.847 1.816s1.834-.813 1.834-1.816c0-1.349-1.299-1.631-1.834-3.684z");
export const Undo = I("M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z");
export const Redo = I("M5.115 3.515c4.617-4.618 12.056-4.676 16.756-.195l2.129-2.258v7.938h-7.484l2.066-2.191c-2.82-2.706-7.297-2.676-10.073.1-4.341 4.341-1.737 12.291 5.491 12.291v4.8c-3.708 0-6.614-1.244-8.885-3.515-4.686-4.686-4.686-12.284 0-16.97z");
export const GitHub = I("M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z");
export const Download = I("M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18 1h4v-7h4v7h4l-6 6-6-6z");

