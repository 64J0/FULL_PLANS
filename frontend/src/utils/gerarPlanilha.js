import api from '../services/api';

export default async function gerarPlanilha(projeto) {
  // js-file-download Package:
  var jsFileDownload = function (data, filename, mime, bom) {
    var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
    var blob = new Blob(blobData, {
      type: mime || "application/octet-stream",
    });
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
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
    .get(`/excel/${projeto._id}`, { responseType: "arraybuffer" })
    .then((response) => {
      var fileName = String(`GRD_${projeto.numGRD}.xlsx`);
      jsFileDownload(response.data, fileName);
    })
    .catch((err) => {
      console.log(err);
    });
}