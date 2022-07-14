
export default {
    name : 'about',
    title : 'About',
    type : 'document',
    fields : [
        {
            name : 'myImage',
            title : 'Image',
            type : 'image',
            options : {
                hotspot : true // Hotspot makes it possible to responsively adapt images to different aspect ratios at display time. The default value for hotspot is false.
            }
        },
        {
            name : 'title',
            title : 'Title',
            type : 'string'
        },
        {
            name : 'about',
            title : 'About',
            type : 'array',
            of : [{type : 'string'}]
        },
        {
            name : 'slug',
            title : 'Slug',
            type : 'slug',
            options : {
                source : 'title',
                maxLength : 90
            }
        },
        {
            name : 'skills',
            title : 'Skills',
            type : 'array',
            of : [{type : 'string'}]
        },
        {
            name : 'contact',
            title : 'Contact',
            type : 'string',
        },
        {
            name : 'gmail',
            title : 'Gmail',
            type : 'string',
        },
        {
            name : 'linkedin',
            title : 'Linkedin',
            type : 'string',
        }
    ]
}