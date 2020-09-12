import api from "../services/api";

export default async function gerarRelatorio(projeto) {
  // js-file-download Package:
  var jsFileDownload = function (data, filename, bom) {
    var blobData = typeof bom !== "undefined" ? [bom, data] : [data];

    var blob = new Blob(blobData, {
      type: "application/pdf",
    });

    if (typeof window.navigator.msSaveBlob !== "undefined") {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      var blobURL = (window.URL
        ? window.URL
        : window.webkitURL
      ).createObjectURL(blob);

      var tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", filename);

      if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
      }

      document.body.appendChild(tempLink);
      tempLink.click();

      // Fixes "webkit blob resource error 1"
      setTimeout(function () {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      }, 0);
    }
  };

  await api
    .get(`/generatepdf/${projeto._id}`, { responseType: "arraybuffer" })
    .then((response) => {
      var fileName = String(`Relatorio_${projeto.numGRD}.pdf`);
      jsFileDownload(response.data, fileName);
    })
    .catch((err) => {
      console.log(err);
    });
}