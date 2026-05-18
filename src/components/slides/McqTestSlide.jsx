import { useEffect, useMemo, useState } from "react";

function flattenQuestions(test) {
  return (test.subjects || []).flatMap((subject) =>
    (subject.questions || []).map((question, index) => ({
      ...question,
      subjectId: subject.id,
      subjectLabel: subject.label,
      indexInSubject: index + 1,
    })),
  );
}

function formatTime(seconds) {
  const safe = Math.max(seconds, 0);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const remaining = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function ResultCircle({ scorePercent }) {
  const radius = 62;
  const stroke = 12;
  const normalized = 2 * Math.PI * radius;
  const offset = normalized * (1 - scorePercent / 100);


  const [openReview, setOpenReview] = useState({});

  return (
    <svg width="170" height="170" viewBox="0 0 170 170" role="img" aria-label="Score chart">
      <circle cx="85" cy="85" r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx="85"
        cy="85"
        r={radius}
        fill="none"
        stroke="#0e7490"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={normalized}
        strokeDashoffset={offset}
        transform="rotate(-90 85 85)"
      />
      <text x="85" y="82" textAnchor="middle" className="fill-slate-900 text-[1.7rem] font-extrabold">
        {Math.round(scorePercent)}%
      </text>
      <text x="85" y="104" textAnchor="middle" className="fill-slate-500 text-[0.85rem]">
        Score
      </text>
    </svg>

    
  );
}



function getQuestionStatus(question, answers) {
  const userAns = answers[question.id];
  if (!userAns) return "unattempted";
  if (userAns === question.correctOption) return "correct";
  return "wrong";
}


export default function McqTestSlide({ content }) {
  const tests = useMemo(() => {
    if (Array.isArray(content?.tests)) return content.tests;
    if (content?.id && content?.subjects) return [content];
    return [];
  }, [content]);

  const [selectedTestId, setSelectedTestId] = useState(tests[0]?.id || null);
  const [activeTestId, setActiveTestId] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const selectedTest = useMemo(
    () => tests.find((test) => test.id === selectedTestId) || tests[0],
    [tests, selectedTestId],
  );
  const activeTest = useMemo(
    () => tests.find((test) => test.id === activeTestId) || null,
    [tests, activeTestId],
  );

  const questions = useMemo(
    () => (activeTest ? flattenQuestions(activeTest) : []),
    [activeTest],
  );
  const subjectLookup = useMemo(
    () =>
      Object.fromEntries(
        (activeTest?.subjects || []).map((subject) => [subject.id, subject.label]),
      ),
    [activeTest],
  );
  const subjectQuestions = useMemo(
    () => questions.filter((question) => question.subjectId === activeSubject),
    [questions, activeSubject],
  );
  const activeQuestion = subjectQuestions[activeIndex];
  const warningAt = activeTest?.timer?.warningAtSeconds ?? 120;
  const allQuestionsOrdered = useMemo(
    () =>
      questions.map((question, idx) => ({
        ...question,
        sequenceNumber: idx + 1,
      })),
    [questions],
  );

  useEffect(() => {
    if (!selectedTest && tests.length > 0) {
      setSelectedTestId(tests[0].id);
    }
  }, [selectedTest, tests]);

  useEffect(() => {
    if (!activeTest || isCompleted) return undefined;

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeTest, isCompleted]);

  useEffect(() => {
    if (!activeQuestion) return;
    setVisited((prev) => {
      if (prev[activeQuestion.id]) return prev;
      return { ...prev, [activeQuestion.id]: true };
    });
  }, [activeQuestion]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeSubject]);

  const attemptedCount = Object.keys(visited).length;
  const answeredCount = Object.keys(answers).length;
  const attemptedPercent = questions.length
    ? (attemptedCount / questions.length) * 100
    : 0;

  const scoreData = useMemo(() => {
    let correct = 0;
    let wrong = 0;

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (!answer) return;
      if (answer === question.correctOption) correct += 1;
      else wrong += 1;
    });

    const total = questions.length || 1;
    return {
      correct,
      wrong,
      unattempted: Math.max(questions.length - (correct + wrong), 0),
      scorePercent: (correct / total) * 100,
    };
  }, [answers, questions]);

  const handleStartTest = () => {
    if (!selectedTest) return;
    const firstSubject = selectedTest.subjects?.[0]?.id || null;
    setActiveTestId(selectedTest.id);
    setActiveSubject(firstSubject);
    setActiveIndex(0);
    setIsCompleted(false);
    setAnswers({});
    setVisited({});
    setRemainingSeconds(selectedTest.timer?.totalSeconds ?? 600);
  };

  const handleRestartCurrentTest = () => {
    if (!activeTest) return;
    const firstSubject = activeTest.subjects?.[0]?.id || null;
    setActiveSubject(firstSubject);
    setActiveIndex(0);
    setIsCompleted(false);
    setAnswers({});
    setVisited({});
    setRemainingSeconds(activeTest.timer?.totalSeconds ?? 600);
  };

  const openQuestion = (question) => {
    setActiveSubject(question.subjectId);
    const index = questions
      .filter((item) => item.subjectId === question.subjectId)
      .findIndex((item) => item.id === question.id);
    setActiveIndex(index < 0 ? 0 : index);
  };

  if (!activeTestId) {
    return (
      <div className="h-full overflow-auto rounded-2xl border border-cyan-900/10 bg-white p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Test Library
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          {content?.moduleTitle || "MCQ Test Arena"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Select any test module below and click Start Test to begin. You can manage multiple test sets from this single module.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => {
            const isSelected = selectedTestId === test.id;
            const totalQuestions = (test.subjects || []).reduce(
              (sum, subject) => sum + (subject.questions?.length || 0),
              0,
            );

            return (
              <button
                key={test.id}
                onClick={() => setSelectedTestId(test.id)}
                className={`focus-ring rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? "border-cyan-600 bg-cyan-50 shadow-md"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                  {test.subjects?.length || 0} subjects
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                  {test.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{test.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {totalQuestions} questions
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {formatTime(test.timer?.totalSeconds || 0)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={handleStartTest}
            disabled={!selectedTest}
            className={`focus-ring rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
              selectedTest
                ? "bg-cyan-700 text-white hover:bg-cyan-800"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="h-full overflow-auto rounded-2xl border border-cyan-900/10 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Test Completed
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              {activeTest.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              {activeTest.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRestartCurrentTest}
              className="focus-ring rounded-full border border-cyan-700/25 bg-cyan-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-cyan-800"
            >
              Restart Test
            </button>
            <button
              onClick={() => {
                setActiveTestId(null);
                setIsCompleted(false);
              }}
              className="focus-ring rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
            >
              Back To Library
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ResultCircle scorePercent={scoreData.scorePercent} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Correct</p>
              <p className="mt-2 text-3xl font-extrabold text-emerald-900">{scoreData.correct}</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">Wrong</p>
              <p className="mt-2 text-3xl font-extrabold text-rose-900">{scoreData.wrong}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">Unattempted</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{scoreData.unattempted}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_300px] ">
      <div className="rounded-2xl border border-cyan-900/10 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              MCQ Mock Test
            </p>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              {activeTest.title}
            </h2>
          </div>
          <div
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              remainingSeconds <= warningAt
                ? "bg-rose-100 text-rose-700"
                : "bg-cyan-100 text-cyan-800"
            }`}
          >
            {formatTime(remainingSeconds)}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(activeTest.subjects || []).map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.id)}
              className={`focus-ring rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                activeSubject === subject.id
                  ? "bg-cyan-700 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {subject.label}
            </button>
          ))}
        </div>

        {activeQuestion ? (
          <>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {activeQuestion.subjectLabel} - Question {activeIndex + 1} of{" "}
                {subjectQuestions.length}
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                {activeQuestion.question}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {Object.entries(activeQuestion.options || {}).map(([key, value]) => {
                const selected = answers[activeQuestion.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [activeQuestion.id]: key }));
                      setVisited((prev) => ({ ...prev, [activeQuestion.id]: true }));
                    }}
                    className={`focus-ring flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                      {key}
                    </span>
                    <span className="text-sm font-medium text-slate-800">{value}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                disabled={activeIndex === 0}
                className={`focus-ring rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                  activeIndex === 0
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-slate-800 text-white hover:bg-slate-900"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    Math.min(prev + 1, subjectQuestions.length - 1),
                  )
                }
                disabled={activeIndex === subjectQuestions.length - 1}
                className={`focus-ring rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                  activeIndex === subjectQuestions.length - 1
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-cyan-700 text-white hover:bg-cyan-800"
                }`}
              >
                Next
              </button>
              <button
                onClick={() => setIsCompleted(true)}
                className="focus-ring rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-emerald-700"
              >
                Submit Test
              </button>
              <button
                onClick={() => setActiveTestId(null)}
                className="focus-ring rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
              >
                Exit To Library
              </button>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
            No questions for this subject.
          </div>
        )}
      </div>

      <aside className="rounded-2xl border border-cyan-900/10 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Test Navigator
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-cyan-50 p-3">
            <p className="font-semibold text-cyan-700">Attempted</p>
            <p className="mt-1 text-2xl font-extrabold text-cyan-900">{attemptedCount}</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="font-semibold text-emerald-700">Answered</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-900">{answeredCount}</p>
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-cyan-600 transition-all"
            style={{ width: `${attemptedPercent}%` }}
          />
        </div>

        <div className="mt-5 max-h-[55vh] overflow-auto pr-1">
          <div className="grid grid-cols-6 gap-2">
            {allQuestionsOrdered.map((question) => {
              const isCurrent = activeQuestion?.id === question.id;
              const isAnswered = Boolean(answers[question.id]);
              const isVisited = Boolean(visited[question.id]);

              return (
                <button
                  key={question.id}
                  onClick={() => openQuestion(question)}
                  title={`${subjectLookup[question.subjectId]} Q${question.indexInSubject}`}
                  className={`focus-ring grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? "ring-2 ring-cyan-700 bg-cyan-700 text-white"
                      : isAnswered
                        ? "bg-emerald-100 text-emerald-800"
                        : isVisited
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {question.sequenceNumber}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}

