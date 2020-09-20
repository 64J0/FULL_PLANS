import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import Chartjs from "chart.js";

import { useProjects } from "../../../hooks/projects";

import { Container } from "./styles";

function ProjetosStatus() {
  const canvasEl = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const { projetos } = useProjects();

  const randomColor = useCallback(() => {
    return (Math.random() * 255);
  }, []);

  const memoizedPlotData = useMemo(() => {
    // Formato da documentação
    let plotData = {
      datasets: [{
        data: [],
        backgroundColor: []
      }],
      labels: []
    };

    projetos && projetos.map((projeto) => {
      const projectStatus = projeto.status || "NOVO PROJETO";

      const statusIndex = plotData.labels.findIndex((label) => {
        return label === projectStatus ? label : undefined;
      });

      if (statusIndex < 0) {
        plotData.datasets[0].data.push(1);
        const randomRGB = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        plotData.datasets[0].backgroundColor.push(randomRGB);
        return plotData.labels.push(projectStatus);
      }

      return plotData.datasets[0].data[statusIndex]++;
    });

    return plotData;
  }, [projetos, randomColor]);

  useEffect(() => {
    let chartConfig = {
      type: "doughnut",
      data: memoizedPlotData,
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "STATUS DOS PROJETOS",
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
    };

    if (canvasEl.current) {
      chartInstance && chartInstance.destroy();
      const newChartInstance = new Chartjs(
        canvasEl.current.getContext("2d"),
        chartConfig
      );
      setChartInstance(newChartInstance);
    }
    // eslint-disable-next-line
  }, [memoizedPlotData]);

  return (
    <Container>
      <canvas ref={canvasEl} />
    </Container>
  );
}

export default ProjetosStatus;