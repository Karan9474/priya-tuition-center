import { wordCategories } from "./WordData";


const universalMcqModule = {
  name: "MCQ Test Arena",
  image: "/modules/default.png",
  generator: "mcqTest",
  config: {
    testIds: [
      "all-classes-foundation",
      "speed-math-blitz",
      "science-english-booster",
    ],
  },
};


const baseClassData = {
  1: [
{
  name: "Basic Words",
  image: "/modules/default.png",
  generator: "word",
  config: {
  categories: wordCategories
}
},

    {
      name: "Numbers 1-20",
      image: "/modules/default.png",
      generator: "number",
      config: { range: [1, 20], count: 30 },
    },
    {
      name: "Numbers 21-99",
      image: "/modules/default.png",
      generator: "number",
      config: { range: [21, 99], count: 30 },
    },
    {
      name: "CV Sounds",
      image: "/modules/default.png",
      generator: "string",
      config: {
        groups: [
          {
            vowel: "a",
            words: [
              "ba",
              "ca",
              "da",
              "fa",
              "ga",
              "ha",
              "ja",
              "ka",
              "la",
              "ma",
              "na",
              "pa",
              "ra",
              "sa",
              "ta",
            ],
          },
          {
            vowel: "e",
            words: [
              "be",
              "ce",
              "de",
              "fe",
              "ge",
              "he",
              "je",
              "ke",
              "le",
              "me",
              "ne",
              "pe",
              "re",
              "se",
              "te",
            ],
          },
          {
            vowel: "i",
            words: [
              "bi",
              "ci",
              "di",
              "fi",
              "gi",
              "hi",
              "ji",
              "ki",
              "li",
              "mi",
              "ni",
              "pi",
              "ri",
              "si",
              "ti",
            ],
          },
          {
            vowel: "o",
            words: [
              "bo",
              "co",
              "do",
              "fo",
              "go",
              "ho",
              "jo",
              "ko",
              "lo",
              "mo",
              "no",
              "po",
              "ro",
              "so",
              "to",
            ],
          },
          {
            vowel: "u",
            words: [
              "bu",
              "cu",
              "du",
              "fu",
              "gu",
              "hu",
              "ju",
              "ku",
              "lu",
              "mu",
              "nu",
              "pu",
              "ru",
              "su",
              "tu",
            ],
          },
        ],
      },
    },
    {
      name: "Shapes",
      image: "/modules/default.png",
      generator: "visual",
      config: {
        items: [
          { name: "Circle", src: "/shapes-2d/circle.png" },
          { name: "Square", src: "/shapes-2d/square.png" },
          { name: "Triangle", src: "/shapes-2d/triangle.png" },
          { name: "Rectangle", src: "/shapes-2d/rectangle.png" },
          { name: "Star", src: "/shapes-2d/star.png" },
        ],
      },
    },
    {
      name: "Addition and Subtraction",
      image: "/modules/default.png",
      generator: "operation",
      config: {
        mode: "images",
        categories: {
          add: { label: "Addition", operation: "add", range: [1, 5] },
          subtract: {
            label: "Subtraction",
            operation: "subtract",
            range: [1, 5],
          },
        },
        items: ["/shapes-2d/circle.png", "/shapes-2d/star.png"],
      },
    },
    {
      name: "Measurements",
      image: "/modules/default.png",
      generator: "compare",
      config: {
        range: 16,
        small: [
          { name: "Circle", src: "/shapes-2d/circle.png" },
          { name: "Square", src: "/shapes-2d/square.png" },
        ],
        big: [
          { name: "Triangle", src: "/shapes-2d/triangle.png" },
          { name: "Rectangle", src: "/shapes-2d/rectangle.png" },
          { name: "Star", src: "/shapes-2d/star.png" },
        ],
      },
    },
    {
      name: "Patterns",
      image: "/modules/default.png",
      generator: "pattern",
      config: {
        count: 20,
        items: [
          { name: "Circle", src: "/shapes-2d/circle.png" },
          { name: "Square", src: "/shapes-2d/square.png" },
          { name: "Triangle", src: "/shapes-2d/triangle.png" },
          { name: "Star", src: "/shapes-2d/star.png" },
        ],
      },
    },
    { name: "Time", image: "/modules/default.png", type: "single" },
    { name: "Multiplication Intro", image: "/modules/default.png", type: "single" },
    { name: "Money", image: "/modules/default.png", type: "single" },
    { name: "Data Handling", image: "/modules/default.png", type: "single" },
  ],
  2: [

    {
      name: "basic addition",
      image: "/modules/default.png",
      generator: "numAdd",
       config: {
        mode: "text",
        count:30,
        categories: {
          add: { label: "Addition", operation: "add", range: [1, 10] },
          subtract: {
            label: "Subtraction",
            operation: "subtract",
            range: [1, 10],
          },
        }
      },
      config2: { range: [1, 20], count: 30 },
    },




      {
      name: "expand form 2 digit",
      image: "/modules/default.png",
      generator: "placeValue",
       config: {
        mode: "text",
        count:30,
       categories: {
  TwoDigit: { label: "2-digit", digits: 2 },
  ThreeDigit: { label: "3-digit", digits: 3 },
  FourDigit: { label: "4-digit", digits: 4 },
  FiveDigit: { label: "5-digit", digits: 5 },
  SixDigit: { label: "6-digit", digits: 6 },
  SevenDigit: { label: "7-digit", digits: 7 },
}
      },
      config2: { range: [1, 20], count: 30 },
    },




    {
      name: "Skip Counting",
      image: "/modules/default.png",
      generator: "patternNum",
      config: {
        count: 30,
        length: 8,
        patterns: [
          { start: 1, step: 1 },
          { start: 2, step: 2 },
          { start: 1, step: 3 },
          { start: 5, step: 5 },
          { start: 10, step: 10 },
          { start: 3, step: 4 },
          { start: 2, step: 6 },
        ],
      },
    },
    {
      name: "Numbers 1-100",
      image: "/modules/default.png",
      generator: "number",
      config: { range: [1, 100], count: 30 },
    },
    { name: "2D and 3D Shapes", image: "/modules/default.png", type: "single" },
    { name: "Lines and Orientations", image: "/modules/default.png", type: "single" },
    { name: "Addition and Subtraction", image: "/modules/default.png", type: "single" },
    { name: "Measurement", image: "/modules/default.png", type: "single" },
    { name: "Multiplication and Division", image: "/modules/default.png", type: "single" },
    { name: "Time", image: "/modules/default.png", type: "single" },
    { name: "Money", image: "/modules/default.png", type: "single" },
    { name: "Data Handling", image: "/modules/default.png", type: "single" },
  ],
  3: [

     {
      name: "basic addition 2 digit",
      image: "/modules/default.png",
      generator: "numAdd",
       config: {
        mode: "text",
        count:30,
        categories: {
          add: { label: "Addition", operation: "add", range: [10, 20] },
          subtract: {
            label: "Subtraction",
            operation: "subtract",
            range: [1, 10],
          },
        }
      },
      config2: { range: [1, 20], count: 30 },
    },
    {
      name: "Numbers up to 1000",
      image: "/modules/default.png",
      type: "single",
      config: { range: [1, 1000] },
    },
    { name: "Place Value", image: "/modules/default.png", type: "single" },
    { name: "Addition and Subtraction", image: "/modules/default.png", type: "single" },
    { name: "Multiplication and Division", image: "/modules/default.png", type: "single" },
    { name: "Fractions", image: "/modules/default.png", type: "single" },
    { name: "Measurement", image: "/modules/default.png", type: "single" },
    { name: "Time", image: "/modules/default.png", type: "single" },
    { name: "Shapes", image: "/modules/default.png", type: "single" },
    { name: "Data Handling", image: "/modules/default.png", type: "single" },
  ],
  4: [
    { name: "Large Numbers", image: "/modules/default.png", type: "single" },
    { name: "Patterns", image: "/modules/default.png", type: "single" },
    { name: "Measurement", image: "/modules/default.png", type: "single" },
    { name: "Multiplication and Division", image: "/modules/default.png", type: "single" },
    { name: "Symmetry", image: "/modules/default.png", type: "single" },
    { name: "Time", image: "/modules/default.png", type: "single" },
    { name: "Data Handling", image: "/modules/default.png", type: "single" },
    { name: "Geometry", image: "/modules/default.png", type: "single" },
  ],
  5: [
    { name: "Fractions", image: "/modules/default.png", type: "single" },
    { name: "Angles", image: "/modules/default.png", type: "single" },
    { name: "Measurement", image: "/modules/default.png", type: "single" },
    { name: "Symmetry and Patterns", image: "/modules/default.png", type: "single" },
    { name: "Time", image: "/modules/default.png", type: "single" },
    { name: "Maps", image: "/modules/default.png", type: "single" },
    { name: "Data Handling", image: "/modules/default.png", type: "single" },
    { name: "Geometry", image: "/modules/default.png", type: "single" },
  ],
  6: [
    { name: "Patterns", image: "/modules/default.png", type: "single" },
    { name: "Lines and Angles", image: "/modules/default.png", type: "single" },
    { name: "Whole Numbers", image: "/modules/default.png", type: "single" },
    { name: "Prime Numbers", image: "/modules/default.png", type: "single" },
    { name: "Fractions", image: "/modules/default.png", type: "single" },
    { name: "Perimeter and Area", image: "/modules/default.png", type: "single" },
    { name: "Constructions", image: "/modules/default.png", type: "single" },
    { name: "Symmetry", image: "/modules/default.png", type: "single" },
    { name: "Integers", image: "/modules/default.png", type: "single" },
  ],
  7: [
    { name: "Large Numbers", image: "/modules/default.png", type: "single" },
    { name: "BODMAS", image: "/modules/default.png", type: "single" },
    { name: "Decimals", image: "/modules/default.png", type: "single" },
    { name: "Algebra", image: "/modules/default.png", type: "single" },
    { name: "Lines", image: "/modules/default.png", type: "single" },
    { name: "Fractions", image: "/modules/default.png", type: "single" },
    { name: "Geometry", image: "/modules/default.png", type: "single" },
  ],
  8: [
    { name: "Squares and Cubes", image: "/modules/default.png", type: "single" },
    { name: "Powers", image: "/modules/default.png", type: "single" },
    { name: "Number System", image: "/modules/default.png", type: "single" },
    { name: "Quadrilaterals", image: "/modules/default.png", type: "single" },
    { name: "Algebra", image: "/modules/default.png", type: "single" },
    { name: "Ratio and Proportion", image: "/modules/default.png", type: "single" },
    { name: "Multiplication", image: "/modules/default.png", type: "single" },
  ],
};

export const classData = Object.fromEntries(
  Object.entries(baseClassData).map(([classId, modules]) => [
    classId,
    [universalMcqModule, ...modules],
  ]),
);
