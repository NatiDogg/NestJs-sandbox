import {z} from 'zod'

const envSchema = z.object({
     PORT: z.string().min(1),
  DATABASE_URL: z.string().min(5),
  JWT_ACCESS_SECRET_KEY: z.string().min(4),
  JWT_REFRESH_SECRET_KEY: z.string().min(4),
}
)

export function validate(config: Record<string,unknown>){

    return envSchema.parse(config)

}

export type envConfig = z.infer<typeof envSchema>