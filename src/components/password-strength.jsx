export default function PasswordStrength({ password = "" }) {
  const score = getScore(password);
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500","bg-red-400","bg-yellow-400","bg-blue-400","bg-green-500"];

  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-md bg-gray-100 overflow-hidden">
        <div className={`h-full ${colors[score]} transition-all`} style={{ width: `${(score / 4) * 100}%` }} />
      </div>
      <div className="mt-1 text-xs font-medium text-gray-600">{labels[score]}</div>
    </div>
  );
}

function getScore(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, score);
}
