import type { AdaptiveQuestion } from "@/lib/cat-algorithm"

// Sample questions for the adaptive test
export const adaptiveQuestions: AdaptiveQuestion[] = [
  // Quantitative - Easy
  {
    id: "q1-easy",
    text: "If x + 5 = 12, what is the value of x",
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
]
