import  SanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";



export const client =  SanityClient(
    {
        projectId:'v806lvvl',
        dataset:'production',
        apiVersion:'2022-06-11',
        useCdn: !process.env.NEXT_PUBLIC_SANITY_TOKEN, // Only use CDN when no token
        token:process.env.NEXT_PUBLIC_SANITY_TOKEN
    }
)

const builder  = ImageUrlBuilder(client)

export const urlFor = (source)=>
    builder.image(source)
