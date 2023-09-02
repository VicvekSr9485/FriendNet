import sanityClient, { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
    projectId: '',
    dataset: '',
    apiVersion: '2023-09-02',
    useCdn: true,
    token: '',
});

const builder = imageUrlBuilder(client);

export const urlFor  = (source) => builder.image(source);