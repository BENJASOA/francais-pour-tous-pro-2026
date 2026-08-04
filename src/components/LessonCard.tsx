import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { Lesson } from '@types/index';

interface LessonCardProps {
  lesson: Lesson;
  onClick: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        onClick={() => onClick(lesson)}
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {lesson.imageURL && (
          <CardMedia
            component="img"
            height="200"
            image={lesson.imageURL}
            alt={lesson.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
              {lesson.title}
            </Typography>
            {lesson.isPremium && (
              <Chip label="Premium" size="small" color="primary" variant="outlined" />
            )}
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {lesson.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={lesson.level} size="small" color="secondary" />
            <Chip label={`${lesson.duration} min`} size="small" />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
