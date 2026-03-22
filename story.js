 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/story.js b/story.js
new file mode 100644
index 0000000000000000000000000000000000000000..fef50d3a0e47176837c3260434dd2df42ae500e3
--- /dev/null
+++ b/story.js
@@ -0,0 +1,44 @@
+const outcome = document.getElementById('outcome');
+const outcomes = {
+  rush: 'Grit launches at the command ship. High risk, maximum chaos.',
+  protect: 'Grit prioritizes the den. The story turns into a defense arc.',
+  signal: 'Grit broadcasts coordinates. Survivor factions begin to unite.'
+};
+document.querySelectorAll('.choice-btn').forEach((btn) => {
+  btn.addEventListener('click', () => {
+    outcome.textContent = outcomes[btn.dataset.outcome] || 'Path selected.';
+  });
+});
+
+const resistBtn = document.getElementById('resist-btn');
+const resistMeter = document.getElementById('resist-meter');
+const resistText = document.getElementById('resist-text');
+let resistLevel = 20;
+if (resistBtn && resistMeter && resistText) {
+  resistBtn.addEventListener('click', () => {
+    resistLevel = Math.min(resistLevel + 12, 100);
+    resistMeter.style.width = `${resistLevel}%`;
+    resistText.textContent = `Resistance: ${resistLevel}%`;
+    if (resistLevel === 100) resistText.textContent += ' // Fear pulse defeated';
+  });
+}
+
+const splitText = document.getElementById('split-text');
+document.querySelectorAll('.split-choice').forEach((btn) => {
+  btn.addEventListener('click', () => {
+    splitText.textContent = btn.dataset.score === '1'
+      ? 'Trust level: MAXIMUM. Lilly and Grit move as one.'
+      : 'Trust level: unstable. Survival drops in later acts.';
+  });
+});
+
+let anomalyScore = 20;
+const anomalyMeter = document.getElementById('anomaly-meter');
+const anomalyText = document.getElementById('anomaly-text');
+document.querySelectorAll('.anomaly-choice').forEach((btn) => {
+  btn.addEventListener('click', () => {
+    anomalyScore = Math.min(anomalyScore + Number(btn.dataset.points || 0), 100);
+    if (anomalyMeter) anomalyMeter.style.width = `${anomalyScore}%`;
+    if (anomalyText) anomalyText.textContent = `Anomaly score: ${anomalyScore}%`;
+  });
+});
 
EOF
)
