import {
  expect,
  fixture,
  html,
  fixtureCleanup,
  nextFrame,
} from "@open-wc/testing";
import ToC from "./components/ToC.svelte";
import { render } from "./utils";

const contents = {
  type: "html",
  url: "toc.xhtml",
  children: [
    { children: [], label: "Cover", url: "OEBPS/front-cover.xhtml" },
    { children: [], label: "Title Page", url: "OEBPS/title-page.xhtml" },
    { children: [], label: "Copyright", url: "OEBPS/copyright.xhtml" },
    {
      children: [],
      label: "Table Of Contents",
      url: "OEBPS/table-of-contents.xhtml",
    },
    {
      children: [],
      label: "Introduction",
      url: "OEBPS/front-matter-001-introduction.xhtml",
    },
    {
      children: [],
      label: "Contributors",
      url: "OEBPS/front-matter-002-contributors.xhtml",
    },
    {
      children: [
        {
          children: [],
          label: "Open Pedagogy",
          url: "OEBPS/chapter-001-open-pedagogy.xhtml",
        },
      ],
      label: "Open Pedagogy",
      url: "OEBPS/part-001-introduction-to-open-pedagogy.xhtml",
    },
    {
      children: [
        {
          children: [],
          label: "Creating an Open Textbook",
          url: "OEBPS/chapter-002-creating-an-open-textbook.xhtml",
        },
        {
          children: [],
          label: "Case Study: Frank Lloyd Wright and His Madison Buildings",
          url:
            "OEBPS/chapter-003-case-study-frank-lloyd-wright-and-his-madison-buildings.xhtml",
        },
        {
          children: [],
          label: "Case study: Antología Abierta de Literatura Hispánica",
          url:
            "OEBPS/chapter-004-case-study-antologia-abierta-de-literatura-hispanica.xhtml",
        },
        {
          children: [],
          label: "Interview with David Squires: Social Media Texts",
          url: "OEBPS/chapter-005-case-study-social-media-texts.xhtml",
        },
        {
          children: [],
          label: "Student Spotlight: Samara Burns, Open Logic Project",
          url:
            "OEBPS/chapter-006-student-spotlight-samara-burns-open-logic-project.xhtml",
        },
        {
          children: [],
          label: "Interview with Gabriel Higginbotham, Open Oregon State",
          url:
            "OEBPS/chapter-007-interview-with-gabriel-higginbotham-open-oregon-state.xhtml",
        },
        {
          children: [],
          label: "Adapting an Open Textbook",
          url: "OEBPS/chapter-008-adapting-an-open-textbook.xhtml",
        },
        {
          children: [],
          label: "Case Study: Principles of Microeconomics",
          url:
            "OEBPS/chapter-009-case-study-principles-of-microeconomics.xhtml",
        },
        {
          children: [],
          label:
            "Case Study: Expanding the Open Anthology of Earlier American Literature",
          url:
            "OEBPS/chapter-010-case-study-expanding-open-anthology-of-earlier-american-literature.xhtml",
        },
        {
          children: [],
          label:
            "Student Spotlight: Matthew Moore, The Open Anthology of Earlier American Literature, 2nd Edition",
          url: "OEBPS/chapter-011-student-spotlight-matthew-moore.xhtml",
        },
      ],
      label: "Project Ideas & Case Studies",
      url: "OEBPS/part-002-project-ideas-case-studies.xhtml",
    },
    {
      children: [
        {
          children: [],
          label: "Licensing",
          url: "OEBPS/chapter-012-licensing.xhtml",
        },
        {
          children: [],
          label: "Privacy & Anonymity",
          url: "OEBPS/chapter-013-privacy-anonymity.xhtml",
        },
        {
          children: [],
          label: "Digital Literacy",
          url: "OEBPS/chapter-014-digital-literacy.xhtml",
        },
      ],
      label: "Student Rights & Faculty Responsibilities",
      url: "OEBPS/part-003-student-rights-faculty-responsibilities.xhtml",
    },
    {
      children: [
        {
          children: [],
          label: "Teaching Guide: Expand an Open Textbook",
          url:
            "OEBPS/chapter-015-teaching-assignment-expand-an-open-textbook.xhtml",
        },
        {
          children: [],
          label: "Assignment: Create an Open Textbook",
          url: "OEBPS/chapter-016-assignment-create-an-open-textbook.xhtml",
        },
      ],
      label: "Sample Assignments",
      url: "OEBPS/part-004-assignments.xhtml",
    },
    {
      children: [
        {
          children: [],
          label: "CC Licensing Guide",
          url: "OEBPS/chapter-017-cc-licensing-guide.xhtml",
        },
        {
          children: [],
          label: "MOU for Students and Faculty",
          url: "OEBPS/chapter-018-mou-for-students-faculty.xhtml",
        },
        {
          children: [],
          label: "Course: Becoming an Open Educator",
          url: "OEBPS/chapter-019-course-becoming-an-open-educator.xhtml",
        },
      ],
      label: "Resources",
      url: "OEBPS/part-005-resources.xhtml",
    },
    {
      children: [],
      label: "About the Publisher",
      url: "OEBPS/back-matter-001-about-the-publisher.xhtml",
    },
    {
      children: [],
      label: "Licensing Information",
      url: "OEBPS/back-matter-002-licensing-information.xhtml",
    },
    {
      children: [],
      label: "Other Open Textbooks Produced With Rebus Community Support",
      url:
        "OEBPS/back-matter-003-other-open-textbooks-produced-with-rebus-community-support.xhtml",
    },
    {
      children: [],
      label: "As Seen In",
      url: "OEBPS/back-matter-004-as-seen-in.xhtml",
    },
  ],
  heading: "Table of Contents",
  storageId: "5f8AUbc6ijW18A26oBijLM",
};

