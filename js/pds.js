(() => {
  const section = document.body.dataset.section;
  if (!section) return;

  let recordId = new URLSearchParams(window.location.search).get("id");
  let recordLoaded = !recordId;
  let recordLoadError;

  function showStatus(message, type = "danger") {
    let status = document.getElementById("pdsStatus");
    if (!status) {
      status = document.createElement("div");
      status.id = "pdsStatus";
      status.setAttribute("role", "alert");
      status.className = "container alert";
      document.body.insertBefore(status, document.body.firstChild);
    }
    status.textContent = message;
    status.className = `container alert alert-${type}`;
    status.hidden = false;
  }

  async function requestJson(url, options) {
    const response = await fetch(url, options);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("The server did not return JSON. Open this project through XAMPP Apache.");
    }
    if (!response.ok) throw new Error(data.error || "The PDS request failed.");
    return data;
  }

  function restoreValues(values) {
    for (const [id, value] of Object.entries(values)) {
      if (id === "children") continue;
      const field = document.getElementById(id);
      if (!field) continue;
      if (field.type === "checkbox") {
        field.checked = value === true || value === 1 || value === "1";
      } else {
        field.value = value == null ? "" : value;
      }
    }

    const spouseFields = document.querySelectorAll(".spouse-field");
    spouseFields.forEach((field) => {
      field.disabled = document.getElementById("noSpouse").checked;
    });

    if (section === "personal") {
      const sameAddress = document.getElementById("sameAsResidential");
      document.querySelectorAll(".permanent-address").forEach((field) => {
        field.disabled = sameAddress.checked;
      });
      document.getElementById("dualCitizenshipFields").hidden =
        document.getElementById("citizenship").value !== "dual";
    }

    if (section === "family") {
      const container = document.getElementById("childrenContainer");
      const baseEntry = container.querySelector(".child-entry[data-base]");
      container.querySelectorAll(".child-entry:not([data-base])").forEach((entry) => entry.remove());
      baseEntry.querySelector("#childFullName").value = "";
      baseEntry.querySelector("#childDateOfBirth").value = "";

      (Array.isArray(values.children) ? values.children : []).forEach((child, index) => {
        let entry = baseEntry;
        if (index > 0) {
          document.getElementById("addChildBtn").click();
          entry = container.querySelectorAll(".child-entry")[index];
        }
        entry.querySelector(".child-field[id^='childFullName']").value = child.fullName || "";
        entry.querySelector(".child-field[id^='childDateOfBirth']").value = child.dateOfBirth || "";
      });

      const noChildren = document.getElementById("noChildren").checked;
      document.querySelectorAll(".child-field").forEach((field) => {
        field.disabled = noChildren;
      });
      document.getElementById("addChildBtn").disabled = noChildren;
    }
  }

  async function loadRecord() {
    if (!recordId) return;
    const record = await requestJson(`database/read_pds.php?id=${encodeURIComponent(recordId)}`);
    recordId = String(record.id);
    if (record.data && record.data[section]) restoreValues(record.data[section]);
    recordLoaded = true;
  }

  function collectValues() {
    const values = {};
    document.querySelectorAll("input[id], select[id], textarea[id]").forEach((field) => {
      if (field.classList.contains("child-field")) return;
      values[field.id] = field.type === "checkbox" ? field.checked : field.value;
    });
    if (section === "family") {
      values.children = Array.from(document.querySelectorAll("#childrenContainer .child-entry")).map((entry) => ({
        fullName: entry.querySelector(".child-field[id^='childFullName']").value,
        dateOfBirth: entry.querySelector(".child-field[id^='childDateOfBirth']").value,
      }));
    }
    return values;
  }

  async function saveSection() {
    await recordReady;
    if (!recordLoaded) {
      throw recordLoadError || new Error("The selected PDS record could not be loaded.");
    }

    const endpoint = recordId ? "database/update_pds.php" : "database/save_pds.php";
    const result = await requestJson(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recordId, section, values: collectValues() }),
    });
    recordId = String(result.id);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("id", recordId);
    window.history.replaceState(null, "", currentUrl);
  }

  const recordReady = loadRecord().catch((error) => {
    recordLoadError = error;
    showStatus(error.message);
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", async (event) => {
      const target = new URL(link.href, window.location.href);
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        target.origin !== window.location.origin ||
        !/\.(html|php)$/.test(target.pathname)
      ) return;

      event.preventDefault();
      try {
        await saveSection();
        if (target.pathname.endsWith(".html") && !target.pathname.endsWith("records.html")) {
          target.searchParams.set("id", recordId);
        }
        window.location.assign(target);
      } catch (error) {
        showStatus(error.message);
      }
    });
  });

  const submit = document.getElementById("submitBtn");
  if (submit) {
    submit.addEventListener("click", async (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      try {
        await saveSection();
        window.location.assign("database/view_pds.php");
      } catch (error) {
        showStatus(error.message);
      }
    });
  }
})();
