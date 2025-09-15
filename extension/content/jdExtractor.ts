(() => {
  function extractJD() {
    const title = document
      .querySelector('h1, [data-testid="job-title"]')
      ?.textContent?.trim();
    const company = document
      .querySelector('.company, [data-company], [data-testid="company-name"]')
      ?.textContent?.trim();
    const location = document
      .querySelector('.location, [data-testid="job-location"]')
      ?.textContent?.trim();
    const bodyText = document.body.innerText.slice(0, 2000);

    return { url: window.location.href, title, company, location, bodyText };
  }

  chrome.runtime.onMessage.addListener((msg, sender, respond) => {
    if (msg.type === "EXTRACT_JD") {
      respond(extractJD());
    }
  });
})();
