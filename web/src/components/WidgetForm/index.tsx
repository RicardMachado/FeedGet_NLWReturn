import { useState } from "react";

import { FeedbackTypesStep } from "./Steps/FeedbackTypesStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentSstep";

import BugImageUrl from "../../assets/Bug.svg";
import IdeaImageUrl from "../../assets/Idea.svg";
import ThoughtImageUrl from "../../assets/Thought.svg";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: BugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideai",
    image: {
      source: IdeaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: ThoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function Widgetform() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypesStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequest={handleRestartFeedback}
              onFeedbackSend={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
