import { mcqTests } from "../data/mcqTests";

const generatorMap = {
  number: generateNumberSlides,
  visual: generateVisualSlides,
  operation: generateOperationSlides,
  compare: generateCompareSlides,
  pattern: generatePatternSlides,
  string: generateStringSlides,
  patternNum: generatePatternNumSlides,
  mcqTest: generateMcqTestSlides,
  numAdd: generateNumAddSlides,
  placeValue:generatePlaceValueSlides,
  word: generateWordSlides,
};

export function generateSlides(module) {
  if (!module) return [];

  if (module.type === "single" || !module.generator) {
    return generateSingleModuleSlides(module);
  }

  const generator = generatorMap[module.generator];

  if (!generator) {
    return generateFallbackSlides(module);
  }

  return generator(module.config || {}, module);
}

function generateSingleModuleSlides(module) {
  return [
    {
      type: "one",
      layout: "text",
      question: "Module Topic",
      content: module.name,
    },
    {
      type: "one",
      layout: "text",
      question: "Classroom Prompt",
      content: "Teacher-led discussion",
    },
    {
      type: "one",
      layout: "text",
      question: "Practice",
      content: "Board examples",
    },
  ];
}

function generateFallbackSlides(module) {
  return [
    {
      type: "one",
      layout: "text",
      question: "Generator missing",
      content: module.name || "Unknown module",
    },
  ];
}

function generateNumberSlides(config) {
  const slides = [];
  const [min, max] = config.range || [1, 10];
  const count = config.count || 30;

  for (let i = 0; i < count; i += 1) {
    slides.push({
      type: "one",
      layout: "text",
      question: "Identify the number",
      content: rand([min, max]),
    });
  }

  return slides;
}

function generateVisualSlides(config) {
  const items = config.items || [];

  return items.map((item) => ({
    type: "one",
    layout: "single",
    question: "Identify the shape",
    content: item.src,
    answer: item.name,
  }));
}

function generateOperationSlides(config) {
  const activeCategory = config.activeCategory || {
    operation: "add",
    range: [1, 10],
  };

  

  const symbol = activeCategory.operation === "subtract" ? "-" : "+";
  const items = config.items || [
    "/shapes-2d/circle.png",
    "/shapes-2d/square.png",
  ];
  const slides = [];

  for (let i = 0; i < 30; i += 1) {
    let a = rand(activeCategory.range);
    let b = rand(activeCategory.range);

    if (activeCategory.operation === "subtract" && b > a) {
      [a, b] = [b, a];
    }

    const answer = activeCategory.operation === "subtract" ? a - b : a + b;

    slides.push({
      type: "three",
      question: "Solve",
      layout: "grid",
      content: {
        left: Array(a).fill(items[0]),
        right: Array(b).fill(items[1]),
        operator: symbol,
        answer,
        showAnswer: false,
      },
      qa: true,
    });
  }

  return slides;
}

function generateCompareSlides(config) {
  const slides = [];
  const count = config.range || 12;
  const small = config.small || [];
  const big = config.big || [];

  if (small.length === 0 || big.length === 0) return slides;

  for (let i = 0; i < count; i += 1) {
    const leftItem = randomItem(small);
    const rightItem = randomItem(big);

    slides.push({
      type: "two",
      layout: "single",
      question: "Compare objects",
      content: {
        left: leftItem.src,
        right: rightItem.src,
      },
    });
  }

  return slides;
}

function generatePatternSlides(config) {
  const slides = [];
  const count = config.count || 20;
  const items = config.items || [];

  if (items.length < 2) return slides;

  const patterns = [
    (a, b) => [a, b, a, b, a, b, a, b],
    (a, b) => [a, a, b, b, a, a, b, b],
    (a, b, c) => [a, b, c, a, b, c, a, b],
    (a, b, c, d) => [a, b, c, d, a, b, c, d],
    (a, b, c) => [a, b, a, c, a, b, a, c],
  ];

  for (let i = 0; i < count; i += 1) {
    const a = randomItem(items);
    const b = randomItem(items.filter((item) => item !== a));
    const c = randomItem(items.filter((item) => item !== a && item !== b)) || a;
    const d =
      randomItem(
        items.filter((item) => item !== a && item !== b && item !== c),
      ) || b;
    const pattern = randomItem(patterns);
    const sequence = pattern(a, b, c, d).map((item) => item.src);

    slides.push({
      type: "one",
      layout: "grid",
      question: "Complete the pattern",
      content: sequence,
    });
  }

  return slides;
}

