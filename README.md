Example application showing how to use a Langchain chain with D1's memory store. The relevant code can be found in `worker.js`. Note that the Langchain integration will instantiate a new table and manage it for you -- all you need to do is set up your own D1 database with relevant `database_id`, as seen in `wrangler.toml`.

You will also need to pass in an `OPENAI_API_KEY` as a secret:

```
$ echo "API_KEY_HERE" | npx wrangler secret put OPENAI_API_KEY
```

Note that this project currently uses a local build of langchain to pull in my changes as seen here: https://github.com/langchain-ai/langchainjs/pull/2624. I don't suggest trying to get this to run locally until you're able to pull a new tagged version of langchainjs with the relevant D1 module.