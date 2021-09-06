export function shareWithTwitter({
  url,
  desc = '',
  hashtags = [],
}: {
  url: string
  desc?: string
  hashtags?: string[]
}) {
  const encodeHashtags = encodeURIComponent(hashtags.join(','))
  const encodeUrl = encodeURIComponent(url)
  return `https://twitter.com/share?url=${encodeUrl}&text=${desc}&hashtags=${encodeHashtags}`
}
