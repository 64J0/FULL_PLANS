import React, { useRef, useEffect, useMemo, useState } from "react";
import Chartjs from "chart.js";

import { primary } from "../../../styles/colorThemes";
import { useProjects } from "../../../hooks/projects";

import { Container } from "./styles";

function ProjetosCadastrados() {
  const canvasEl = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const { projetos } = useProjects();

  const memoizedPlotData = useMemo(() => {
    let plotData = {
      x: [],
      y: []
    };

    let thisYear = new Date().getFullYear();

    for (let cont = 0; cont < 12; cont++) {
      plotData.x.push(cont + 1);
      plotData.y.push(0);
    }

    projetos && projetos.map((projeto) => {
      const projectDate = new Date(projeto.createdAt);

      if (projectDate.getFullYear() !== thisYear) {
        return null;
      }

      const indice = projectDate.getMonth();
      return plotData.y[indice]++;
    });

    return plotData;
  }, [projetos]);

  useEffect(() => {
    let chartConfig = {
      type: "bar",
      data: {
        labels: memoizedPlotData.x,
        datasets: [
          {
            label: "Quantidade de projetos cadastrados",
            backgroundColor: primary["900"],
            data: memoizedPlotData.y,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Projetos cadastrados neste ano",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Mês",
              },
            },
          ],
        },
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

export default ProjetosCadastrados;