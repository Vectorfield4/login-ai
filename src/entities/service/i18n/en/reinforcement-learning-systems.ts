export const reinforcement_learning_systemsEn = {
  ctaBanner: {
    title: "Let's break down your task",
    text: "Describe the goal, constraints, and cost of a mistake. We'll say whether RL is needed or analytics and rules are enough.",
    buttonLabel: "Request a review",
  },
  navTitle: "Reinforcement learning systems",
  title: "Building reinforcement learning systems",
  tagline: "The agent learns in a simulator and optimizes a long-horizon goal.",
  description:
    "We build RL systems: an environment simulator, a reward function, and agent training. We verify the policy on historical data and in a limited pilot before a full launch.",
  features: [
    {
      title: "Environment simulator",
      text: "The environment is modeled before training: without a simulator the agent learns on the live system, which is expensive.",
    },
    {
      title: "Reward function",
      text: "The reward describes the goal in numbers, constraints included, not just the payoff.",
    },
    {
      title: "Historical verification",
      text: "We run the policy on historical data before any real intervention.",
    },
    {
      title: "Limited pilot",
      text: "A launch starts on a limited loop with manual control, not the whole system.",
    },
  ],
  techStack: [
    {
      subtitle: "Environment and training",
      description:
        "The simulator is built in [Python], training runs on [PyTorch], experiments are versioned in [MLflow], and environment state is stored in [PostgreSQL].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "The simulator and environment language: the environment is code and reproduces the agent's steps.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Trains the policy and value function: several runs with different seeds check stability.",
        },
        {
          id: "mlflow",
          name: "MLflow",
          glossary:
            "Versions experiments: it shows which reward and parameters produced which policy.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores environment state and verification history: the policy is compared with the current solution.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Task definition",
      text: "We state the goal, constraints, and cost of a mistake: RL does not fit every task.",
      processType: "discovery",
    },
    {
      title: "Simulator and reward",
      text: "We build an environment model and describe the reward together with constraints.",
      processType: "system-design",
    },
    {
      title: "Training and verification",
      text: "We train the policy and verify it on historical data before any real intervention.",
      processType: "implementation",
    },
    {
      title: "Limited pilot",
      text: "We launch on a limited loop with manual control and a comparison against the current solution.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A simulator or history exists",
      text: "The environment can be modeled or reconstructed from logs: the agent learns without risk.",
      positive: true,
    },
    {
      title: "A long, multi-step goal",
      text: "The result depends on a sequence of actions, not a single decision.",
      positive: true,
    },
    {
      title: "A mistake is irreversible and costly",
      text: "Where one wrong action cannot be undone, learning on the live system is not allowed.",
      positive: false,
    },
    {
      title: "No numeric goal",
      text: "Without a measurable reward the agent has nothing to optimize, and RL becomes brute force.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Inventory control",
      text: "The agent optimized the ordering policy in a simulator and passed verification on historical data.",
      metricValue: "−12%",
      metricLabel: "holding cost in the simulation",
    },
  ],
  faqItems: [
    {
      question: "Is it always neural networks?",
      answer:
        "No. Sometimes a tabular policy or a rule works better and explains more simply. The choice depends on the task.",
    },
    {
      question: "How is safety verified?",
      answer:
        "The policy does not run on the live system at once: simulator and history first, then a limited pilot under control.",
    },
    {
      question: "Why not just A/B?",
      answer:
        "A/B fits a single decision. When the sequence of steps matters, an environment model is needed, or the effect cannot be separated from chance.",
    },
    {
      question: "How long does it take?",
      answer:
        "The simulator and first trained agent start at eight weeks; the real pilot depends on the cost of a mistake and the loop.",
    },
  ],
  tradeoffs: [
    {
      title: "A simulator diverges from reality",
      text: "A policy perfect in the model loses quality on the live loop. A simulator diverges from reality, so the policy is checked on history.",
    },
    {
      title: "The reward invites exploitation",
      text: "The agent finds a loophole and reaches the maximum the roundabout way. The reward invites exploitation, so we tighten the rules before launch.",
    },
    {
      title: "One-off decisions",
      text: "Where the action is single, analytics is enough. Training is overkill for one-off decisions, so we pick a simpler method.",
    },
    {
      title: "The cost of training",
      text: "Training pays off with a clear metric and a ready simulator. The cost of training is high, so we estimate the return before the start.",
    },
  ],
  mechanism: [
    {
      title: "The simulator is the base",
      text: "The simulator is the base: the agent learns in an environment model while the live system stays untouched until verification.",
    },
    {
      title: "The reward describes the whole goal",
      text: "The reward describes the whole goal: without constraints the agent finds a profitable but disallowed solution.",
    },
    {
      title: "Randomness is controlled",
      text: "Randomness is controlled: several runs with different seeds show whether the policy is stable.",
    },
    {
      title: "Historical verification is mandatory",
      text: "Historical verification is mandatory: the policy is compared with the current solution before any real intervention.",
    },
  ],
};
