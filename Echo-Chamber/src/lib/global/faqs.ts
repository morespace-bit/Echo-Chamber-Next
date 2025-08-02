interface IFaqs {
  id: number;
  question: string;
  answer: string;
}

const faqs: IFaqs[] = [
  {
    id: 1,
    question: "How is Echo Chamber different from other platforms?",
    answer:
      "We focus on peaceful interactions, no politics, no outrage algorithms. It’s all about meaningful connections—not noise or drama.",
  },
  {
    id: 2,
    question: "Is Echo Chamber free to use?",
    answer:
      "Yes! Echo Chamber is completely free. You can sign up, join communities, and start sharing without any cost.",
  },
  {
    id: 3,
    question: "What is Echo Chamber?",
    answer:
      "Echo Chamber is a social media platform designed for real, non-political conversations. It connects people based on shared interests in a calm, respectful space.",
  },
];

export default faqs;
