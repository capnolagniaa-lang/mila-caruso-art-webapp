(function () {
  const $ = (id) => document.getElementById(id);
  const grid = $("obras");
  const modal = $("modal");
  let config = {};
  let current = null;

  const money = (n) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: config.moneda || "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderGrid(obras) {
    grid.innerHTML = "";
    obras.forEach((obra) => {
      const card = el("article", "card");
      card.tabIndex = 0;

      const imgWrap = el("div", "card-img");
      const img = el("img");
      img.src = obra.imagen;
      img.alt = obra.titulo;
      img.loading = "lazy";
      imgWrap.appendChild(img);

      const meta = el("div", "card-meta");
      meta.appendChild(el("h3", "card-title", obra.titulo));
      meta.appendChild(el("p", "card-sub", obra.tecnica + " · " + obra.medidas));
      meta.appendChild(
        obra.vendida
          ? el("p", "card-price sold", "Vendida")
          : el("p", "card-price", money(obra.precio))
      );

      card.append(imgWrap, meta);
      card.addEventListener("click", () => open(obra));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") open(obra);
      });
      grid.appendChild(card);
    });
  }

  function open(obra) {
    current = obra;
    $("m-img").src = obra.imagen;
    $("m-img").alt = obra.titulo;
    $("m-title").textContent = obra.titulo;
    $("m-tecnica").textContent = obra.tecnica;
    $("m-medidas").textContent = obra.medidas;
    $("m-anio").textContent = obra.anio || "";
    $("m-anio").hidden = $("m-anio-label").hidden = !obra.anio;
    $("m-desc").textContent = obra.descripcion || "";
    $("m-price").textContent = obra.vendida ? "Vendida" : money(obra.precio);

    const buy = $("btn-buy");
    buy.disabled = !!obra.vendida;
    buy.textContent = obra.vendida ? "Vendida" : "Comprar";

    showStep("detail");
    modal.showModal();
  }

  function showStep(step) {
    $("step-detail").hidden = step !== "detail";
    $("step-pay").hidden = step !== "pay";
  }

  function showPay() {
    const obra = current;
    $("p-alias").textContent = config.alias;
    $("p-amount").textContent = money(obra.precio);
    $("p-title").textContent = obra.titulo;

    const msg = "Hola, transferí " + money(obra.precio) + " por la obra \"" + obra.titulo + "\". Adjunto el comprobante.";
    const receipt = $("btn-receipt");
    const wa = (config.whatsapp || "").replace(/\D/g, "");
    if (wa) {
      receipt.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);
      receipt.hidden = false;
    } else if (config.email) {
      receipt.href = "mailto:" + config.email + "?subject=" + encodeURIComponent("Compra: " + obra.titulo) + "&body=" + encodeURIComponent(msg);
      receipt.hidden = false;
    } else {
      receipt.hidden = true;
    }
    showStep("pay");
  }

  function toast(text) {
    const t = $("toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  async function copyAlias() {
    try {
      await navigator.clipboard.writeText(config.alias);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = config.alias;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast("Alias copiado");
  }

  function renderFooter() {
    const f = $("footer-contact");
    const parts = [];
    if (config.email) {
      const a = el("a", null, config.email);
      a.href = "mailto:" + config.email;
      parts.push(a);
    }
    if (config.instagram) {
      const a = el("a", null, "@" + config.instagram.replace(/^@/, ""));
      a.href = "https://instagram.com/" + config.instagram.replace(/^@/, "");
      a.target = "_blank";
      a.rel = "noopener";
      parts.push(a);
    }
    parts.forEach((p, i) => {
      if (i) f.append(" · ");
      f.append(p);
    });
    $("year").textContent = new Date().getFullYear();
  }

  $("btn-buy").addEventListener("click", showPay);
  $("btn-back").addEventListener("click", () => showStep("detail"));
  $("btn-copy").addEventListener("click", copyAlias);
  modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  fetch("data/obras.json", { cache: "no-cache" })
    .then((r) => r.json())
    .then((data) => {
      config = data.config || {};
      renderGrid(data.obras || []);
      renderFooter();
    })
    .catch(() => {
      grid.innerHTML = "";
    });
})();
