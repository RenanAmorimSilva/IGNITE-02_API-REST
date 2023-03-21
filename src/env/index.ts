import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

// Define um esquema de validação para as variáveis de ambiente esperadas
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333)
});

// Valida as variáveis de ambiente definidas em process.env de acordo com o esquema de validação
const _env = envSchema.safeParse(process.env);

// Se houver falha na validação, exibe um erro no console e lança uma exceção
if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format());
  throw new Error('Invalid environment variables.');
}

// Exporta as variáveis de ambiente válidas
export const env = _env.data;