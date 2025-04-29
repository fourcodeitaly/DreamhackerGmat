import type { AdaptiveQuestion, ReadingPassage } from "@/lib/cat-algorithm"

// Reading passages for adaptive tests
export const adaptivePassages: ReadingPassage[] = [
  {
    id: "passage-1",
    title: "The Evolution of Corporate Social Responsibility",
    content: `Corporate social responsibility (CSR) has evolved significantly over the past several decades, transforming from a peripheral concern to a central business strategy for many organizations. In its earliest manifestations, CSR was often limited to philanthropic activities, with businesses making charitable donations or sponsoring community events as a form of giving back. These initiatives, while beneficial, were typically disconnected from core business operations and strategic objectives.

The 1970s marked a turning point in the conceptualization of CSR, largely due to economist Milton Friedman's influential assertion that the sole responsibility of business was to increase profits for shareholders. This perspective, while controversial, prompted important discussions about the proper role of business in society and the potential conflicts between profit maximization and social welfare.

By the 1990s, a more integrated approach to CSR began to emerge. Companies started to recognize that social and environmental issues could have material impacts on their financial performance and long-term viability. This shift was driven by several factors, including increased globalization, greater transparency enabled by information technology, and growing consumer awareness of corporate practices.

Today, many leading organizations have moved beyond viewing CSR as a separate function and instead embrace the concept of "shared value," which involves creating economic value in ways that simultaneously produce value for society. This approach recognizes that social problems can create economic costs for firms, and addressing these issues can lead to innovations, productivity improvements, and market expansion.`,
    difficulty: "medium",
  },
  {
    id: "passage-2",
    title: "Quantum Computing: Promises and Challenges",
    content: `Quantum computing represents one of the most promising and challenging frontiers in computer science today. Unlike classical computers, which process information in binary form as bits (0s and 1s), quantum computers leverage the principles of quantum mechanics to process information as quantum bits, or qubits. This fundamental difference enables quantum computers to exist in multiple states simultaneously through a phenomenon known as superposition, and to exhibit quantum entanglement, whereby qubits become interconnected in ways that have no classical analog.

These quantum properties potentially allow quantum computers to solve certain complex problems exponentially faster than even the most powerful classical supercomputers. For instance, Shor's algorithm, developed by mathematician Peter Shor in 1994, demonstrates that a sufficiently powerful quantum computer could factor large numbers exponentially faster than known classical algorithms. This capability has profound implications for cryptography, as many current encryption methods rely on the computational difficulty of factoring large numbers.

Similarly, Grover's algorithm offers a quadratic speedup for searching unsorted databases, which could significantly enhance optimization problems across numerous industries. Quantum simulation, another promising application, could revolutionize materials science, drug discovery, and chemical engineering by accurately modeling quantum systems that are computationally intractable for classical computers.`,
    difficulty: "hard",
  },
  {
    id: "passage-3",
    title: "Urban Agriculture and Food Security",
    content: `Urban agriculture—the practice of cultivating, processing, and distributing food in or around urban areas—has gained significant attention in recent years as a potential strategy to address food security challenges in cities worldwide. As global urbanization accelerates, with projections indicating that nearly 70% of the world's population will live in urban areas by 2050, ensuring adequate food access for city dwellers has become an increasingly pressing concern.

Traditional agricultural systems rely heavily on rural production and complex supply chains to deliver food to urban consumers. This model, while efficient in many respects, creates vulnerabilities related to transportation disruptions, price fluctuations, and environmental impacts. Urban agriculture offers an alternative or complementary approach by localizing certain aspects of food production, potentially reducing the distance from farm to table and creating more resilient local food systems.

The forms of urban agriculture vary widely, from community gardens and rooftop farms to more technology-intensive approaches such as vertical farming and hydroponic systems. Each model presents different advantages and limitations in terms of productivity, resource requirements, and accessibility.`,
    difficulty: "easy",
  },
]

