  import FlagFurtherRead from "../../img/FlagFurtherRead.svelte";
  import FlagIdea from "../../img/FlagIdea.svelte";
  import FlagImportant from "../../img/FlagImportant.svelte";
  import FlagImpTerm from "../../img/FlagImpTerm.svelte";
  import FlagQuestion from "../../img/FlagQuestion.svelte";
  import FlagReference from "../../img/FlagReference.svelte";
  import FlagRevisit from "../../img/FlagRevisit.svelte";
  import FlagToDo from "../../img/FlagToDo.svelte";
  import FlagUrgent from "../../img/FlagUrgent.svelte";

export function assignIco(icon) {
  switch (icon) {
    case "further reading":
      return FlagFurtherRead;
    case "idea":
      return FlagIdea;
    case "important":
      return FlagImportant;
    case "important term":
      return FlagImpTerm;
    case "question":
      return FlagQuestion;
    case "reference":
      return FlagReference;
    case "revisit":
      return FlagRevisit;
    case "to do":
      return FlagToDo;
    case "urgent":
      return FlagUrgent;
  }
}