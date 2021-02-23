<script>
  import Card from "./Card.svelte";
  import Metadata from "./Metadata.svelte";
  import MetadataForm from "./MetadataForm.svelte";
  import { publication, refreshPublication } from "../../stores";
  import { getToken } from "../../getToken";
  let editing = false;
  let formElement;
  async function save(info) {
    if (!info.length) {
      const entries = Array.from(
        new URLSearchParams(new FormData(formElement)).entries()
      ).filter((entry) => entry[1]);

      if (entries.length !== 0) {
        const body = Object.fromEntries(entries);
        // console.log(entries, body);
        let inLanguage = [];
        const newEntries = {};
        for (const prop in body) {
          if (prop === "wordCount" || prop === "numberOfPages") {
            body[prop] = parseInt(body[prop], 10);
          } else if (prop.startsWith("inLanguage")) {
            inLanguage = inLanguage.concat(body[prop]);
          } else if (prop.startsWith("_") && body[prop]) {
            newEntries[prop.replace("_", "")] = body[prop]
              .split(",")
              .map((item) => item.trim())
              .map((name) => {
                return {
                  type: "Person",
                  name,
                };
              });
          } else if (prop === "citation") {
            body[prop] = { default: body[prop] };
          }
        }

        //body.author = author;
        //body.inLanguage = inLanguage;
        const pub = Object.assign({}, $publication, body, newEntries);
        // console.log(pub);

        await window.fetch(`/api/publication/${$publication.shortId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "csrf-token": getToken(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pub),
        });
      }
    } else {
      let body = {};
      info.map((prop) => {
        body[prop.key] = prop.value;
      });

      let inLanguage = [];
      const newEntries = {};
      let author;
      for (const prop in body) {
        if (prop === "wordCount" || prop === "numberOfPages") {
          body[prop] = parseInt(body[prop], 10);
        } else if (prop.startsWith("inLanguage")) {
          inLanguage = inLanguage.concat(body[prop]);
        } else if (prop.startsWith("_") && body[prop]) {
          newEntries[prop.replace("_", "")] = body[prop]
            .split(",")
            .map((item) => item.trim())
            .map((name) => {
              return {
                type: "Person",
                name,
              };
            });
        } else if (prop === "citation") {
          body[prop] = { default: body[prop] };
        }
      }

      if (body.author) body.author = author;
      if (body.inLanguage) body["_inLanguage"] = inLanguage;

      const pub = Object.assign({}, $publication, body, newEntries);

      await window.fetch(`/api/publication/${$publication.shortId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "csrf-token": getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pub),
      });
    }

    editing = false;
    $refreshPublication = { id: $publication.shortId, time: Date.now() };
  }
</script>

<style>
  h5 {
    padding: 0;
    margin: 0 0 20px 0;
    font-size: 1rem;
    position: relative;
    font-weight: bold;
  }
  h5::after {
    width: calc(100% - 90px);
    height: 1px;
    background: #ddd;
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<Card id="About" tab="About" bind:editing {save}>
  <h5>Metadata</h5>
  {#if !editing}
    <!--
  <Metadata bind:form={formElement} {save} />-->
    <Metadata {save} />
  {:else}
    <MetadataForm bind:form={formElement} />
  {/if}
</Card>
