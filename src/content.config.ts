import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cible = z.enum(['investisseurs', 'numerique', 'adoption']);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fr/services' }),
  schema: z.object({
    cible,
    ordre: z.number(),
    titre: z.string(),
    objectif: z.string().optional(),
    // Volets des deux premières cibles
    cyber: z.string().optional(),
    ia: z.string().optional(),
    // Promesse unique pour la cible « adoption »
    promesse: z.string().optional(),
  }),
});

const cas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fr/cas' }),
  schema: z.object({
    titre: z.string(),
    acteur: z.string(),
    cible,
    accueil: z.boolean().default(false),
    ordre: z.number(),
    contexte: z.string(),
    intervention: z.string(),
    livre: z.string(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fr/articles' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(),
    url: z.string().url(),
    theme: z.enum(['IA', 'Cyber', 'Cyber & IA']),
    image: z.string(),
    ordre: z.number(),
  }),
});

export const collections = { services, cas, articles };
