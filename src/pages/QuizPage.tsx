import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Stepper, Step, StepLabel, Button, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { useContent } from '@hooks/useContent';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { Quiz, QuizQuestion } from '@types/index';
import toast from 'react-hot-toast';

export const QuizPage: React.FC = () => {
  const { quizzes, isLoading, loadQuizzes } = useContent();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, []);

  if (isLoading && !quizzes.length) {
    return <LoadingScreen />;
  }

  if (!activeQuiz) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <TopBar title={t('common.quiz')} onMenuClick={toggleDrawer} />
        <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

        <Container maxWidth="lg" sx={{ pb: 12, pt: 2 }}>
          <Grid container spacing={2}>
            {quizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {quiz.description}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      {quiz.questions.length} questions
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setActiveQuiz(quiz);
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setShowResults(false);
                      }}
                    >
                      Commencer
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <BottomNav />
      </motion.div>
    );
  }

  const currentQuestion = activeQuiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / activeQuiz.questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <TopBar title={t('quiz.results')} onMenuClick={toggleDrawer} />
        <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

        <Container maxWidth="sm" sx={{ pb: 12, pt: 2, textAlign: 'center' }}>
          <Box sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Score: {score}%
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Vous avez répondu correctement à {Math.round((score / 100) * activeQuiz.questions.length)} sur {activeQuiz.questions.length} questions.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveQuiz(null)}
              sx={{ mr: 1 }}
            >
              Retour aux quiz
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
                setShowResults(false);
              }}
            >
              Recommencer
            </Button>
          </Box>
        </Container>

        <BottomNav />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={activeQuiz.title} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="sm" sx={{ pb: 12, pt: 2 }}>
        <Stepper activeStep={currentQuestionIndex} sx={{ mb: 4 }}>
          {activeQuiz.questions.map((_, index) => (
            <Step key={index}>
              <StepLabel>Q{index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Question {currentQuestionIndex + 1} / {activeQuiz.questions.length}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {currentQuestion.question}
            </Typography>

            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Précédent
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ ml: 'auto' }}
              >
                {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <BottomNav />
    </motion.div>
  );
};