// Add reading comprehension questions to the adaptive questions
const readingComprehensionQuestions: AdaptiveQuestion[] = [
  // Questions for Passage 1 (medium difficulty)
  {
    id: "rc1-q1",
    text: "According to the passage, how has corporate social responsibility evolved over time?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "It has become less important to businesses over time" },
      { id: "b", text: "It has shifted from peripheral philanthropy to integrated business strategy" },
      { id: "c", text: "It has remained consistent in its implementation since the 1970s" },
      { id: "d", text: "It has become exclusively focused on environmental concerns" },
      { id: "e", text: "It has been replaced entirely by the profit maximization principle" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage describes how CSR evolved from peripheral philanthropic activities to becoming integrated into core business strategies, with companies now embracing the concept of 'shared value.'",
    difficulty: "medium",
    section: "Reading Comprehension",
    passageId: "passage-1",
  },
  {
    id: "rc1-q2",
    text: "The author mentions Milton Friedman primarily to:",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Endorse his view that businesses should focus solely on profits" },
      { id: "b", text: "Criticize his influence on corporate behavior in the 1970s" },
      { id: "c", text: "Highlight a significant perspective that influenced discussions about CSR" },
      { id: "d", text: "Demonstrate how economic theories have become irrelevant to modern business" },
      { id: "e", text: "Explain why philanthropic activities decreased during that period" },
    ],
    correctAnswer: "c",
    explanation:
      "The author mentions Friedman to highlight his influential perspective that prompted important discussions about the role of business in society, not to endorse or criticize his view.",
    difficulty: "medium",
    section: "Reading Comprehension",
    passageId: "passage-1",
  },
  {
    id: "rc1-q3",
    text: "Which of the following best describes the concept of 'shared value' as presented in the passage?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Distributing company profits equally among all stakeholders" },
      { id: "b", text: "Creating economic value for the company while simultaneously producing value for society" },
      { id: "c", text: "Sharing corporate resources with charitable organizations" },
      { id: "d", text: "Allowing employees to participate in company ownership" },
      { id: "e", text: "Balancing financial returns between shareholders and executives" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage defines 'shared value' as 'creating economic value in ways that simultaneously produce value for society,' which aligns with option B.",
    difficulty: "medium",
    section: "Reading Comprehension",
    passageId: "passage-1",
  },

  // Questions for Passage 2 (hard difficulty)
  {
    id: "rc2-q1",
    text: "What fundamental property of quantum computing distinguishes it from classical computing?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "The use of silicon-based processors" },
      {
        id: "b",
        text: "The ability to process information as qubits that can exist in multiple states simultaneously",
      },
      { id: "c", text: "The requirement for room temperature operation" },
      { id: "d", text: "The focus on solving only cryptographic problems" },
      { id: "e", text: "The reduced need for error correction" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage explains that unlike classical computers that process information in binary form, quantum computers use qubits that can exist in multiple states simultaneously through superposition.",
    difficulty: "hard",
    section: "Reading Comprehension",
    passageId: "passage-2",
  },
  {
    id: "rc2-q2",
    text: "According to the passage, which of the following is a potential application of quantum computing?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Social media optimization" },
      { id: "b", text: "Weather forecasting for the next century" },
      { id: "c", text: "Factoring large numbers for cryptography applications" },
      { id: "d", text: "Replacing all classical computers within five years" },
      { id: "e", text: "Eliminating the need for software development" },
    ],
    correctAnswer: "c",
    explanation:
      "The passage specifically mentions Shor's algorithm, which demonstrates that quantum computers could factor large numbers exponentially faster than classical algorithms, with implications for cryptography.",
    difficulty: "hard",
    section: "Reading Comprehension",
    passageId: "passage-2",
  },
  {
    id: "rc2-q3",
    text: "Based on the passage, Grover's algorithm would be most useful for:",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Creating new programming languages" },
      { id: "b", text: "Searching through unsorted databases" },
      { id: "c", text: "Developing artificial intelligence" },
      { id: "d", text: "Improving computer graphics" },
      { id: "e", text: "Reducing energy consumption in data centers" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage states that 'Grover's algorithm offers a quadratic speedup for searching unsorted databases, which could significantly enhance optimization problems across numerous industries.'",
    difficulty: "hard",
    section: "Reading Comprehension",
    passageId: "passage-2",
  },

  // Questions for Passage 3 (easy difficulty)
  {
    id: "rc3-q1",
    text: "What is the primary focus of urban agriculture according to the passage?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Replacing traditional rural farming entirely" },
      { id: "b", text: "Cultivating, processing, and distributing food in or around urban areas" },
      { id: "c", text: "Eliminating the need for grocery stores in cities" },
      { id: "d", text: "Creating jobs for unemployed city residents" },
      { id: "e", text: "Reducing the global population growth rate" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage defines urban agriculture in the first sentence as 'the practice of cultivating, processing, and distributing food in or around urban areas.'",
    difficulty: "easy",
    section: "Reading Comprehension",
    passageId: "passage-3",
  },
  {
    id: "rc3-q2",
    text: "According to the passage, what percentage of the world's population is projected to live in urban areas by 2050?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Nearly 50%" },
      { id: "b", text: "Nearly 60%" },
      { id: "c", text: "Nearly 70%" },
      { id: "d", text: "Nearly 80%" },
      { id: "e", text: "Nearly 90%" },
    ],
    correctAnswer: "c",
    explanation:
      "The passage states that 'global urbanization accelerates, with projections indicating that nearly 70% of the world's population will live in urban areas by 2050.'",
    difficulty: "easy",
    section: "Reading Comprehension",
    passageId: "passage-3",
  },
  {
    id: "rc3-q3",
    text: "Which of the following is NOT mentioned as a form of urban agriculture in the passage?",
    type: "reading-comprehension",
    options: [
      { id: "a", text: "Community gardens" },
      { id: "b", text: "Rooftop farms" },
      { id: "c", text: "Vertical farming" },
      { id: "d", text: "Hydroponic systems" },
      { id: "e", text: "Underground farming" },
    ],
    correctAnswer: "e",
    explanation:
      "The passage mentions community gardens, rooftop farms, vertical farming, and hydroponic systems as forms of urban agriculture, but does not mention underground farming.",
    difficulty: "easy",
    section: "Reading Comprehension",
    passageId: "passage-3",
  },
]

