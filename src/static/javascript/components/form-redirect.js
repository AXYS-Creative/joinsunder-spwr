if (document.querySelector(".form-redirect")) {
  // Telephone Regex
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
  });

  // Textarea max character count
  const textarea = document.querySelector(".form-redirect .input--textarea");
  const nestedLabel = document.querySelector(".form-redirect .nested-label");
  const checkbox = document.querySelector(".form-redirect .checkbox");
  const captchaContainer = document.querySelector(".recaptcha");
  const expandBtn = document.querySelector(".compliance-expand-btn");
  const formBlockCompliance = document.querySelector(".form-block--compliance");
  const maxLength = textarea?.maxLength;

  const updateCharCount = () => {
    const remaining = maxLength - textarea.value.length;
    if (nestedLabel) {
      nestedLabel.textContent =
        remaining === maxLength
          ? `Max — ${maxLength} characters`
          : `${remaining} character${remaining === 1 ? "" : "s"} remaining`;
    }
  };

  if (maxLength) {
    updateCharCount();
    textarea.addEventListener("input", updateCharCount);
  }

  // reCAPTCHA submit guard
  if (captchaContainer) {
    const form = captchaContainer.closest("form");
    const submitBtn = form?.querySelector('[type="submit"]');

    if (form && submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-disabled", "true");

      const enableIfSolved = () => {
        const response = form.querySelector(
          'textarea[name="g-recaptcha-response"]',
        );
        const isSolved = response && response.value.length > 0;
        submitBtn.disabled = !isSolved;
        submitBtn.setAttribute("aria-disabled", String(!isSolved));
      };

      new MutationObserver(enableIfSolved).observe(form, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      setInterval(enableIfSolved, 300);
    }
  }

  expandBtn?.addEventListener("click", () => {
    formBlockCompliance.classList.toggle("form-block--compliance--expanded");
    expandBtn.setAttribute(
      "aria-label",
      formBlockCompliance.classList.contains("form-block--compliance--expanded")
        ? "Collapse compliance message"
        : "Expand compliance message",
    );
  });
}
