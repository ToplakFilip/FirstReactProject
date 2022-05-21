import React, { useEffect } from "react";
import "./ChartBar.css";
import ReactTooltip from "react-tooltip";

function ChartBar(props) {

  let barFillHeight = "0%";

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  const tooltipLabel = "Total cost: \n" + props.value.toFixed(2);

  return (
    <div className="chart-bar" data-tip={tooltipLabel}>
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
      <ReactTooltip backgroundColor="#2D3047" />
    </div>
  );
}

export default ChartBar;
