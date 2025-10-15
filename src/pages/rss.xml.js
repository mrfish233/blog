import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog')
        .then((posts) => posts.sort((a, b) => b.data.pubDate - a.data.pubDate))
        .then((posts) => {
            console.log(posts);
            return posts.map((post) => ({
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description,
                link: `/posts/${post.id}`,
            }));
        });

    return rss({
        title: 'Astro Learner | Blog',
        description: 'My journey learning Astro',
        site: context.site,
        items: posts,
        customData: `<language>en-us</language>`,
    });
}