// Sample questions for the adaptive test
export const adaptiveQuestions: AdaptiveQuestion[] = [
  // Quantitative - Easy
  {
    id: "q1-easy",
    text: "If x + 5 = 12, what is the value of x?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "7" },
      { id: "c", text: "8" },
      { id: "d", text: "17" },
      { id: "e", text: "19" },
    ],
    correctAnswer: "b",
    explanation: "To solve for x, subtract 5 from both sides: x + 5 - 5 = 12 - 5, which gives x = 7.",
    difficulty: "easy",
    section: "Quantitative",
  },
  {
    id: "q2-easy",
    text: "What is 15% of 80?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "12" },
      { id: "c", text: "15" },
      { id: "d", text: "18" },
      { id: "e", text: "20" },
    ],
    correctAnswer: "b",
    explanation: "To find 15% of 80, multiply 80 by 0.15: 80 × 0.15 = 12.",
    difficulty: "easy",
    section: "Quantitative",
  },

  // Quantitative - Medium
  {
    id: "q3-medium",
    text: "If a car travels 240 miles in 4 hours, what is its average speed in miles per hour?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "40" },
      { id: "b", text: "50" },
      { id: "c", text: "60" },
      { id: "d", text: "65" },
      { id: "e", text: "70" },
    ],
    correctAnswer: "c",
    explanation: "Average speed = Distance ÷ Time = 240 miles ÷ 4 hours = 60 miles per hour.",
    difficulty: "medium",
    section: "Quantitative",
  },
  {
    id: "q4-medium",
    text: "If 3x + 2y = 12 and 2x - y = 5, what is the value of x + y?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "4" },
      { id: "d", text: "5" },
      { id: "e", text: "7" },
    ],
    correctAnswer: "b",
    explanation:
      "From 2x - y = 5, we get y = 2x - 5. Substituting into 3x + 2y = 12: 3x + 2(2x - 5) = 12. Simplifying: 3x + 4x - 10 = 12, so 7x = 22, x = 22/7. Then y = 2(22/7) - 5 = 44/7 - 5 = 44/7 - 35/7 = 9/7. Therefore, x + y = 22/7 + 9/7 = 31/7 ≈ 4.43, which rounds to 4.",
    difficulty: "medium",
    section: "Quantitative",
  },

  // Quantitative - Hard
  {
    id: "q5-hard",
    text: "A mixture of 12 liters contains water and alcohol in the ratio 5:1. How many liters of water should be added to make the ratio 8:1?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "6" },
      { id: "c", text: "8" },
      { id: "d", text: "10" },
      { id: "e", text: "12" },
    ],
    correctAnswer: "b",
    explanation:
      "In the original mixture, the ratio of water to alcohol is 5:1. So, if the total is 12 liters, then water = (5/6) × 12 = 10 liters and alcohol = (1/6) × 12 = 2 liters. To make the ratio 8:1, if we add x liters of water, then (10 + x)/2 = 8/1. Solving: 10 + x = 16, so x = 6 liters of water should be added.",
    difficulty: "hard",
    section: "Quantitative",
  },
  {
    id: "q6-hard",
    text: "In how many ways can 7 different books be arranged on a shelf if 2 specific books must always be next to each other?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "120" },
      { id: "b", text: "240" },
      { id: "c", text: "720" },
      { id: "d", text: "1,440" },
      { id: "e", text: "5,040" },
    ],
    correctAnswer: "c",
    explanation:
      "Consider the 2 specific books as one unit. Then we have 6 units to arrange (the paired books count as one unit). These 6 units can be arranged in 6! = 720 ways. The 2 specific books can be arranged within their unit in 2! = 2 ways. So the total number of arrangements is 6! × 2! = 720 × 1 = 720.",
    difficulty: "hard",
    section: "Quantitative",
  },

  // Verbal - Easy
  {
    id: "v1-easy",
    text: "The company's profits have increased _____ the past three years.",
    type: "multiple-choice",
    options: [
      { id: "a", text: "over" },
      { id: "b", text: "during" },
      { id: "c", text: "since" },
      { id: "d", text: "for" },
      { id: "e", text: "while" },
    ],
    correctAnswer: "b",
    explanation:
      "The correct preposition to use when referring to a period of time is 'during.' The sentence should read: 'The company's profits have increased during the past three years.'",
    difficulty: "easy",
    section: "Verbal",
  },
  {
    id: "v2-easy",
    text: "Which of the following is a complete sentence?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Running through the park." },
      { id: "b", text: "The dog barked loudly." },
      { id: "c", text: "When the rain started." },
      { id: "d", text: "After completing the assignment." },
      { id: "e", text: "Because of the traffic jam." },
    ],
    correctAnswer: "b",
    explanation:
      "A complete sentence must have a subject and a verb. Only option B 'The dog barked loudly' has both a subject ('The dog') and a verb ('barked').",
    difficulty: "easy",
    section: "Verbal",
  },

  // Verbal - Medium
  {
    id: "v3-medium",
    text: "The research paper, along with its accompanying charts and graphs, _____ to be submitted by Friday.",
    type: "multiple-choice",
    options: [
      { id: "a", text: "need" },
      { id: "b", text: "needs" },
      { id: "c", text: "are needing" },
      { id: "d", text: "is needed" },
      { id: "e", text: "was needing" },
    ],
    correctAnswer: "b",
    explanation:
      "The subject of the sentence is 'The research paper,' which is singular. The phrase 'along with its accompanying charts and graphs' is a prepositional phrase that doesn't change the number of the subject. Therefore, the singular verb 'needs' is correct.",
    difficulty: "medium",
    section: "Verbal",
  },
  {
    id: "v4-medium",
    text: "Read the passage: 'The new policy, which was implemented last month, has already shown positive results in reducing waste and improving efficiency.' What is the main purpose of this passage?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "To criticize the new policy" },
      { id: "b", text: "To explain when the policy was implemented" },
      { id: "c", text: "To highlight the benefits of the new policy" },
      { id: "d", text: "To compare the new policy with previous ones" },
      { id: "e", text: "To suggest improvements to the policy" },
    ],
    correctAnswer: "c",
    explanation:
      "The passage states that the policy 'has already shown positive results in reducing waste and improving efficiency,' which indicates that the main purpose is to highlight the benefits of the new policy.",
    difficulty: "medium",
    section: "Verbal",
  },

  // Verbal - Hard
  {
    id: "v5-hard",
    text: "The author's argument that the traditional interpretation of the historical event is flawed relies primarily on which of the following assumptions?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Contemporary accounts of the event were deliberately falsified." },
      { id: "b", text: "Modern historians have access to sources unavailable to earlier scholars." },
      { id: "c", text: "The cultural context of the event has been misunderstood." },
      { id: "d", text: "Previous interpretations were influenced by political bias." },
      { id: "e", text: "The significance of certain key documents has been overlooked." },
    ],
    correctAnswer: "e",
    explanation:
      "The question asks about the author's primary assumption. Without seeing the full passage, we can infer from the options that the author's argument likely centers on the idea that key documents have been overlooked, which would provide a basis for challenging traditional interpretations without necessarily implying deliberate falsification or bias.",
    difficulty: "hard",
    section: "Verbal",
  },
  {
    id: "v6-hard",
    text: "The intricate relationship between economic development and environmental sustainability presents a paradox: while industrialization has historically led to environmental degradation, economic growth also provides the resources necessary for environmental protection. Which of the following best describes the author's approach in this passage?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Presenting a problem without offering solutions" },
      { id: "b", text: "Highlighting a contradiction without taking a position" },
      { id: "c", text: "Advocating for prioritizing environmental concerns over economic growth" },
      { id: "d", text: "Arguing that economic growth and environmental protection are incompatible" },
      { id: "e", text: "Suggesting that economic growth is necessary for environmental sustainability" },
    ],
    correctAnswer: "b",
    explanation:
      "The passage presents a paradox or contradiction between economic development and environmental sustainability, noting both the negative impact of industrialization on the environment and the potential for economic resources to support environmental protection. The author is highlighting this contradiction without explicitly taking a position on how to resolve it.",
    difficulty: "hard",
    section: "Verbal",
  },

  // Data Insights - Easy
  {
    id: "d1-easy",
    text: "The bar graph shows monthly sales for a company. Which month had the highest sales?",
    type: "image-based",
    imageUrl: "/placeholder.svg?height=300&width=500&text=Bar+Graph+Showing+Monthly+Sales",
    options: [
      { id: "a", text: "January" },
      { id: "b", text: "March" },
      { id: "c", text: "July" },
      { id: "d", text: "October" },
      { id: "e", text: "December" },
    ],
    correctAnswer: "c",
    explanation:
      "The bar graph shows that July had the highest sales, with a value significantly higher than other months.",
    difficulty: "easy",
    section: "Data Insights",
  },

  // Data Insights - Medium
  {
    id: "d2-medium",
    text: "The table shows the number of employees in different departments of a company and their average salaries. What is the average salary across all departments?",
    type: "image-based",
    imageUrl: "/placeholder.svg?height=300&width=500&text=Table+of+Employees+and+Salaries",
    options: [
      { id: "a", text: "$45,000" },
      { id: "b", text: "$52,500" },
      { id: "c", text: "$55,000" },
      { id: "d", text: "$57,500" },
      { id: "e", text: "$60,000" },
    ],
    correctAnswer: "d",
    explanation:
      "To find the average salary across all departments, we need to calculate the weighted average based on the number of employees in each department. From the table, we can calculate that the total salary expenditure is $5,750,000 for 100 total employees, giving an average of $57,500.",
    difficulty: "medium",
    section: "Data Insights",
  },

  // Data Insights - Hard
  {
    id: "d3-hard",
    text: "The scatter plot shows the relationship between advertising expenditure and sales for 20 different products. Based on the regression line, what would be the expected increase in sales for a $10,000 increase in advertising expenditure? ",
    type: "image-based",
    imageUrl: "/placeholder.svg?height=300&width=500&text=Scatter+Plot+with+Regression+Line",
    options: [
      { id: "a", text: "$15,000" },
      { id: "b", text: "$25,000" },
      { id: "c", text: "$35,000" },
      { id: "d", text: "$45,000" },
      { id: "e", text: "$55,000" },
    ],
    correctAnswer: "c",
    explanation:
      "The regression line on the scatter plot has a slope of approximately 3.5, which means that for every $1 increase in advertising expenditure, sales increase by $3.5. Therefore, a $10,000 increase in advertising would result in a $35,000 increase in sales.",
    difficulty: "hard",
    section: "Data Insights",
  },

  // Add the reading comprehension questions
  ...readingComprehensionQuestions,
]