const contents2 = {
  type: "PDF",
  url: "toc.xhtml",
  children: [
    {
      children: [],
      image: "image.png",
      label: "Cover",
      url: "OEBPS/front-cover.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Title Page",
      url: "OEBPS/title-page.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Copyright",
      url: "OEBPS/copyright.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Table Of Contents",
      url: "OEBPS/table-of-contents.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Introduction",
      url: "OEBPS/front-matter-001-introduction.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Contributors",
      url: "OEBPS/front-matter-002-contributors.xhtml",
    },
    {
      children: [
        {
          children: [],
          image: "image.png",
          label: "Open Pedagogy",
          url: "OEBPS/chapter-001-open-pedagogy.xhtml",
        },
      ],
      image: "image.png",
      label: "Open Pedagogy",
      url: "OEBPS/part-001-introduction-to-open-pedagogy.xhtml",
    },
    {
      children: [
        {
          children: [],
          image: "image.png",
          label: "Creating an Open Textbook",
          url: "OEBPS/chapter-002-creating-an-open-textbook.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Case Study: Frank Lloyd Wright and His Madison Buildings",
          url:
            "OEBPS/chapter-003-case-study-frank-lloyd-wright-and-his-madison-buildings.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Case study: Antología Abierta de Literatura Hispánica",
          url:
            "OEBPS/chapter-004-case-study-antologia-abierta-de-literatura-hispanica.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Interview with David Squires: Social Media Texts",
          url: "OEBPS/chapter-005-case-study-social-media-texts.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Student Spotlight: Samara Burns, Open Logic Project",
          url:
            "OEBPS/chapter-006-student-spotlight-samara-burns-open-logic-project.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Interview with Gabriel Higginbotham, Open Oregon State",
          url:
            "OEBPS/chapter-007-interview-with-gabriel-higginbotham-open-oregon-state.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Adapting an Open Textbook",
          url: "OEBPS/chapter-008-adapting-an-open-textbook.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Case Study: Principles of Microeconomics",
          url:
            "OEBPS/chapter-009-case-study-principles-of-microeconomics.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label:
            "Case Study: Expanding the Open Anthology of Earlier American Literature",
          url:
            "OEBPS/chapter-010-case-study-expanding-open-anthology-of-earlier-american-literature.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label:
            "Student Spotlight: Matthew Moore, The Open Anthology of Earlier American Literature, 2nd Edition",
          url: "OEBPS/chapter-011-student-spotlight-matthew-moore.xhtml",
        },
      ],
      image: "image.png",
      label: "Project Ideas & Case Studies",
      url: "OEBPS/part-002-project-ideas-case-studies.xhtml",
    },
    {
      children: [
        {
          children: [],
          image: "image.png",
          label: "Licensing",
          url: "OEBPS/chapter-012-licensing.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Privacy & Anonymity",
          url: "OEBPS/chapter-013-privacy-anonymity.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Digital Literacy",
          url: "OEBPS/chapter-014-digital-literacy.xhtml",
        },
      ],
      image: "image.png",
      label: "Student Rights & Faculty Responsibilities",
      url: "OEBPS/part-003-student-rights-faculty-responsibilities.xhtml",
    },
    {
      children: [
        {
          children: [],
          image: "image.png",
          label: "Teaching Guide: Expand an Open Textbook",
          url:
            "OEBPS/chapter-015-teaching-assignment-expand-an-open-textbook.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Assignment: Create an Open Textbook",
          url: "OEBPS/chapter-016-assignment-create-an-open-textbook.xhtml",
        },
      ],
      image: "image.png",
      label: "Sample Assignments",
      url: "OEBPS/part-004-assignments.xhtml",
    },
    {
      children: [
        {
          children: [],
          image: "image.png",
          label: "CC Licensing Guide",
          url: "OEBPS/chapter-017-cc-licensing-guide.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "MOU for Students and Faculty",
          url: "OEBPS/chapter-018-mou-for-students-faculty.xhtml",
        },
        {
          children: [],
          image: "image.png",
          label: "Course: Becoming an Open Educator",
          url: "OEBPS/chapter-019-course-becoming-an-open-educator.xhtml",
        },
      ],
      image: "image.png",
      label: "Resources",
      url: "OEBPS/part-005-resources.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "About the Publisher",
      url: "OEBPS/back-matter-001-about-the-publisher.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Licensing Information",
      url: "OEBPS/back-matter-002-licensing-information.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "Other Open Textbooks Produced With Rebus Community Support",
      url:
        "OEBPS/back-matter-003-other-open-textbooks-produced-with-rebus-community-support.xhtml",
    },
    {
      children: [],
      image: "image.png",
      label: "As Seen In",
      url: "OEBPS/back-matter-004-as-seen-in.xhtml",
    },
  ],
  heading: "Table of Contents",
  storageId: "5f8AUbc6ijW18A26oBijLM",
};

