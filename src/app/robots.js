export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://bspecial.vercel.app/sitemap.xml',
  }
}
