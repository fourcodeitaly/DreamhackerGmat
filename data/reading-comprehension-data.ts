export interface ReadingComprehensionOption {
  id: string
  text: string
}

export interface ReadingComprehensionQuestion {
  id: string
  text: string
  options: ReadingComprehensionOption[]
  correctAnswer: string
  explanation: string
}

export interface ReadingComprehensionPassage {
  id: string
  title: string
  content: string
  questions: ReadingComprehensionQuestion[]
}

export interface ReadingComprehensionTest {
  id: string
  title: string
  description: string
  timeLimit: number // in seconds
  passages: ReadingComprehensionPassage[]
}

// Mock data for a reading comprehension test
export const mockReadingComprehensionTest: ReadingComprehensionTest = {
  id: "rc-test-1",
  title: "GMAT Reading Comprehension Practice Test",
  description: "Practice test with 4 passages and associated questions",
  timeLimit: 3600, // 60 minutes
  passages: [
    {
      id: "passage-1",
      title: "The Evolution of Corporate Social Responsibility",
      content: `Corporate social responsibility (CSR) has evolved significantly over the past several decades, transforming from a peripheral concern to a central business strategy for many organizations. In its earliest manifestations, CSR was often limited to philanthropic activities, with businesses making charitable donations or sponsoring community events as a form of giving back. These initiatives, while beneficial, were typically disconnected from core business operations and strategic objectives.

The 1970s marked a turning point in the conceptualization of CSR, largely due to economist Milton Friedman's influential assertion that the sole responsibility of business was to increase profits for shareholders. This perspective, while controversial, prompted important discussions about the proper role of business in society and the potential conflicts between profit maximization and social welfare.

By the 1990s, a more integrated approach to CSR began to emerge. Companies started to recognize that social and environmental issues could have material impacts on their financial performance and long-term viability. This shift was driven by several factors, including increased globalization, greater transparency enabled by information technology, and growing consumer awareness of corporate practices.

Today, many leading organizations have moved beyond viewing CSR as a separate function and instead embrace the concept of "shared value," which involves creating economic value in ways that simultaneously produce value for society. This approach recognizes that social problems can create economic costs for firms, and addressing these issues can lead to innovations, productivity improvements, and market expansion.

Research increasingly suggests that strategic CSR initiatives can enhance a company's competitive advantage, strengthen its reputation, improve employee recruitment and retention, and foster customer loyalty. However, critics argue that CSR can sometimes serve as a form of "greenwashing," where companies make superficial changes to appear socially responsible without substantively altering harmful business practices.

As stakeholder expectations continue to evolve and global challenges such as climate change become more pressing, the future of CSR will likely involve even greater integration of social and environmental considerations into core business strategies and operations. The most successful companies will be those that can authentically align their profit motives with positive societal impact, creating sustainable value for both shareholders and the broader community.`,
      questions: [
        {
          id: "q1-1",
          text: "According to the passage, how has corporate social responsibility evolved over time?",
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
        },
        {
          id: "q1-2",
          text: "The author mentions Milton Friedman primarily to:",
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
        },
        {
          id: "q1-3",
          text: "Which of the following best describes the concept of 'shared value' as presented in the passage?",
          options: [
            { id: "a", text: "Distributing company profits equally among all stakeholders" },
            {
              id: "b",
              text: "Creating economic value for the company while simultaneously producing value for society",
            },
            { id: "c", text: "Sharing corporate resources with charitable organizations" },
            { id: "d", text: "Allowing employees to participate in company ownership" },
            { id: "e", text: "Balancing financial returns between shareholders and executives" },
          ],
          correctAnswer: "b",
          explanation:
            "The passage defines 'shared value' as 'creating economic value in ways that simultaneously produce value for society,' which aligns with option B.",
        },
        {
          id: "q1-4",
          text: "Based on the passage, critics of CSR are primarily concerned that:",
          options: [
            { id: "a", text: "It reduces company profits and harms shareholders" },
            { id: "b", text: "It gives companies too much influence over social issues" },
            { id: "c", text: "It can be used as 'greenwashing' without substantive changes to harmful practices" },
            { id: "d", text: "It distracts from the primary purpose of business" },
            { id: "e", text: "It places too much emphasis on environmental rather than social concerns" },
          ],
          correctAnswer: "c",
          explanation:
            "The passage states that 'critics argue that CSR can sometimes serve as a form of \"greenwashing,\" where companies make superficial changes to appear socially responsible without substantively altering harmful business practices.'",
        },
      ],
    },
    {
      id: "passage-2",
      title: "Quantum Computing: Promises and Challenges",
      content: `Quantum computing represents one of the most promising and challenging frontiers in computer science today. Unlike classical computers, which process information in binary form as bits (0s and 1s), quantum computers leverage the principles of quantum mechanics to process information as quantum bits, or qubits. This fundamental difference enables quantum computers to exist in multiple states simultaneously through a phenomenon known as superposition, and to exhibit quantum entanglement, whereby qubits become interconnected in ways that have no classical analog.

These quantum properties potentially allow quantum computers to solve certain complex problems exponentially faster than even the most powerful classical supercomputers. For instance, Shor's algorithm, developed by mathematician Peter Shor in 1994, demonstrates that a sufficiently powerful quantum computer could factor large numbers exponentially faster than known classical algorithms. This capability has profound implications for cryptography, as many current encryption methods rely on the computational difficulty of factoring large numbers.

Similarly, Grover's algorithm offers a quadratic speedup for searching unsorted databases, which could significantly enhance optimization problems across numerous industries. Quantum simulation, another promising application, could revolutionize materials science, drug discovery, and chemical engineering by accurately modeling quantum systems that are computationally intractable for classical computers.

Despite these extraordinary possibilities, quantum computing faces formidable technical challenges. Quantum coherence—the delicate quantum state that enables quantum computation—is extremely vulnerable to environmental interference, a phenomenon known as decoherence. Even minor interactions with the external environment can cause qubits to lose their quantum properties and introduce errors into calculations.

To address this challenge, researchers are pursuing various approaches, including error correction codes, topological quantum computing, and the development of more stable qubit technologies. Current quantum computers operate in highly controlled environments at temperatures approaching absolute zero to minimize decoherence, but maintaining quantum coherence for the duration needed to solve complex problems remains difficult.

Additionally, scaling quantum systems presents significant engineering challenges. As the number of qubits increases, so does the complexity of controlling and measuring them while preserving their quantum properties. Current state-of-the-art quantum computers have reached around 100 qubits, but practical applications like breaking common encryption would require thousands or even millions of stable, error-corrected qubits.

The field has attracted substantial investment from governments, academic institutions, and technology companies worldwide. While fully fault-tolerant, large-scale quantum computers may still be years or decades away, the intermediate milestone of "quantum advantage"—where quantum computers outperform classical computers on specific, practical problems—appears increasingly within reach. This achievement would mark a significant turning point in computing history and potentially accelerate progress toward more powerful quantum systems.

As quantum computing continues to advance, it will likely develop alongside classical computing rather than replacing it entirely. The future may involve hybrid approaches that leverage the strengths of both paradigms, with quantum computers solving specific problems for which they demonstrate clear advantages, while classical computers continue to excel at the many tasks for which they are well-suited.`,
      questions: [
        {
          id: "q2-1",
          text: "What fundamental property of quantum computing distinguishes it from classical computing?",
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
        },
        {
          id: "q2-2",
          text: "According to the passage, which of the following is a major challenge in developing practical quantum computers?",
          options: [
            { id: "a", text: "Insufficient government funding" },
            { id: "b", text: "Lack of potential applications" },
            { id: "c", text: "Quantum decoherence caused by environmental interference" },
            { id: "d", text: "Competition from classical computing advancements" },
            { id: "e", text: "Public skepticism about quantum technology" },
          ],
          correctAnswer: "c",
          explanation:
            "The passage identifies quantum decoherence—where qubits lose their quantum properties due to environmental interference—as a formidable technical challenge in quantum computing.",
        },
        {
          id: "q2-3",
          text: "The author's attitude toward the future of quantum computing can best be described as:",
          options: [
            { id: "a", text: "Highly skeptical" },
            { id: "b", text: "Cautiously optimistic" },
            { id: "c", text: "Completely neutral" },
            { id: "d", text: "Overwhelmingly enthusiastic" },
            { id: "e", text: "Deeply concerned" },
          ],
          correctAnswer: "b",
          explanation:
            "The author acknowledges both the promising potential of quantum computing and the significant challenges it faces, suggesting a cautiously optimistic perspective about its future development.",
        },
      ],
    },
    {
      id: "passage-3",
      title: "Urban Agriculture and Food Security",
      content: `Urban agriculture—the practice of cultivating, processing, and distributing food in or around urban areas—has gained significant attention in recent years as a potential strategy to address food security challenges in cities worldwide. As global urbanization accelerates, with projections indicating that nearly 70% of the world's population will live in urban areas by 2050, ensuring adequate food access for city dwellers has become an increasingly pressing concern.

Traditional agricultural systems rely heavily on rural production and complex supply chains to deliver food to urban consumers. This model, while efficient in many respects, creates vulnerabilities related to transportation disruptions, price fluctuations, and environmental impacts. Urban agriculture offers an alternative or complementary approach by localizing certain aspects of food production, potentially reducing the distance from farm to table and creating more resilient local food systems.

The forms of urban agriculture vary widely, from community gardens and rooftop farms to more technology-intensive approaches such as vertical farming and hydroponic systems. Each model presents different advantages and limitations in terms of productivity, resource requirements, and accessibility. Community gardens, for instance, typically require relatively low capital investment and can serve important social and educational functions beyond food production. Vertical farms, by contrast, can produce higher yields per square foot but demand significant energy inputs and technological expertise.

Research on urban agriculture's potential contribution to food security has yielded mixed results. Some studies suggest that urban farms can provide meaningful quantities of fresh produce, particularly for vulnerable populations with limited access to nutritious foods. A frequently cited example is Havana, Cuba, where urban agriculture expanded dramatically during the economic crisis of the 1990s and now supplies a substantial portion of the city's fresh vegetables.

However, other analyses question whether urban agriculture can produce sufficient quantities of food to significantly impact overall urban consumption, particularly for calorie-dense staple crops that typically require more land. Critics also note that urban land constraints and high property values in many cities make dedicating space to agriculture economically challenging without substantial subsidies or policy support.

Beyond direct food production, urban agriculture offers additional benefits that may indirectly support food security. These include educational opportunities about food systems, the preservation of green spaces that provide ecosystem services, potential reduction of urban heat island effects, and community building. Urban farms can also create economic opportunities through job creation and skills development in food production and distribution.

The policy environment surrounding urban agriculture varies considerably across different cities and regions. Some municipalities have embraced urban farming through supportive zoning regulations, tax incentives, and integration into urban planning frameworks. Others maintain restrictions that limit agricultural activities in urban areas, often citing concerns about health, safety, or conflicts with other land uses.

As cities continue to grow and climate change threatens conventional agricultural systems, urban agriculture will likely remain an important component of broader conversations about sustainable urban development and food security. While not a panacea for urban food challenges, thoughtfully implemented urban agricultural initiatives can contribute to more diverse, resilient, and equitable urban food systems.`,
      questions: [
        {
          id: "q3-1",
          text: "What is the primary purpose of this passage?",
          options: [
            { id: "a", text: "To advocate for replacing traditional agriculture with urban farming" },
            { id: "b", text: "To examine urban agriculture's potential benefits and limitations for food security" },
            { id: "c", text: "To criticize cities that restrict urban agricultural activities" },
            { id: "d", text: "To compare different technical approaches to vertical farming" },
            { id: "e", text: "To document the history of community gardens in urban areas" },
          ],
          correctAnswer: "b",
          explanation:
            "The passage provides a balanced examination of urban agriculture's potential contributions to food security, discussing both its benefits and limitations without advocating for it to replace traditional agriculture.",
        },
        {
          id: "q3-2",
          text: "According to the passage, which of the following is a challenge to expanding urban agriculture?",
          options: [
            { id: "a", text: "Lack of consumer interest in locally grown produce" },
            { id: "b", text: "Insufficient technological innovation in farming methods" },
            { id: "c", text: "High urban land values and economic constraints" },
            { id: "d", text: "Inability to grow any meaningful quantity of food in cities" },
            { id: "e", text: "Excessive government regulation in all municipalities" },
          ],
          correctAnswer: "c",
          explanation:
            "The passage states that 'urban land constraints and high property values in many cities make dedicating space to agriculture economically challenging without substantial subsidies or policy support.'",
        },
        {
          id: "q3-3",
          text: "The passage mentions Havana, Cuba primarily to:",
          options: [
            {
              id: "a",
              text: "Illustrate a case where urban agriculture provides a significant amount of a city's produce",
            },
            { id: "b", text: "Argue that economic crises are necessary for urban agriculture to develop" },
            { id: "c", text: "Demonstrate the superiority of socialist approaches to food production" },
            { id: "d", text: "Show how vertical farming technologies have evolved" },
            { id: "e", text: "Criticize traditional rural agricultural systems" },
          ],
          correctAnswer: "a",
          explanation:
            "Havana is mentioned as a 'frequently cited example' where urban agriculture 'supplies a substantial portion of the city's fresh vegetables,' illustrating a case where urban farming has made a significant contribution to a city's food supply.",
        },
        {
          id: "q3-4",
          text: "Based on the passage, which of the following best describes the author's conclusion about urban agriculture?",
          options: [
            { id: "a", text: "It should replace traditional agricultural systems entirely" },
            { id: "b", text: "It is unlikely to have any meaningful impact on urban food systems" },
            { id: "c", text: "It can be a valuable component of broader food security strategies despite limitations" },
            { id: "d", text: "It is too expensive to implement in most cities" },
            { id: "e", text: "It benefits the environment but not food security" },
          ],
          correctAnswer: "c",
          explanation:
            "The author concludes that while urban agriculture is 'not a panacea for urban food challenges,' it can 'contribute to more diverse, resilient, and equitable urban food systems' when thoughtfully implemented, suggesting it has value as part of broader food security strategies despite its limitations.",
        },
      ],
    },
    {
      id: "passage-4",
      title: "The Neuroscience of Decision Making",
      content: `The human decision-making process, once primarily the domain of philosophers and economists, has increasingly become a subject of neuroscientific inquiry. Advanced neuroimaging techniques such as functional magnetic resonance imaging (fMRI) and electroencephalography (EEG) have enabled researchers to observe brain activity during decision-making tasks, revealing complex neural mechanisms that underlie our choices.

Contrary to traditional economic models that portrayed humans as purely rational actors who consistently maximize utility, neuroscience research has demonstrated that decision making involves an intricate interplay between cognitive and emotional processes. The prefrontal cortex, particularly the dorsolateral and ventromedial regions, plays a crucial role in executive functions such as weighing options, considering future consequences, and inhibiting impulsive responses. Meanwhile, subcortical structures like the amygdala and nucleus accumbens process emotional valence and anticipatory reward, significantly influencing our preferences and choices.

One of the most influential frameworks to emerge from this research is the dual-process theory, which suggests that decisions arise from the interaction between two systems: System 1, which operates automatically and quickly with little conscious control, and System 2, which allocates attention to effortful mental activities and complex computations. This model helps explain why humans often exhibit cognitive biases and heuristics that lead to systematic deviations from purely rational decision making.

Neuroeconomics, an interdisciplinary field combining neuroscience, economics, and psychology, has further illuminated how the brain evaluates and compares options. Research has shown that the brain encodes the subjective value of different choices on a common neural scale, primarily in the ventromedial prefrontal cortex and striatum, allowing for comparison between dissimilar options such as purchasing a car versus taking a vacation.

The neuroscience of decision making has also revealed important insights about risk assessment. When facing uncertain outcomes, the anterior insula activates in response to potential losses, while the nucleus accumbens responds to potential gains. Individual differences in the relative sensitivity of these regions may partly explain why some people are more risk-averse than others. Additionally, the brain appears to process probabilities non-linearly, typically overweighting low probabilities and underweighting high probabilities, which helps account for behaviors like purchasing lottery tickets despite their negative expected value.

Social context significantly influences neural activity during decision making as well. When people make choices in social settings, regions associated with social cognition, such as the temporoparietal junction and medial prefrontal cortex, show increased activation. These areas help individuals consider others' perspectives and social norms, which can sometimes lead to decisions that appear economically irrational but serve important social functions, such as maintaining reputation or adhering to principles of fairness.

Developmental neuroscience has demonstrated that decision-making capabilities evolve throughout the lifespan. The prefrontal cortex, critical for impulse control and long-term planning, doesn't fully mature until the mid-twenties, which may explain adolescents' tendency toward risk-taking and immediate gratification. Conversely, certain decision-making abilities decline with advanced age as neural efficiency decreases, though this may be partially offset by accumulated experience and knowledge.

Understanding the neuroscience of decision making has significant practical implications across various domains. In healthcare, it can inform strategies to promote healthier choices and improve patient decision making about treatment options. In economics and public policy, it challenges traditional models and suggests more effective approaches to encourage beneficial behaviors. In education, it provides insights into how to teach decision-making skills and critical thinking.

As neuroimaging techniques continue to advance and research methodologies become more sophisticated, our understanding of the neural basis of decision making will undoubtedly deepen. This growing knowledge not only illuminates one of the most fundamental aspects of human cognition but also offers promising pathways to help people make better decisions in increasingly complex environments.`,
      questions: [
        {
          id: "q4-1",
          text: "According to the passage, how has neuroscience changed our understanding of human decision making compared to traditional economic models?",
          options: [
            { id: "a", text: "It has confirmed that humans are primarily rational actors who maximize utility" },
            { id: "b", text: "It has shown that emotions play no role in optimal decision making" },
            {
              id: "c",
              text: "It has revealed that decision making involves complex interactions between cognitive and emotional processes",
            },
            { id: "d", text: "It has demonstrated that the brain cannot compare dissimilar options" },
            { id: "e", text: "It has proven that all cognitive biases can be eliminated through proper training" },
          ],
          correctAnswer: "c",
          explanation:
            "The passage states that 'contrary to traditional economic models that portrayed humans as purely rational actors,' neuroscience research has demonstrated that decision making involves 'an intricate interplay between cognitive and emotional processes.'",
        },
        {
          id: "q4-2",
          text: "Which brain regions does the passage identify as primarily responsible for encoding the subjective value of different choices?",
          options: [
            { id: "a", text: "The amygdala and anterior insula" },
            { id: "b", text: "The ventromedial prefrontal cortex and striatum" },
            { id: "c", text: "The temporoparietal junction and medial prefrontal cortex" },
            { id: "d", text: "The nucleus accumbens and anterior cingulate cortex" },
            { id: "e", text: "The dorsolateral prefrontal cortex and hippocampus" },
          ],
          correctAnswer: "b",
          explanation:
            "The passage states that 'the brain encodes the subjective value of different choices on a common neural scale, primarily in the ventromedial prefrontal cortex and striatum.'",
        },
        {
          id: "q4-3",
          text: "Based on the passage, which of the following best explains why adolescents tend toward risk-taking and immediate gratification?",
          options: [
            { id: "a", text: "They have more active nucleus accumbens regions than adults" },
            { id: "b", text: "Their amygdala is not fully developed" },
            { id: "c", text: "They lack the social cognition abilities found in adults" },
            { id: "d", text: "Their prefrontal cortex is not fully mature until the mid-twenties" },
            { id: "e", text: "They process probabilities more linearly than adults" },
          ],
          correctAnswer: "d",
          explanation:
            "The passage explains that 'the prefrontal cortex, critical for impulse control and long-term planning, doesn't fully mature until the mid-twenties, which may explain adolescents' tendency toward risk-taking and immediate gratification.'",
        },
        {
          id: "q4-4",
          text: "The dual-process theory mentioned in the passage suggests that decision making involves the interaction between:",
          options: [
            { id: "a", text: "The prefrontal cortex and the amygdala" },
            { id: "b", text: "Conscious and unconscious memory systems" },
            { id: "c", text: "System 1 (automatic, quick) and System 2 (effortful, controlled)" },
            { id: "d", text: "Risk assessment and reward anticipation" },
            { id: "e", text: "Social cognition and individual preferences" },
          ],
          correctAnswer: "c",
          explanation:
            "The passage describes the dual-process theory as suggesting 'that decisions arise from the interaction between two systems: System 1, which operates automatically and quickly with little conscious control, and System 2, which allocates attention to effortful mental activities and complex computations.'",
        },
      ],
    },
  ],
}
