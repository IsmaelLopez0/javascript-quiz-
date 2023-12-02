import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./store/types.d";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Footer } from "./Footer";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandlerClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex);
  };

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    console.log({ userSelectedAnswer });
    // usuario no ha seleccionado nada todavía
    if (userSelectedAnswer === undefined) return "transparent";
    // si ya seleccionó pero la solución es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return "transparent";
    // si la solucción es correcta
    if (index === correctAnswer) return "green";
    // si la selección  del usuario es incorrecta
    if (index === userSelectedAnswer) return "red";
    // si no es ninguna de las anteriores
    return "transparent";
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="js" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }}>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== undefined}
              onClick={() => createHandlerClick(index)}
              sx={{ bgcolor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBack />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