it("ToC", async () => {
  const component = render(ToC, { contents });
  expect(component).to.not.be.false;
  const el = document.getElementById("component");
  expect(el).dom.to.equal(
    `<div id="component"><div id="ToCtest"><nav class="ToC html svelte-2bjv7t" aria-labelledby="toc-heading"><h2 id="toc-heading" class="svelte-2bjv7t">Table of Contents</h2> <ol class="svelte-2bjv7t"><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/front-cover.xhtml" class="Level svelte-1kqtmm1">Cover</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/title-page.xhtml" class="Level svelte-1kqtmm1">Title Page</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/copyright.xhtml" class="Level svelte-1kqtmm1">Copyright</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/table-of-contents.xhtml" class="Level svelte-1kqtmm1">Table Of Contents</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/front-matter-001-introduction.xhtml" class="Level svelte-1kqtmm1">Introduction</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/front-matter-002-contributors.xhtml" class="Level svelte-1kqtmm1">Contributors</a></li><li class="ContentsItem svelte-1kqtmm1"><details open="" class="svelte-1kqtmm1"><summary class="svelte-1kqtmm1"><span class="Level svelte-1kqtmm1">Open Pedagogy</span></summary> <ol><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-001-open-pedagogy.xhtml" class="Level svelte-1kqtmm1">Open Pedagogy</a></li></ol></details></li><li class="ContentsItem svelte-1kqtmm1"><details open="" class="svelte-1kqtmm1"><summary class="svelte-1kqtmm1"><span class="Level svelte-1kqtmm1">Project Ideas &amp; Case Studies</span></summary> <ol><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-002-creating-an-open-textbook.xhtml" class="Level svelte-1kqtmm1">Creating an Open Textbook</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-003-case-study-frank-lloyd-wright-and-his-madison-buildings.xhtml" class="Level svelte-1kqtmm1">Case Study: Frank Lloyd Wright and His Madison Buildings</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-004-case-study-antologia-abierta-de-literatura-hispanica.xhtml" class="Level svelte-1kqtmm1">Case study: Antología Abierta de Literatura Hispánica</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-005-case-study-social-media-texts.xhtml" class="Level svelte-1kqtmm1">Interview with David Squires: Social Media Texts</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-006-student-spotlight-samara-burns-open-logic-project.xhtml" class="Level svelte-1kqtmm1">Student Spotlight: Samara Burns, Open Logic Project</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-007-interview-with-gabriel-higginbotham-open-oregon-state.xhtml" class="Level svelte-1kqtmm1">Interview with Gabriel Higginbotham, Open Oregon State</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-008-adapting-an-open-textbook.xhtml" class="Level svelte-1kqtmm1">Adapting an Open Textbook</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-009-case-study-principles-of-microeconomics.xhtml" class="Level svelte-1kqtmm1">Case Study: Principles of Microeconomics</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-010-case-study-expanding-open-anthology-of-earlier-american-literature.xhtml" class="Level svelte-1kqtmm1">Case Study: Expanding the Open Anthology of Earlier American Literature</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-011-student-spotlight-matthew-moore.xhtml" class="Level svelte-1kqtmm1">Student Spotlight: Matthew Moore, The Open Anthology of Earlier American Literature, 2nd Edition</a></li></ol></details></li><li class="ContentsItem svelte-1kqtmm1"><details open="" class="svelte-1kqtmm1"><summary class="svelte-1kqtmm1"><span class="Level svelte-1kqtmm1">Student Rights &amp; Faculty Responsibilities</span></summary> <ol><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-012-licensing.xhtml" class="Level svelte-1kqtmm1">Licensing</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-013-privacy-anonymity.xhtml" class="Level svelte-1kqtmm1">Privacy &amp; Anonymity</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-014-digital-literacy.xhtml" class="Level svelte-1kqtmm1">Digital Literacy</a></li></ol></details></li><li class="ContentsItem svelte-1kqtmm1"><details open="" class="svelte-1kqtmm1"><summary class="svelte-1kqtmm1"><span class="Level svelte-1kqtmm1">Sample Assignments</span></summary> <ol><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-015-teaching-assignment-expand-an-open-textbook.xhtml" class="Level svelte-1kqtmm1">Teaching Guide: Expand an Open Textbook</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-016-assignment-create-an-open-textbook.xhtml" class="Level svelte-1kqtmm1">Assignment: Create an Open Textbook</a></li></ol></details></li><li class="ContentsItem svelte-1kqtmm1"><details open="" class="svelte-1kqtmm1"><summary class="svelte-1kqtmm1"><span class="Level svelte-1kqtmm1">Resources</span></summary> <ol><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-017-cc-licensing-guide.xhtml" class="Level svelte-1kqtmm1">CC Licensing Guide</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-018-mou-for-students-faculty.xhtml" class="Level svelte-1kqtmm1">MOU for Students and Faculty</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/chapter-019-course-becoming-an-open-educator.xhtml" class="Level svelte-1kqtmm1">Course: Becoming an Open Educator</a></li></ol></details></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/back-matter-001-about-the-publisher.xhtml" class="Level svelte-1kqtmm1">About the Publisher</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/back-matter-002-licensing-information.xhtml" class="Level svelte-1kqtmm1">Licensing Information</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/back-matter-003-other-open-textbooks-produced-with-rebus-community-support.xhtml" class="Level svelte-1kqtmm1">Other Open Textbooks Produced With Rebus Community Support</a></li><li class="ContentsItem svelte-1kqtmm1"><a href="/base/OEBPS/back-matter-004-as-seen-in.xhtml" class="Level svelte-1kqtmm1">As Seen In</a></li></ol></nav></div></div>`
  );
  // Use semantic-dom-diff to test that the component updates and renders correctly.
  component.$set({ contents: contents2 });
  await nextFrame();
  expect(el).dom.to.equal(
    `<div id="component"><div id="ToCtest"><nav class="ToC PDF svelte-2bjv7t" aria-labelledby="toc-heading"><h2 class="visually-hidden svelte-2bjv7t" id="toc-heading">Table of Contents</h2> <ol class="svelte-2bjv7t"><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/front-cover.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Cover" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/title-page.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Title Page" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/copyright.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Copyright" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/table-of-contents.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Table Of Contents" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/front-matter-001-introduction.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Introduction" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/front-matter-002-contributors.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Contributors" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><details open="" class="svelte-wyofq6"><summary class="svelte-wyofq6"><span class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Open Pedagogy" class="svelte-wyofq6"></span></summary> <ol><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-001-open-pedagogy.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Open Pedagogy" class="svelte-wyofq6"></a></li></ol></details></li><li class="ContentsItem svelte-wyofq6"><details open="" class="svelte-wyofq6"><summary class="svelte-wyofq6"><span class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Project Ideas &amp; Case Studies" class="svelte-wyofq6"></span></summary> <ol><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-002-creating-an-open-textbook.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Creating an Open Textbook" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-003-case-study-frank-lloyd-wright-and-his-madison-buildings.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Case Study: Frank Lloyd Wright and His Madison Buildings" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-004-case-study-antologia-abierta-de-literatura-hispanica.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Case study: Antología Abierta de Literatura Hispánica" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-005-case-study-social-media-texts.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Interview with David Squires: Social Media Texts" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-006-student-spotlight-samara-burns-open-logic-project.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Student Spotlight: Samara Burns, Open Logic Project" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-007-interview-with-gabriel-higginbotham-open-oregon-state.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Interview with Gabriel Higginbotham, Open Oregon State" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-008-adapting-an-open-textbook.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Adapting an Open Textbook" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-009-case-study-principles-of-microeconomics.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Case Study: Principles of Microeconomics" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-010-case-study-expanding-open-anthology-of-earlier-american-literature.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Case Study: Expanding the Open Anthology of Earlier American Literature" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-011-student-spotlight-matthew-moore.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Student Spotlight: Matthew Moore, The Open Anthology of Earlier American Literature, 2nd Edition" class="svelte-wyofq6"></a></li></ol></details></li><li class="ContentsItem svelte-wyofq6"><details open="" class="svelte-wyofq6"><summary class="svelte-wyofq6"><span class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Student Rights &amp; Faculty Responsibilities" class="svelte-wyofq6"></span></summary> <ol><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-012-licensing.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Licensing" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-013-privacy-anonymity.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Privacy &amp; Anonymity" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-014-digital-literacy.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Digital Literacy" class="svelte-wyofq6"></a></li></ol></details></li><li class="ContentsItem svelte-wyofq6"><details open="" class="svelte-wyofq6"><summary class="svelte-wyofq6"><span class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Sample Assignments" class="svelte-wyofq6"></span></summary> <ol><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-015-teaching-assignment-expand-an-open-textbook.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Teaching Guide: Expand an Open Textbook" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-016-assignment-create-an-open-textbook.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Assignment: Create an Open Textbook" class="svelte-wyofq6"></a></li></ol></details></li><li class="ContentsItem svelte-wyofq6"><details open="" class="svelte-wyofq6"><summary class="svelte-wyofq6"><span class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Resources" class="svelte-wyofq6"></span></summary> <ol><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-017-cc-licensing-guide.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="CC Licensing Guide" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-018-mou-for-students-faculty.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="MOU for Students and Faculty" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/chapter-019-course-becoming-an-open-educator.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Course: Becoming an Open Educator" class="svelte-wyofq6"></a></li></ol></details></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/back-matter-001-about-the-publisher.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="About the Publisher" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/back-matter-002-licensing-information.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Licensing Information" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/back-matter-003-other-open-textbooks-produced-with-rebus-community-support.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="Other Open Textbooks Produced With Rebus Community Support" class="svelte-wyofq6"></a></li><li class="ContentsItem svelte-wyofq6"><a href="/base/OEBPS/back-matter-004-as-seen-in.xhtml" class="PageLevel svelte-wyofq6"><img src="/media/image.png" alt="As Seen In" class="svelte-wyofq6"></a></li></ol></nav></div></div>`
  );
  component.$destroy();
});
