import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: 'https://coolha.top',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://coolha.top/posts',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://coolha.top/u',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
        /* images: ['https://coolha.top/favicon.ico'], */
      },
    ]
  }