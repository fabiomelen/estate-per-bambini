import { cookies } from "next/headers";
import Alert from "@/components/alert";

const maxPlayAttempts = parseInt(process.env.MAX_PLAY_ATTEMPTS || "", 10);

export default function ResultPage({}) {
  const cookieStore = cookies();
  const error = cookieStore.get("error")?.value;
  const userUID = cookieStore.get("user_uid")?.value;
  const playAttempts = parseInt(
    cookieStore.get(`play_attempts_${userUID}`)?.value || "0",
    10,
  );

  if (error) {
    return <Alert>{error}</Alert>;
  }

  if (!userUID) {
    return <Alert>invalid user</Alert>;
  }

  if (isNaN(maxPlayAttempts)) {
    return <Alert>invalid MAX_PLAY_ATTEMPTS</Alert>;
  }

  return (
    <Alert type="success" title="You are the winner">
      You can play {maxPlayAttempts - playAttempts} more times.
    </Alert>
  );
}
