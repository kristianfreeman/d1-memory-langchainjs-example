Example application showing how to use a Langchain chain with a Cloudflare D1-driven memory store.

The relevant code can be found in `worker.js`. Note that the Langchain integration will instantiate a new table and manage it for you -- all you need to do is set up your own D1 database with relevant `database_id`, as seen in `wrangler.toml`:

```sh
$ npx wrangler d1 database create YOUR_DB_NAME
```

You will also need to pass in an `OPENAI_API_KEY` as a secret:

```
$ echo "API_KEY_HERE" | npx wrangler secret put OPENAI_API_KEY
```
