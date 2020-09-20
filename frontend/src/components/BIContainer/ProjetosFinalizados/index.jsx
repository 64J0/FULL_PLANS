import React, { useRef, useEffect, useMemo, useState } from "react";
import Chartjs from "chart.js";

import { primary } from "../../../styles/colorThemes";
import { useProjects } from "../../../hooks/projects";

import { Container } from "./styles";

function ProjetosFinalizados() {
  const canvasEl = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const { projetos } = useProjects();

  const memoizedPlotData = useMemo(() => {
    // Formato da documentação
    let plotData = {
      datasets: [{
        data: [],
        label: "Quantidade de projetos finalizados em cada mês",
        borderColor: primary["700"],
        backgroundColor: primary["100"]
      }],
      labels: []
    };

    // Inicializa os valores dos arrays automaticamente
    for (let cont = 1; cont <= 12; cont++) {
      plotData.datasets[0].data.push(0);
      plotData.labels.push(cont);
    }

    projetos && projetos.map((projeto) => {
      if (!projeto.dataArquivado || !projeto.arquivado) {
        return undefined;
      }

      const todaysDate = new Date();
      const thisYear = todaysDate.getFullYear();
      const archivedDate = new Date(projeto.dataArquivado);
      const archivedMonth = archivedDate.getMonth();
      const archivedYear = archivedDate.getFullYear();

      if (archivedYear !== thisYear) {
        return undefined;
      }

      return plotData.datasets[0].data[archivedMonth]++;
    });

    console.log(plotData);
    return plotData;
  }, [projetos]);

  useEffect(() => {
    let chartConfig = {
      type: "line",
      data: memoizedPlotData,
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "PROJETOS FINALIZADOS",
        },
        animation: {
          animateScale: true,
          animateRotate: true
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

export default ProjetosFinalizados;