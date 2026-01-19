export const SAMPLE_QUESTIONS = [
  {
    id: 'q1',
    text: 'What is the primary function of React\'s useEffect hook?',
    options: [
      { id: 'o1', text: 'To handle state management in Redux' },
      { id: 'o2', text: 'To perform side effects in function components' },
      { id: 'o3', text: 'To memorize expensive calculations' },
      { id: 'o4', text: 'To create context providers' }
    ],
    correctOptionId: 'o2',
    explanation: 'useEffect is designed to handle side effects like data fetching, subscriptions, or manually changing the DOM in function components.',
    category: 'React'
  },
  {
    id: 'q2',
    text: 'Which CSS property is used to control the stack order of elements?',
    options: [
      { id: 'o1', text: 'd-index' },
      { id: 'o2', text: 's-index' },
      { id: 'o3', text: 'z-index' },
      { id: 'o4', text: 'order' }
    ],
    correctOptionId: 'o3',
    explanation: 'The z-index property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order.',
    category: 'CSS'
  },
  {
    id: 'q3',
    text: 'In JavaScript, what will `typeof []` return?',
    options: [
      { id: 'o1', text: '"array"' },
      { id: 'o2', text: '"object"' },
      { id: 'o3', text: '"list"' },
      { id: 'o4', text: '"undefined"' }
    ],
    correctOptionId: 'o2',
    explanation: 'In JavaScript, arrays are technically objects. To specifically check for an array, you should use `Array.isArray()`.',
    category: 'JavaScript'
  },
  {
    id: 'q4',
    text: 'What does SQL stand for?',
    options: [
      { id: 'o1', text: 'Structured Query Language' },
      { id: 'o2', text: 'Strong Question Language' },
      { id: 'o3', text: 'Structured Question List' },
      { id: 'o4', text: 'Simple Query Logic' }
    ],
    correctOptionId: 'o1',
    explanation: 'SQL stands for Structured Query Language, which is the standard language for dealing with Relational Databases.',
    category: 'Database'
  },
  {
    id: 'q5',
    text: 'Which of the following is NOT a valid HTTP method?',
    options: [
      { id: 'o1', text: 'GET' },
      { id: 'o2', text: 'PUT' },
      { id: 'o3', text: 'SEND' },
      { id: 'o4', text: 'DELETE' }
    ],
    correctOptionId: 'o3',
    explanation: 'SEND is not a standard HTTP method. Common methods include GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS.',
    category: 'Web'
  },
  ...Array.from({ length: 45 }).map((_, i) => ({
    id: `q${i + 6}`,
    text: `Mock Question ${i + 6}: Which is a correct statement about clean code?`,
    options: [
      { id: 'o1', text: 'Functions should do multiple things' },
      { id: 'o2', text: 'Variable names should be short (e.g., x, y)' },
      { id: 'o3', text: 'Code should be self-documenting where possible' },
      { id: 'o4', text: 'Comments should explain "what" not "why"' }
    ],
    correctOptionId: 'o3',
    explanation: 'Clean code prioritizes readability. Code that clearly expresses its intent (self-documenting) is easier to maintain than code that relies heavily on comments.',
    category: 'General Engineering'
  }))
];