import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export function Footer() {
  const { correct, incorrect, unanswer } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);
  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`Correctas ${correct} | Incorrectas ${incorrect} | Sin contestar ${unanswer}`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={reset}>Resetar juego</Button>
      </div>
    </footer>
  );
}
