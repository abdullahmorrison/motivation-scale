import * as React from "react"

function ExplanationIconClosed(props) {
  return (
    <svg
      width={41}
      height={25}
      viewBox="0 0 41 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x={0.5} y={0.5} width={40} height={24} rx={4.5} stroke="#000" />
      <path
        d="M10.5 15.2h7v1.6h-7v-1.6zm0-3.2h7v1.6h-7V12zm5.25-8h-7C7.787 4 7 4.72 7 5.6v12.8c0 .88.779 1.6 1.741 1.6H19.25c.962 0 1.75-.72 1.75-1.6V8.8L15.75 4zm3.5 14.4H8.75V5.6h6.125v4h4.375v8.8zM26 10l5 5 5-5H26z"
        fill="#000"
      />
    </svg>
  )
}

export default ExplanationIconClosed