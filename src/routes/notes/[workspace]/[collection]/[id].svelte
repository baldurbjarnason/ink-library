<script>
  import NotesCard from '../../../../components/notes/NotesCard.svelte';
  import { library } from '../../../../stores';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  const note = {
    id: 'some-id',
    readerId: "https://reader.example.com/",
    publicationId: "https://reader.example.com/",
    target: 'target',
    updated: Date.now(),
    published: Date.now(),
    body: [{content: "<p>And, finally, a comment...</p>", motivation: "commenting"}],
    tags: [{
      type: "workspace",
      name: "Personal"
    }],
    publication: {name: 'Fake Title'}
  }
</script>

<NotesCard {note}></NotesCard>