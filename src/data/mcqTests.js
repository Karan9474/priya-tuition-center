/*
MCQ test object format
{
  id: "unique-test-id",
  title: "Test title",
  description: "Short test summary",
  timer: {
    totalSeconds: 900,
    warningAtSeconds: 120
  },
  subjects: [
    {
      id: "math",
      label: "Mathematics",
      questions: [
        {
          id: "q1",
          question: "Question text",
          options: { A: "Option 1", B: "Option 2", C: "Option 3", D: "Option 4" },
          correctOption: "B"
        }
      ]
    }
  ]
}
*/





















export const mcqTests = {
  "all-classes-foundation": {
    id: "all-classes-foundation",
    title: "Foundation Mega Test",
    description:
      "Mixed subject objective test with timer and live question tracking.",
    timer: {
      totalSeconds: 900,
      warningAtSeconds: 120,
    },
    subjects: [
     {
        id: "math",
        label: "Mathematics",
        questions: [
          {
            id: "eq1",
            question: "Ram's age is 2 more than Shyam. If Shyam's age is x, what is Ram's age?",
            options: {
              A: "x - 2",
              B: "x + 2",
              C: "2x",
              D: "x / 2",
            },
            correctOption: "B",
          },
          {
            id: "eq2",
            question: "A number is 5 less than 3 times a number x. What is the expression?",
            options: {
              A: "3x + 5",
              B: "3x - 5",
              C: "5x - 3",
              D: "x - 5",
            },
            correctOption: "B",
          },
          {
            id: "eq3",
            question: "The sum of a number x and 7 is 20. Form the equation.",
            options: {
              A: "x + 7 = 20",
              B: "x - 7 = 20",
              C: "7x = 20",
              D: "x / 7 = 20",
            },
            correctOption: "A",
          },
          {
            id: "eq4",
            question: "Twice a number x is equal to 18. Form the equation.",
            options: {
              A: "x + 2 = 18",
              B: "2x = 18",
              C: "x / 2 = 18",
              D: "x - 2 = 18",
            },
            correctOption: "B",
          },
          {
            id: "eq5",
            question: "A number decreased by 4 gives 10. Form the equation.",
            options: {
              A: "x + 4 = 10",
              B: "x - 4 = 10",
              C: "4x = 10",
              D: "x / 4 = 10",
            },
            correctOption: "B",
          },
          {
            id: "eq6",
            question: "Five times a number x plus 3 equals 23. Form the equation.",
            options: {
              A: "5x + 3 = 23",
              B: "5x - 3 = 23",
              C: "x + 5 + 3 = 23",
              D: "5 + 3x = 23",
            },
            correctOption: "A",
          },
          {
            id: "eq7",
            question: "A number x divided by 4 is equal to 6. Form the equation.",
            options: {
              A: "4x = 6",
              B: "x / 4 = 6",
              C: "x - 4 = 6",
              D: "x + 4 = 6",
            },
            correctOption: "B",
          },
          {
            id: "eq8",
            question: "The difference between a number x and 9 is 3. Form the equation.",
            options: {
              A: "x + 9 = 3",
              B: "x - 9 = 3",
              C: "9 - x = 3",
              D: "x × 9 = 3",
            },
            correctOption: "B",
          },
          {
            id: "eq9",
            question: "Three more than a number x is equal to 15. Form the equation.",
            options: {
              A: "3x = 15",
              B: "x + 3 = 15",
              C: "x - 3 = 15",
              D: "3 + 15 = x",
            },
            correctOption: "B",
          },
          {
            id: "eq10",
            question: "Seven times a number x minus 2 equals 33. Form the equation.",
            options: {
              A: "7x + 2 = 33",
              B: "7x - 2 = 33",
              C: "x - 7 = 33",
              D: "7 + x - 2 = 33",
            },
            correctOption: "B",
          },
        ],
      },
      {
        id: "science",
        label: "Science",
        questions: [
          {
            id: "s1",
            question: "Which organ pumps blood in the human body?",
            options: {
              A: "Lungs",
              B: "Liver",
              C: "Heart",
              D: "Kidney",
            },
            correctOption: "C",
          },
          {
            id: "s2",
            question: "Water boils at what temperature (Celsius)?",
            options: {
              A: "90",
              B: "95",
              C: "100",
              D: "110",
            },
            correctOption: "C",
          },
          {
            id: "s3",
            question: "Plants prepare food by which process?",
            options: {
              A: "Respiration",
              B: "Photosynthesis",
              C: "Digestion",
              D: "Filtration",
            },
            correctOption: "B",
          },
        ],
      },
      {
        id: "english",
        label: "English",
        questions: [
          {
            id: "e1",
            question: "Choose the correct plural form of 'child'.",
            options: {
              A: "Childs",
              B: "Children",
              C: "Childes",
              D: "Childrens",
            },
            correctOption: "B",
          },
          {
            id: "e2",
            question: "Identify the verb: 'Birds fly high in the sky.'",
            options: {
              A: "Birds",
              B: "Sky",
              C: "Fly",
              D: "High",
            },
            correctOption: "C",
          },
          {
            id: "e3",
            question: "Select the correct sentence.",
            options: {
              A: "She go to school.",
              B: "She goes to school.",
              C: "She going to school.",
              D: "She gone to school.",
            },
            correctOption: "B",
          },
        ],
      },
    ],
  },
  "speed-math-blitz": {
    id: "speed-math-blitz",
    title: "Speed Math Blitz",
    description:
      "Fast arithmetic practice test for timed classroom drills.",
    timer: {
      totalSeconds: 600,
      warningAtSeconds: 90,
    },
    subjects: [
      {
        id: "arithmetic",
        label: "Arithmetic",
        questions: [
          {
            id: "a1",
            question: "48 ÷ 6 = ?",
            options: { A: "6", B: "7", C: "8", D: "9" },
            correctOption: "C",
          },
          {
            id: "a2",
            question: "15 × 4 = ?",
            options: { A: "45", B: "50", C: "55", D: "60" },
            correctOption: "D",
          },
          {
            id: "a3",
            question: "What is 100 - 37?",
            options: { A: "63", B: "67", C: "73", D: "77" },
            correctOption: "A",
          },
          {
            id: "a4",
            question: "Which is the largest number?",
            options: { A: "0.9", B: "0.75", C: "0.95", D: "0.85" },
            correctOption: "C",
          },
        ],
      },
    ],
  },
  "science-english-booster": {
    id: "science-english-booster",
    title: "Science + English Booster",
    description:
      "Dual-subject practice set for concept recall and language accuracy.",
    timer: {
      totalSeconds: 720,
      warningAtSeconds: 120,
    },
    subjects: [
      {
        id: "science",
        label: "Science",
        questions: [
          {
            id: "se1",
            question: "Which planet is known as the Red Planet?",
            options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" },
            correctOption: "B",
          },
          {
            id: "se2",
            question: "Which gas do plants absorb from air?",
            options: { A: "Oxygen", B: "Hydrogen", C: "Carbon dioxide", D: "Nitrogen" },
            correctOption: "C",
          },
        ],
      },
      {
        id: "english",
        label: "English",
        questions: [
          {
            id: "ee1",
            question: "Choose the correct spelling.",
            options: {
              A: "Enviroment",
              B: "Environment",
              C: "Environement",
              D: "Envirnoment",
            },
            correctOption: "B",
          },
          {
            id: "ee2",
            question: "Pick the opposite of 'ancient'.",
            options: { A: "Modern", B: "Old", C: "Historic", D: "Traditional" },
            correctOption: "A",
          },
        ],
      },
    ],
  },
};

