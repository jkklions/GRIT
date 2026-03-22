const outcome = document.getElementById('outcome');
const outcomes = {
  rush: 'Grit launches at the command ship. High risk, maximum chaos.',
  protect: 'Grit prioritizes the den. The story turns into a defense arc.',
  signal: 'Grit broadcasts coordinates. Survivor factions begin to unite.'
};
document.querySelectorAll('.choice-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (outcome) {
      outcome.textContent = outcomes[btn.dataset.outcome] || 'Path selected.';
    }
  });
});

function bindResistance(buttonId, meterId, textId, resetId) {
  const resistBtn = document.getElementById(buttonId);
  const resistMeter = document.getElementById(meterId);
  const resistText = document.getElementById(textId);
  const resistReset = document.getElementById(resetId);
  let resistLevel = 20;

  if (resistBtn && resistMeter && resistText) {
    resistBtn.addEventListener('click', () => {
      resistLevel = Math.min(resistLevel + 12, 100);
      resistMeter.style.width = `${resistLevel}%`;
      resistText.textContent = `Resistance: ${resistLevel}%`;
      if (resistLevel === 100) resistText.textContent += ' // Fear pulse defeated';
    });
  }

  if (resistReset && resistMeter && resistText) {
    resistReset.addEventListener('click', () => {
      resistLevel = 20;
      resistMeter.style.width = '20%';
      resistText.textContent = 'Resistance: 20%';
    });
  }
}

function bindSplit(buttonClass, textId) {
  const splitText = document.getElementById(textId);
  document.querySelectorAll(`.${buttonClass}`).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!splitText) return;
      splitText.textContent = btn.dataset.score === '1'
        ? 'Trust level: MAXIMUM. Lilly and Grit move as one.'
        : 'Trust level: unstable. Survival drops in later acts.';
    });
  });
}

function bindAnomaly(buttonClass, meterId, textId, resetId) {
  let anomalyScore = 20;
  const anomalyMeter = document.getElementById(meterId);
  const anomalyText = document.getElementById(textId);
  const anomalyReset = document.getElementById(resetId);

  document.querySelectorAll(`.${buttonClass}`).forEach((btn) => {
    btn.addEventListener('click', () => {
      anomalyScore = Math.min(anomalyScore + Number(btn.dataset.points || 0), 100);
      if (anomalyMeter) anomalyMeter.style.width = `${anomalyScore}%`;
      if (anomalyText) anomalyText.textContent = `Anomaly score: ${anomalyScore}%`;
    });
  });

  if (anomalyReset && anomalyMeter && anomalyText) {
    anomalyReset.addEventListener('click', () => {
      anomalyScore = 20;
      anomalyMeter.style.width = '20%';
      anomalyText.textContent = 'Anomaly score: 20%';
    });
  }
}

bindResistance('resist-btn', 'resist-meter', 'resist-text', 'resist-reset');
bindResistance('resist-btn-home', 'resist-meter-home', 'resist-text-home', 'resist-reset-home');
bindSplit('split-choice', 'split-text');
bindSplit('split-choice-home', 'split-text-home');
bindAnomaly('anomaly-choice', 'anomaly-meter', 'anomaly-text', 'anomaly-reset');
bindAnomaly('anomaly-choice-home', 'anomaly-meter-home', 'anomaly-text-home', 'anomaly-reset-home');

const copyCaBtn = document.getElementById('copy-ca');
const caValue = document.getElementById('ca-value');
const copyStatus = document.getElementById('copy-status');

async function copyContractAddress() {
  if (!caValue || !copyStatus) return;
  const text = caValue.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'Copied! Paste it directly into your wallet/swap.';
  } catch {
    const helper = document.createElement('textarea');
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    document.body.removeChild(helper);
    copyStatus.textContent = 'Copied! Paste it directly into your wallet/swap.';
  }
}

if (copyCaBtn) {
  copyCaBtn.addEventListener('click', copyContractAddress);
}
