"use client";

import React from "react";

export function KineticTicker() {
  const phrase = (
    <span>
      NO SHORTCUTS <i>✳</i> JUST THE WORK <i>✳</i> BUILT BY DISCIPLINE <i>✳</i> TRAIN WITH PURPOSE <i>✳</i>{" "}
    </span>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {phrase}
        {phrase}
        {phrase}
        {phrase}
      </div>
    </div>
  );
}
