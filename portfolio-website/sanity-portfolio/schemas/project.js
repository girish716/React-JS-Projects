
export default {
    name : 'project',
    title : 'Project',
    type : 'document',
    fields : [
        {
            name : 'image',
            title : 'Image',
            type : 'image',
            options : {
                hotspot : true // Hotspot makes it possible to responsively adapt images to different aspect ratios at display time. The default value for hotspot is false.
            }
        },
        {
            name : 'name',
            title : 'Name',
            type : 'string'
        },
        {
            name : 'slug',
            title : 'Slug',
            type : 'slug',
            options : {
                source : 'name',
                maxLength : 90
            }
        },
        {
            name : 'tags',
            title : 'Tags',
            type : 'array',
            of : [{type : 'string'}]
        },
        {
            name : 'liveURL',
            title : 'Live URL',
            type : 'string'
        },
        {
            name : 'sourceCode',
            title : 'Source Code',
            type : 'string'
        },
        {
            name:'order',
            title : 'Order of Project',
            type : 'number'
        }

    ]
}