function generateStringSlides(config) {
  const slides = [];

  if (config.groups) {
    config.groups.forEach((group) => {
      (group.words || []).forEach((word) => {
        slides.push({
          type: "one",
          layout: "text",
          question: `Say the sound (${group.vowel})`,
          content: word,
        });
      });
    });
  } else if (Array.isArray(config.words)) {
    config.words.forEach((word) => {
      slides.push({
        type: "one",
        layout: "text",
        question: "Read the sound",
        content: word,
      });
    });
  }

  return slides;
}

function generatePatternNumSlides(config) {
  const slides = [];
  const count = config.count || 30;
  const length = config.length || 8;
  const patterns = config.patterns || [];

  if (patterns.length === 0) return slides;

  for (let i = 0; i < count; i += 1) {
    const pattern = randomItem(patterns);
    const sequence = makeSequence(pattern.start, pattern.step, length);
    const hidden = [...sequence];

    hidden[hidden.length - 1] = "?";
    hidden[hidden.length - 2] = "?";

    slides.push({
      type: "one",
      layout: "number",
      question: "Find the pattern",
      content: sequence,
    });

    slides.push({
      type: "one",
      layout: "number",
      question: "What comes next?",
      content: hidden,
    });
  }

  return slides;
}

function generateNumAddSlides(config) {
 
  const slides = [];
  
  const activeCategory = config.activeCategory || {
    operation: "add",
    range: [1, 10],
  };
   const symbol = activeCategory.operation === "subtract" ? "-" : "+";
  
  
  for (let index = 0; index < config.count; index++) {
    let a = rand(activeCategory.range);
    let b = rand(activeCategory.range);
    const answer = activeCategory.operation === "subtract" ? a - b : a + b;
    slides.push({
      type: "three",
      question: "Solve",
      layout: "text",
      content: {
        left:  a ,
        right:  b ,
        operator: symbol,
        answer,
        showAnswer: false,
      },
      qa: true,
    });
    
  }

  return slides;
}



function generatePlaceValueSlides(config) {
  const slides = [];
  const activeCategory = config.activeCategory;

  for (let i = 0; i < config.count; i++) {
    let number;

    // ==========================
    // 🎯 GENERATE NUMBER BASED ON DIGITS
    // ==========================
    const digitsCount = activeCategory.digits || 2;

    const min = Math.pow(10, digitsCount - 1);
    const max = Math.pow(10, digitsCount) - 1;

    number = rand([min, max]);

    // ==========================
    // 🧠 EXPANSION LOGIC (GENERIC)
    // ==========================
    const digits = number.toString().split("");
    const length = digits.length;

    const expanded = digits.map((digit, index) => {
      const place = length - index - 1; // power of 10
      return digit * Math.pow(10, place);
    }).filter(n => n !== 0);

    // ==========================
    // 📦 SLIDE STRUCTURE
    // ==========================
    slides.push({
      type: "one",
      question: "Expand the number",
      layout: "expand",
      content: {
        number,
        expanded,
        showAnswer: false,
      },
      qa: true,
    });
  }

  return slides;
}



function generateMcqTestSlides(config, module) {
  const testIds = Array.isArray(config?.testIds) ? config.testIds : [];
  const resolvedTests =
    testIds.length > 0
      ? testIds.map((id) => mcqTests[id]).filter(Boolean)
      : Object.values(mcqTests);

  if (resolvedTests.length === 0) {
    return [
      {
        type: "one",
        layout: "text",
        question: "MCQ Test Missing",
        content: "No valid tests found in MCQ test configuration.",
      },
    ];
  }

  return [
    {
      type: "mcqTest",
      question: module?.name || "MCQ Test",
      content: {
        moduleTitle: module?.name || "MCQ Test Arena",
        tests: resolvedTests,
      },
    },
  ];
}





function generateWordSlides(config) {
  const slides = [];

  const activeCategory = config.activeCategory;

  const items = activeCategory?.items || [];

  items.forEach((item) => {
    slides.push({
      type: "one",
      layout: "word-visual",
      question: "Learn the word",
      content: item,
    });
  });

  return slides;
}












function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeSequence(start, step, length) {
  return Array.from({ length }, (_, index) => start + index * step);
}
