import React, { useEffect } from "react";

import "./styles.css";

function PaginacaoBtn({ prop, setPage, page }) {
  useEffect(() => {
    function customizeActualPage() {
      const btn = document.getElementById(prop);
      if (prop === page) {
        return (btn.style.backgroundColor = "orange");
      }
      return (btn.style.backgroundColor = "transparent");
    }

    customizeActualPage();
  }, [prop, page]);

  return (
    <button id={prop} className="PaginacaoBtn" onClick={() => setPage(prop)}>
      {prop + 1}
    </button>
  );
}

export default PaginacaoBtn;
