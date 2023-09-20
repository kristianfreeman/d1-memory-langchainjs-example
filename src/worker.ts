import { BufferMemory } from "langchain/memory"
import { CloudflareD1MessageHistory } from "langchain/stores/message/cloudflare_d1"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"
import { Hono } from 'hono'
import { D1Database } from "@cloudflare/workers-types"

type Bindings = {
	OPENAI_API_KEY: string
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
	try {
		const input = c.req.query("input")

		if (!input) {
			return c.text("Please provide input query parameter", 400)
		}

		const memory = new BufferMemory({
			chatHistory: new CloudflareD1MessageHistory({
				tableName: "stored_message",
				sessionId: "example",
				database: c.env.DB
			}),
		})

		const model = new ChatOpenAI({ openAIApiKey: c.env.OPENAI_API_KEY })
		const chain = new ConversationChain({ llm: model, memory })
		const res = await chain.call({ input })
		return c.text(res.response)
	} catch (e) {
		return c.text(e.message, 500)
	}
})

export default app