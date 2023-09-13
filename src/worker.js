import { BufferMemory } from "langchain/memory"
import { CloudflareD1MessageHistory } from "langchain/stores/message/cloudflare_d1"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"
import Hono from 'hono'

const app = new Hono()

app.get('/', async (c) => {
	const input = c.req.query("input")
	const memory = new BufferMemory({
		chatHistory: new CloudflareD1MessageHistory({
			tableName: "stored_message",
			sessionId: "example",
			database: env.DB
		}),
	})
	const model = new ChatOpenAI({ openAIApiKey: env.OPENAI_API_KEY })
	const chain = new ConversationChain({ llm: model, memory })
	const res = await chain.call({ input })
	return c.text(res.response)
})

export default app