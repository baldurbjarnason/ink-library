import { expect } from "@esm-bundle/chai";
import {
  sourceURL$,
  chapterURL$,
  libraryURL$,
  noteURL$,
  sourceNotesURL$,
  notebookURL$,
  notebooksURL$,
  notesURL$,
  readerURL$,
  tagsURL$,
} from "../state/state-urls";

it("Sources URL loads when in source", (done) => {
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/sources/id-12345", params: { id: "id-12345" } },
    })
  );
  expect(sourceURL$.subscribe).to.be.a("function");
  const subscription = sourceURL$.subscribe({
    next(result) {
      expect(result).to.equal("/api/sources/id-12345");
      done();
    },
  });
  subscription.unsubscribe();
});
it("Sources Notes URL loads when in source", (done) => {
  expect(sourceNotesURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/sources/id-12345", params: { id: "id-12345" } },
    })
  );
  let called = 0;
  const subscription = sourceNotesURL$.subscribe({
    next(result) {
      called = called + 1;
      if (called === 1) {
        expect(result).to.equal(
          "/api/notes?source=id-12345&limit=100&motivation=bookmarking"
        );
      } else if (called === 2) {
        expect(result).to.be.null;
        done();
      }
    },
  });
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/notes/id-12345", params: { id: "id-12345" } },
    })
  );
  subscription.unsubscribe();
});

it("Sources URL nulls when not in source", (done) => {
  expect(sourceURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/notes/id-12345", params: { id: "id-12345" } },
    })
  );
  const subscription = sourceURL$.subscribe({
    next(result) {
      expect(result).to.be.null;
      done();
    },
  });
  subscription.unsubscribe();
});
it("library URL loads when in library", (done) => {
  expect(libraryURL$.subscribe).to.be.a("function");
  let called = 0;
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/library/id-12345", params: { id: "id-12345" } },
    })
  );
  const subscription = libraryURL$.subscribe({
    next(result) {
      called = called + 1;
      if (called === 1) {
        expect(result).to.equal("/api/library");
      } else if (called === 2) {
        expect(result).to.equal("/api/library?");
        done();
      }
    },
  });
  subscription.unsubscribe();
});

// it('library URL nulls when not in library', (done) => {
//   expect(libraryURL$.subscribe).to.be.a('function')
//   document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/notes/id-12345", params: {id: "id-12345"}}}))
//   const subscription = libraryURL$.subscribe({next (result) {
//     expect(result).to.equal("/api/library?")
//     done()
//   }})
//   subscription.unsubscribe()
// })

it("note URL works when in note", (done) => {
  expect(noteURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/notes/id-12345", params: { id: "id-12345" } },
    })
  );
  const subscription = noteURL$.subscribe({
    next(result) {
      expect(result).to.equal("/api/note/id-12345");
      done();
    },
  });
  subscription.unsubscribe();
});
it("note URL nulls when not in note", (done) => {
  expect(noteURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/sources/id-12345", params: { id: "id-12345" } },
    })
  );
  const subscription = noteURL$.subscribe({
    next(result) {
      expect(result).to.be.null;
      done();
    },
  });
  subscription.unsubscribe();
});

it("chapter URL works when in chapter", (done) => {
  expect(chapterURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: {
        path: "/sources/id-12345",
        params: { id: "id-12345", storage: "storage-12345" },
      },
    })
  );
  const subscription = chapterURL$.subscribe({
    next(result) {
      expect(result).to.equal("/api/read/id-12345/storage-12345/");
      done();
    },
  });
  subscription.unsubscribe();
});

it("chapter path works when in chapter", (done) => {
  expect(chapterURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: {
        path: "/sources/id-12345",
        params: {
          id: "id-12345",
          storage: "storage-12345",
          chapter: ["path", "to", "file.html"],
        },
      },
    })
  );
  const subscription = chapterURL$.subscribe({
    next(result) {
      expect(result).to.equal(
        "/api/read/id-12345/storage-12345/path/to/file.html"
      );
      done();
    },
  });
  subscription.unsubscribe();
});

it("chapter URL nulls when not in chapter", (done) => {
  expect(chapterURL$.subscribe).to.be.a("function");
  document.dispatchEvent(
    new CustomEvent("synthetic-page-load", {
      detail: { path: "/notes/id-12345", params: { id: "id-12345" } },
    })
  );
  const subscription = chapterURL$.subscribe({
    next(result) {
      expect(result).to.be.null;
      done();
    },
  });
  subscription.unsubscribe();
});
