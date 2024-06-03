export const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const url = req.url
    const queries = req.query

    console.log(`
    **** Database Logs **** 

    -- Time: ${time} \n 
    -- URL: ${url} \n
    -- Query: ${Object.entries(queries)} \n

    ** End Database Logs **
    `)

    next()
}